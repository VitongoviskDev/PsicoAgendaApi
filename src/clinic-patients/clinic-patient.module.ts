import { Module } from '@nestjs/common';
import { ClinicPatientService } from '@/clinic-patients/clinic-patient.service';
import { ClinicPatientController } from '@/clinic-patients/clinic-patient.controller';

@Module({
  providers: [ClinicPatientService],
  controllers: [ClinicPatientController]
})
export class ClinicPatientModule {}
