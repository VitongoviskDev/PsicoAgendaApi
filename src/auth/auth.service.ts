import { ConflictException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ClinicsService } from 'src/clinics/clinics.service';
import { Clinic, ClinicStatus } from 'src/clinics/entity/clinic.entity';
import { DataSource } from 'typeorm';
import { User, UserStatus } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterOwnerDto } from './dto/register-owner.dto';
import { ClinicStaffService } from 'src/clinic-staff/clinic-staff.service';
import { ClinicStaff, StaffRole } from 'src/clinic-staff/entity/clinic-staf.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly dataSource: DataSource,

        private usersService: UsersService,
        private clinicsService: ClinicsService,
        private clinicStaffService: ClinicStaffService,
        private jwtService: JwtService,
    ) { }

    async registerOwner(dto: RegisterOwnerDto) {
        return this.dataSource.transaction(async (manager) => {

            /* 1️⃣ Verifica se e-mail já existe */
            const existingUser = await manager.findOne(User, {
                where: { email: dto.user.email },
            });

            if (existingUser) {
                throw new ConflictException('E-mail já está em uso.');
            }

            /* 2️⃣ Valida senha */
            if (dto.user.password !== dto.user.confirm_password) {
                throw new ConflictException('As senhas digitadas não coincidem.');
            }

            /* 3️⃣ Cria clínica padrão */
            const clinic = await manager.create(Clinic, {
                name: 'Minha clínica',
                status: ClinicStatus.PENDING_SETUP,
            });

            await manager.save(clinic);

            /* 4️⃣ Cria usuário */
            const hashedPassword = await bcrypt.hash(dto.user.password, 10);

            const user = manager.create(User, {
                name: dto.user.name,
                email: dto.user.email,
                password: hashedPassword,
                status: UserStatus.PENDING_REGISTRATION,
                lastClinicId: clinic.id,
            });

            await manager.save(user);

            /* 5️⃣ Cria vínculo administrativo (OWNER) */
            const staff = manager.create(ClinicStaff, {
                userId: user.id,
                clinicId: clinic.id,
                role: StaffRole.OWNER,
            });

            await manager.save(staff);

            /* 6️⃣ Gera token */
            const payload = { sub: user.id };
            const access_token = this.jwtService.sign(payload);

            return {
                user,
                currentClinic: clinic,
                clinics: [clinic],
                access_token,
            };
        });
    }



    async login(dto: LoginDto) {
        const { email, password } = dto;

        // 1️⃣ Busca usuário + profiles globais
        const user = await this.usersService.findByEmailWithProfiles(email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // 2️⃣ Valida senha
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // 3️⃣ Busca vínculos administrativos (ClinicStaff)
        const staffRelations = await this.clinicStaffService.findByUser({ userId: user.id });

        if (!staffRelations || staffRelations && staffRelations.length === 0) {
            throw new UnauthorizedException(
                'Usuário não possui vínculo com nenhuma clínica',
            );
        }

        // 4️⃣ Resolve clínica ativa
        const activeStaff =
            staffRelations.find(r => r.clinic.id === user.lastClinicId) ??
            staffRelations[0];

        // 5️⃣ Atualiza última clínica se necessário
        if (user.lastClinicId !== activeStaff.clinic.id) {
            await this.usersService.setLastClinic(user.id, activeStaff.clinic.id);
        }

        // 6️⃣ Lista de clínicas (admin context)
        const clinics = staffRelations.map(r => ({
            id: r.clinic.id,
            name: r.clinic.name,
            status: r.clinic.status,
            staffRole: r.role, // OWNER | ADMIN | EMPLOYEE
        }));

        // 7️⃣ Usuário (com flags de profile)
        const userResponse = {
            id: user?.id,
            name: user?.name,
            email: user?.email,
            phone: user?.phone,
            birthDate: user?.birthDate,
            cpf: user?.cpf,
            status: user?.status,
            profiles: {
                staff: !!activeStaff && !!user?.staffProfile ? {
                    active: user?.staffProfile.active,
                    role: activeStaff.role,
                } : null,
                psychologist: !!user?.psychologistProfile ? {
                    active: user.psychologistProfile.active,
                    crp: user.psychologistProfile.crp,
                    specialty: user.psychologistProfile.specialty ?? null,
                } : null,
                patient: !!user?.patientProfile ? {
                    notes: user.patientProfile.notes ?? null,
                } : null,
            },

        };

        // 8️⃣ Clínica ativa
        const currentClinic = {
            id: activeStaff.clinic.id,
            name: activeStaff.clinic.name,
            status: activeStaff.clinic.status,

            staffRole: activeStaff.role,
        };

        // 9️⃣ Token
        const payload = { sub: user.id };
        const access_token = this.jwtService.sign(payload);



        return {
            user: userResponse,
            currentClinic,
            clinics,
            access_token,
        };
    }

}
