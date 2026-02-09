import { LoginDto } from '@/auth/dto/login.dto';
import { PROFILE_STATUS_ENUM } from '@/common/enums/profile-status.enum';
import { DefaultExceptioPayload } from '@/common/filters/http-exception.filter';
import { MailService } from '@/mail/mail.service';
import { UserClinicService } from '@/user-clinic/user-clinic.service';
import { RegisterUserDto } from '@/users/dto/register-user.dto';
import { User, USER_STATUS_ENUM } from '@/users/entities/user.entity';
import { UsersService } from '@/users/users.service';
import { VERIFICATION_CODE_TYPE_ENUM } from '@/verification-code/entities/verification-code.entity';
import { VerificationCodeService } from '@/verification-code/verification-code.service';
import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        private readonly dataSource: DataSource,

        private usersService: UsersService,
        private jwtService: JwtService,
        private verificationCodeService: VerificationCodeService,
        private mailService: MailService,
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
            const { code } = await this.verificationCodeService.generateEmailVerificationCode(user.id);

            this.mailService.sendVerificationEmail(user.email, user.name, code)

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

        const access_token = this.generateAccessToken(user.id);

        if (user.status === USER_STATUS_ENUM.PENDING_EMAIL_VERIFICATION) {
            return {
                user: user,
                access_token,
            };
        }

        const clinics = user.userClinics?.map(uc => uc.clinic) ?? [];
        const userClinic = user.currentUserClinic ?? null;
        const currentClinic = userClinic?.clinic ?? null;

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
            ...user,
            profiles: userProfiles
        };

        return {
            user: userResponse,
            current_clinic: currentClinic,
            clinics,
            access_token,
        };
    }

    async resendVerificationCode(userId: string) {
        const user = await this.usersService.findById(userId)

        if (!user) {
            throw new NotFoundException('Usuário não encontrado')
        }

        if (user.status !== USER_STATUS_ENUM.PENDING_EMAIL_VERIFICATION) {
            throw new BadRequestException('Email já verificado')
        }

        const verificationCode = await this.verificationCodeService.generateEmailVerificationCode(user.id)

        await this.mailService.sendVerificationEmail(
            user.email,
            user.name,
            verificationCode.code,
        );

        return {
            can: verificationCode.can
        }
    }

    async verifyUserEmail(userId: string, code: string) {
        await this.verificationCodeService.verifyUserEmail(userId, code);

        const user = await this.usersService.findById(userId)

        if (!user) {
            throw new NotFoundException('Usuário não encontrado')
        }

        await this.usersService.updateStatus(user.id, USER_STATUS_ENUM.PENDING_REGISTRATION);
    }


    private generateAccessToken(user_id: User['id']): string {
        const payload = { sub: user_id };
        return this.jwtService.sign(payload);
    }
}

