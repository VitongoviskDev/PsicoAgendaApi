import { ActivityLogService } from '@/activity-log/activity-log.service';
import { Clinic } from '@/clinics/entity/clinic.entity';
import { PatientProfile } from '@/patient-profile/entities/patient-profile.entity';
import { PsychologistProfile } from '@/psychologist-profile/entities/psychologist-profile.entity';
import { User } from '@/users/entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateSessionDto } from './dto/create-session.dto';
import { SessionHistory } from './entities/session-history.entity';
import { Session, SESSION_STATUS_ENUM } from './entities/session.entity';

@Injectable()
export class SessionService {
    constructor(
        private readonly dataSource: DataSource,
        @InjectRepository(Session)
        private readonly sessionRepo: Repository<Session>,
        @InjectRepository(SessionHistory)
        private readonly sessionHistoryRepo: Repository<SessionHistory>,
        private readonly activityLogService: ActivityLogService,
    ) { }

    async create(clinicId: string, performedById: string, dto: CreateSessionDto) {
        return this.dataSource.transaction(async (manager) => {
            // 1. Resolve relations
            const patient = await manager.findOne(PatientProfile, { where: { id: dto.patientId } });
            if (!patient) throw new NotFoundException('Paciente não encontrado');

            const psychologist = await manager.findOne(PsychologistProfile, { where: { id: dto.psychologistId } });
            if (!psychologist) throw new NotFoundException('Psicólogo não encontrado');

            const clinic = await manager.findOne(Clinic, { where: { id: clinicId } });
            if (!clinic) throw new NotFoundException('Clínica não encontrada');

            const performedBy = await manager.findOne(User, { where: { id: performedById } });
            if (!performedBy) throw new NotFoundException('Usuário não encontrado');

            // 2. Create Session
            const session = manager.create(Session, {
                patient,
                psychologist,
                clinic,
                createdBy: performedBy,
                date: new Date(dto.date),
                duration: dto.duration,
                price: dto.price,
                status: dto.status || SESSION_STATUS_ENUM.WAITING_CONFIRMATION,
            });

            const savedSession = await manager.save(session);

            // 3. Create Session History (Domain History)
            const history = manager.create(SessionHistory, {
                session: savedSession,
                newStatus: savedSession.status,
                changedBy: performedBy,
                reason: 'Agendamento inicial',
            });
            await manager.save(history);

            // 4. Create Activity Log (System Audit)
            await this.activityLogService.log({
                performedBy: { id: performedById },
                clinic: { id: clinicId },
                targetEntity: 'SESSION',
                targetId: savedSession.id,
                action: 'CREATED',
                metadata: {
                    status: savedSession.status,
                    date: savedSession.date,
                },
            });

            return savedSession;
        });
    }

    async findAllByClinic(clinicId: string) {

        const sessions = await this.sessionRepo.find({
            where: { clinic: { id: clinicId } },
            relations: ['patient', 'patient.userClinic.user', 'psychologist', 'psychologist.user', 'createdBy'],
            order: { date: 'ASC' },
        });

        return {
            sessions: sessions.map((session) => ({
                ...session,
                patient: {
                    ...session.patient,
                    userClinic: null,
                    user: session.patient.userClinic.user,
                },
            })),
        }
    }
}
