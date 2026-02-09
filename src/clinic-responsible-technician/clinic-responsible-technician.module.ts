import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicResponsibleTechnician } from './entities/clinic-responsible-technician.entity';
import { ClinicResponsibleTechnicianController } from './clinic-responsible-technician.controller';
import { ClinicResponsibleTechnicianService } from './clinic-responsible-technician.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ClinicResponsibleTechnician]),
    ],
    controllers: [ClinicResponsibleTechnicianController],
    providers: [ClinicResponsibleTechnicianService],
    exports: [ClinicResponsibleTechnicianService],
})
export class ClinicResponsibleTechnicianModule { }
