import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Clinic, CLINIC_STATUS_ENUM } from './entity/clinic.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterClinicDto } from './dto/register-clinic.dto';
import { STAFF_ROLE_ENUM, StaffProfile } from '@/staff-profile/entities/staff-profile.entity';
import { PROFILE_STATUS_ENUM } from '@/common/enums/profile-status.enum';
import { UserClinic } from '@/user-clinic/entities/user-clinic.entity';
import { User, USER_STATUS_ENUM } from '@/users/entities/user.entity';

import { UsersService } from '@/users/users.service';
import { AuthService } from '@/auth/auth.service';

@Injectable()
export class ClinicsService {
    constructor(
        private readonly dataSource: DataSource,
        private readonly usersService: UsersService,

        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService,

        @InjectRepository(Clinic)
        private readonly clinicRepo: Repository<Clinic>,
    ) { }

    async registerClinic(userId: string, body: RegisterClinicDto) {
        return this.dataSource.transaction(async (manager) => {
            const clinic = await manager.save(Clinic, {
                name: body.name,
                description: body.description,
                openedAt: body.openedAt,
                status: CLINIC_STATUS_ENUM.ACTIVE,
            });

            const user = await manager.findOne(User, {
                where: { id: userId },
                relations: ['psychologistProfile'],
            });

            const userClinic = await manager.save(UserClinic, {
                user: { id: userId },
                clinic: clinic,
                psychologistProfile: user?.psychologistProfile || undefined,
            });

            await manager.update(User, { id: userId }, {
                currentUserClinic: userClinic,
            });

            const profile = await manager.save(StaffProfile, {
                role: STAFF_ROLE_ENUM.OWNER,
                userClinic: userClinic,
                status: PROFILE_STATUS_ENUM.ACTIVE,
            });

            await this.usersService.tryActivateUser(userId, manager);

            const updatedUser = await manager.findOne(User, {
                where: { id: userId },
                relations: [
                    'userClinics',
                    'userClinics.clinic',
                    'currentUserClinic',
                    'currentUserClinic.clinic',
                    'currentUserClinic.staffProfile',
                    'currentUserClinic.patientProfile',
                    'psychologistProfile'
                ]
            });

            if (!updatedUser) {
                throw new Error('User not found after registration');
            }

            const tokenType = updatedUser.status === USER_STATUS_ENUM.ACTIVE ? 'access' : 'onboarding';
            const token = this.authService.generateAccessToken(userId, tokenType);

            return {
                user: updatedUser,
                [tokenType === 'access' ? 'access_token' : 'onboarding_token']: token,
                clinic,
                profiles: {
                    staff_profile: profile
                }
            };
        });
    }
}
