import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityLog } from './entities/activity-log.entity';

@Injectable()
export class ActivityLogService {
    constructor(
        @InjectRepository(ActivityLog)
        private readonly activityLogRepo: Repository<ActivityLog>,
    ) { }

    async log(data: {
        performedBy: { id: string };
        clinic: { id: string };
        targetEntity: string;
        targetId: string;
        action: string;
        metadata?: any;
    }) {
        const log = this.activityLogRepo.create({
            performedBy: data.performedBy,
            clinic: data.clinic,
            targetEntity: data.targetEntity,
            targetId: data.targetId,
            action: data.action,
            metadata: data.metadata,
        });

        return this.activityLogRepo.save(log);
    }
}
