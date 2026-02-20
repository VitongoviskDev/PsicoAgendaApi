import { ConflictException, Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User, USER_STATUS_ENUM } from './entities/user.entity';
import { CompleteUserProfileDto } from './dto/complete-user-profile.dto';
import { PsychologistProfile } from '@/psychologist-profile/entities/psychologist-profile.entity';
import { AuthService } from '@/auth/auth.service';

@Injectable()
export class UsersService {
    constructor(
        private readonly dataSource: DataSource,

        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService,

        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) { }

    async findById(id: User['id']) {
        return this.userRepo.findOne({
            where: { id: id },
            relations: [
                'userClinics',
                'userClinics.clinic',
                'userClinics.staffProfile',
                'userClinics.patientProfile',
                'currentUserClinic',
                'currentUserClinic.clinic',
                'currentUserClinic.staffProfile',
                'currentUserClinic.patientProfile',
                'psychologistProfile'
            ]
        });
    }

    async findByEmail(email: string) {
        return this.userRepo.findOne({
            where: { email: email },
            relations: [
                'userClinics',
                'userClinics.clinic',
                'userClinics.staffProfile',
                'userClinics.patientProfile',
                'currentUserClinic',
                'currentUserClinic.clinic',
                'currentUserClinic.staffProfile',
                'currentUserClinic.patientProfile',
                'psychologistProfile'
            ]
        });
    }

    async findByCpf(cpf: string) {
        return this.userRepo.findOne({
            where: { cpf: cpf },
            relations: [
                'userClinics',
                'userClinics.clinic',
                'userClinics.staffProfile',
                'userClinics.patientProfile',
                'currentUserClinic',
                'currentUserClinic.clinic',
                'currentUserClinic.staffProfile',
                'currentUserClinic.patientProfile',
                'psychologistProfile'
            ]
        });
    }

    async updateStatus(id: User['id'], status: User['status']) {
        return this.userRepo.update({ id: id }, { status: status });
    }

    async completeUserProfile(id: User['id'], body: CompleteUserProfileDto) {
        const { isPsychologist, crp, ...userData } = body;

        return this.dataSource.transaction(async (manager) => {

            const existingUser = await manager.findOne(User, {
                where: { cpf: userData.cpf },
            });

            if (existingUser && existingUser.id !== id) {
                throw new ConflictException('CPF já está em uso.');
            }

            // Fetch user with its current profiles to manage PsychologistProfile idempotently
            const currentUser = await manager.findOne(User, {
                where: { id: id },
                relations: ['psychologistProfile']
            });

            if (isPsychologist) {
                if (currentUser?.psychologistProfile) {
                    await manager.update(PsychologistProfile, currentUser.psychologistProfile.id, { crp });
                } else {
                    const psychologist = manager.create(PsychologistProfile, {
                        user: { id: id },
                        crp: crp,
                    });
                    await manager.save(psychologist);
                }
            } else if (currentUser?.psychologistProfile) {
                await manager.delete(PsychologistProfile, currentUser.psychologistProfile.id);
            }

            await manager.update(User, { id: id }, {
                ...userData,
            });

            // await this.tryActivateUser(id, manager);

            const user = await manager.findOne(User, {
                where: { id: id },
                relations: [
                    // 'userClinics',
                    // 'userClinics.clinic',
                    // 'currentUserClinic',
                    // 'currentUserClinic.clinic',
                    // 'currentUserClinic.staffProfile',
                    // 'currentUserClinic.patientProfile',
                    'psychologistProfile'
                ]
            });

            if (!user) {
                throw new Error('User not found after update');
            }

            const token = this.authService.generateAccessToken(id, 'onboarding');

            return {
                user,
                onboarding_token: token,
            };
        });
    }

    async tryActivateUser(userId: string, manager?: any) {
        const repo = manager ? manager.getRepository(User) : this.userRepo;
        const user = await repo.findOne({
            where: { id: userId },
            relations: ['userClinics']
        });

        if (!user) return;

        const isEmailVerified = user.status !== USER_STATUS_ENUM.PENDING_EMAIL_VERIFICATION;
        const hasClinic = user.userClinics && user.userClinics.length > 0;
        const hasProfile = !!user.cpf; // Profile is considered finished if CPF is present

        if (isEmailVerified && hasClinic && hasProfile) {
            await repo.update({ id: userId }, { status: USER_STATUS_ENUM.ACTIVE });
        }
    }
}
