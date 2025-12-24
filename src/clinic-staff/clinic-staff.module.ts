import { Module } from '@nestjs/common';
import { ClinicStaffController } from '@/clinic-staff/clinic-staff.controller';
import { ClinicStaffService } from '@/clinic-staff/clinic-staff.service';
import { ClinicStaff } from '@/clinic-staff/entity/clinic-staf.entity';
import { Clinic } from '@/clinics/entity/clinic.entity';
import { User } from '@/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClinicStaff,
      Clinic,
      User
    ])
  ],
  controllers: [ClinicStaffController],
  providers: [ClinicStaffService],
  exports: [ClinicStaffService]
})
export class ClinicStaffModule { }
