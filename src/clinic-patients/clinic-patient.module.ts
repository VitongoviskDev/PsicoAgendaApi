import { Module } from '@nestjs/common';
import { ClinicPatientService } from './clinic-patient.service';
import { ClinicPatientController } from './clinic-patient.controller';

@Module({
  providers: [ClinicPatientService],
  controllers: [ClinicPatientController]
})
export class ClinicPatientModule {}
