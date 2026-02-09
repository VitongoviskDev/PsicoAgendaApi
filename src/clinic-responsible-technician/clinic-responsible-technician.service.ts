import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClinicResponsibleTechnician } from './entities/clinic-responsible-technician.entity';

@Injectable()
export class ClinicResponsibleTechnicianService {
    constructor(
        @InjectRepository(ClinicResponsibleTechnician)
        private readonly rtRepo: Repository<ClinicResponsibleTechnician>,
    ) { }
}
