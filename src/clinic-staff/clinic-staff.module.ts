import { Module } from '@nestjs/common';
import { ClinicStaffController } from './clinic-staff.controller';
import { ClinicStaffService } from './clinic-staff.service';

@Module({
  controllers: [ClinicStaffController],
  providers: [ClinicStaffService]
})
export class ClinicStaffModule {}
