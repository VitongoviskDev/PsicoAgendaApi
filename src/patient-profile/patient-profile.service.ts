import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PROFILE_STATUS_ENUM } from '@/common/enums/profile-status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PatientProfile } from './entities/patient-profile.entity';
import { UsersService } from '@/users/users.service';
import { RegisterPatientDto } from './dto/register-patient.dto';
import { User, USER_STATUS_ENUM } from '@/users/entities/user.entity';
import { UserClinic } from '@/user-clinic/entities/user-clinic.entity';
import { Clinic } from '@/clinics/entity/clinic.entity';

function parseDMYDate(dateStr: string | undefined): Date | undefined {
    if (!dateStr) return undefined;
    const [day, month, year] = dateStr.split('/').map(Number);
    if (!day || !month || !year) return undefined;
    const date = new Date(year, month - 1, day);
    return isNaN(date.getTime()) ? undefined : date;
}

@Injectable()
export class PatientProfileService {
    constructor(
        @InjectRepository(PatientProfile)
        private readonly patientProfileRepo: Repository<PatientProfile>,
        private readonly usersService: UsersService,
        private readonly dataSource: DataSource,
    ) { }

    async checkPatientByCpf(clinicId: string, cpf: string) {
        const user = await this.usersService.findByCpf(cpf);

        if (!user) {
            return {
                user: null,
                isAlreadyPatientInClinic: false,
            };
        }

        const userClinic = user.userClinics?.find(uc => uc.clinic.id === clinicId);
        const isAlreadyPatientInClinic = !!userClinic?.patientProfile;

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                status: user.status,
            },
            isAlreadyPatientInClinic,
        };
    }

    async registerPatient(clinicId: string, dto: RegisterPatientDto) {
        return this.dataSource.transaction(async (manager) => {
            let user: User | null = null;

            if (dto.user_id) {
                user = await manager.findOne(User, {
                    where: { id: dto.user_id },
                    relations: ['userClinics', 'userClinics.clinic', 'userClinics.patientProfile']
                });
                if (!user) throw new NotFoundException('Usuário não encontrado');
            } else if (dto.cpf) {
                user = await manager.findOne(User, {
                    where: { cpf: dto.cpf },
                    relations: ['userClinics', 'userClinics.clinic', 'userClinics.patientProfile']
                });

                if (!user) {
                    // Create a "ghost" user (pending app registration)
                    user = manager.create(User, {
                        name: dto.name || 'Paciente',
                        email: dto.email || `${dto.cpf}@placeholder.com`,
                        cpf: dto.cpf,
                        phone: dto.phone,
                        birthDate: parseDMYDate(dto.birth_date),
                        status: USER_STATUS_ENUM.INVITE_PENDING,
                        password: 'NOT_SET_' + Math.random().toString(36).substring(7), // Internal marker
                    });
                    await manager.save(user);
                }
            } else {
                throw new ConflictException('UserId ou CPF deve ser informado');
            }

            if (!user) throw new Error('Falha ao processar usuário');

            // Check if already linked to this clinic
            let userClinic = user.userClinics?.find(uc => uc.clinic.id === clinicId);

            if (!userClinic) {
                const clinic = await manager.findOne(Clinic, { where: { id: clinicId } });
                if (!clinic) throw new NotFoundException('Clínica não encontrada');

                userClinic = manager.create(UserClinic, {
                    user,
                    clinic,
                });
                await manager.save(userClinic);
            }

            if (userClinic.patientProfile) {
                throw new ConflictException('Paciente já cadastrado nesta clínica');
            }

            const patientProfile = manager.create(PatientProfile, {
                userClinic,
                code: dto.code,
                status: PROFILE_STATUS_ENUM.WAITING_FIRST_SECTION,
            });

            await manager.save(patientProfile);

            return {
                patient: patientProfile,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    cpf: user.cpf,
                }
            };
        });
    }

    async findAllByClinic(clinicId: string) {
        const patients = await this.patientProfileRepo.find({
            where: {
                userClinic: {
                    clinic: { id: clinicId }
                }
            },
            relations: ['userClinic', 'userClinic.user'],
            order: {
                userClinic: {
                    user: { name: 'ASC' }
                }
            }
        });

        return {
            patients: patients.map(p => ({
                id: p.id,
                code: p.code,
                status: p.status,
                createdAt: p.createdAt,
                updatedAt: p.updatedAt,
                user: p.userClinic.user
            })),
        }
    }

    async getOverview(clinicId: string, patientId: string) {
        const patient = await this.patientProfileRepo.findOne({
            where: {
                id: patientId,
                userClinic: {
                    clinic: { id: clinicId }
                }
            },
            relations: ['userClinic', 'userClinic.user'],
        });

        if (!patient) {
            throw new NotFoundException('Paciente não encontrado');
        }

        const patientResponse = {
            id: patient.id,
            code: patient.code,
            status: patient.status,
            createdAt: patient.createdAt,
            updatedAt: patient.updatedAt,
            user: patient.userClinic.user
        }
        return {
            patient: patientResponse,
            first_session: null,
            last_session: null,
            next_session: null,
            sessions: {
                completed: 12,
                canceled: 3,
                missed: 1,
                total: 16,
            }
        }
    }
}
