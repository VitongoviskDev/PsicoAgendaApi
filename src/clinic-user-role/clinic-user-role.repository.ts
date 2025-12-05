import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClinicUserRole } from './entities/clinic-user-role.entity';

@Injectable()
export class ClinicUserRoleRepository extends Repository<ClinicUserRole> {
    constructor(
        @InjectRepository(ClinicUserRole)
        private readonly repo: Repository<ClinicUserRole>,
    ) {
        super(repo.target, repo.manager, repo.queryRunner);
    }
}
