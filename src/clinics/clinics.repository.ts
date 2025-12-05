import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clinic } from './entities/clinic.entity';

@Injectable()
export class ClinicsRepository extends Repository<Clinic> {
    constructor(
        @InjectRepository(Clinic)
        private readonly repo: Repository<Clinic>,
    ) {
        super(repo.target, repo.manager, repo.queryRunner);
    }
}
