import { Injectable } from '@nestjs/common';
import { User, UserStatus } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CompleteUserProfileDto } from './dto/complete-user-profile.dto';
import { PsychologistProfile } from '../psychologist-profile/entity/psychologist-profile.entity';
import { StaffProfile } from '../staff-profile/entity/staff-profile.entity';
import { ClinicStaff } from '../clinic-staff/entity/clinic-staf.entity';
import type { Express } from 'express';

@Injectable()
export class UsersService {
    constructor(
        private readonly dataSource: DataSource,

        @InjectRepository(User)
        private readonly usersRepo: Repository<User>,

    ) { }

    findAll() {
        return this.usersRepo.find();
    }

    findById(id: string) {
        return this.usersRepo.findOne({ where: { id } });
    }

    findByCpf(cpf: string) {
        return this.usersRepo.findOne({ where: { cpf } });
    }

    create(data: Partial<User>) {
        const user = this.usersRepo.create(data);
        return this.usersRepo.save(user);
    }

    async findByEmailWithProfiles(email: string) {
        return this.usersRepo.findOne({
            where: { email },
            relations: {
                staffProfile: true,
                psychologistProfile: true,
                patientProfile: true,
            },
        });
    }

    async update(id: string, data: Partial<User>) {
        await this.usersRepo.update(id, data);
        return this.findById(id);
    }

    async setLastClinic(userId: string, clinicId: string | null) {
        await this.usersRepo.update(userId, { lastClinicId: clinicId });
        return this.findById(userId);
    }

    async completeProfile(
        userId: string,
        clinicId: string,
        dto: CompleteUserProfileDto,
        file?: Express.Multer.File,
    ) {
        return this.dataSource.transaction(async manager => {

            await manager.update(User, userId, {
                cpf: dto.cpf,
                birthDate: dto.birthDate,
                phone: dto.phone,
                status: UserStatus.ACTIVE,
            });

            if (dto.actAsPsychologist) {
                const exists = await manager.findOne(PsychologistProfile, {
                    where: { user: { id: userId } },
                });

                if (!exists) {
                    await manager.save(PsychologistProfile, {
                        user: { id: userId },
                        crp: dto.crp,
                    });
                }
            }

            // const staffExists = await manager.findOne(StaffProfile, {
            //     where: { user: { id: userId } },
            // });

            // if (!staffExists) {
            //     await manager.save(StaffProfile, {
            //         user: { id: userId },
            //         active: true,
            //     });
            // }

            const user = await manager.findOne(User, {
                where: { id: userId },
                relations: {
                    staffProfile: true,
                    psychologistProfile: true,
                    patientProfile: true,
                },
            });

            const staffRelation = await manager.findOne(ClinicStaff, {
                where: {
                    user: { id: userId },
                    clinic: { id: clinicId },
                },
            });


            return {
                user: {
                    id: user?.id,
                    name: user?.name,
                    email: user?.email,
                    phone: user?.phone,
                    birthDate: user?.birthDate,
                    cpf: user?.cpf,
                    status: user?.status,
                    profiles: {
                        staff: !!staffRelation && !!user?.staffProfile ? {
                            active: user?.staffProfile.active,
                            role: staffRelation.role,
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
                },

            };

        });
    }
}
