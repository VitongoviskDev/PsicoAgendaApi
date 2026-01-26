import { LoginDto } from '@/auth/dto/login.dto';
import { PROFILE_STATUS_ENUM } from '@/common/enums/profile-status.enum';
import { ForbiddenExceptionPayload } from '@/common/filters/http-exception.filter';
import { UserClinicService } from '@/user-clinic/user-clinic.service';
import { RegisterUserDto } from '@/users/dto/register-user.dto';
import { User, USER_STATUS_ENUM } from '@/users/entities/user.entity';
import { UsersService } from '@/users/users.service';
import { ConflictException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        private readonly dataSource: DataSource,

        private usersService: UsersService,
        private jwtService: JwtService,
        private userClinicService: UserClinicService,
    ) { }

    async register(dto: RegisterUserDto) {
        return this.dataSource.transaction(async (manager) => {

            const existingUser = await manager.findOne(User, {
                where: { email: dto.email },
            });

            if (existingUser) {
                throw new ConflictException('E-mail já está em uso.');
            }

            const hashedPassword = await bcrypt.hash(dto.password, 10);

            const user = manager.create(User, {
                name: dto.name,
                email: dto.email,
                password: hashedPassword,
                status: USER_STATUS_ENUM.PENDING_EMAIL_VERIFICATION,
            });

            await manager.save(user);

            const payload = { sub: user.id };
            const access_token = this.jwtService.sign(payload);

            return {
                user,
                access_token,
            };
        });
    }


    async login(dto: LoginDto) {
        const { email, password } = dto;

        const user = await this.usersService.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        if (user.status === USER_STATUS_ENUM.PENDING_EMAIL_VERIFICATION) {
            const verificationToken = this.generateEmailVerificationToken(user.id);

            const exceptionPayload: ForbiddenExceptionPayload = {
                message: 'Email ainda não verificado',
                data: {
                    status: 'PENDING_EMAIL_VERIFICATION',
                    verification_token: verificationToken,
                    user: {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                    },
                }
            };
            throw new ForbiddenException(exceptionPayload);
        }

        const clinics = user.userClinics?.map(uc => uc.clinic) ?? [];

        const userClinic = user.currentUserClinic ?? null;

        const currentClinic = user.currentUserClinic?.clinic ?? null;
        let userProfiles = userClinic != null ? {
            staff: userClinic?.staffProfile?.status === PROFILE_STATUS_ENUM.ACTIVE ? {
                role: userClinic.staffProfile.role,
            } : null,

            patient: userClinic?.patientProfile.status === PROFILE_STATUS_ENUM.ACTIVE ? {
                // notes: userClinic.patientProfile.notes ?? null,
            } : null,

            psychologist: user?.psychologistProfile?.status === PROFILE_STATUS_ENUM.ACTIVE ? {
                crp: user.psychologistProfile.crp,
                // specialty: user.psychologistProfile.specialty ?? null,
            } : null,
        } : null;

        const userResponse = {
            id: user?.id,
            name: user?.name,
            email: user?.email,
            phone: user?.phone,
            birthDate: user?.birthDate,
            cpf: user?.cpf,
            status: user?.status,
            profiles: userProfiles

        };

        const access_token = this.generateAccessToken(user.id);

        return {
            user: userResponse,
            currentClinic,
            clinics,
            access_token,
        };
    }

    private generateAccessToken(user_id: User['id']): string {
        const payload = { sub: user_id };
        return this.jwtService.sign(payload);
    }

    private generateEmailVerificationToken(user_id: User['id']): string {
        return this.jwtService.sign(
            {
                sub: user_id,
                purpose: 'email_verification',
            },
            {
                expiresIn: '15m',
            },
        );
    }

}

