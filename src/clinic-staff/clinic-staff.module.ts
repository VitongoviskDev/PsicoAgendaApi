import { Module } from '@nestjs/common';
import { ClinicStaffController } from './clinic-staff.controller';
import { ClinicStaffService } from './clinic-staff.service';
import { ClinicStaff } from './entity/clinic-staf.entity';
import { Clinic } from 'src/clinics/entity/clinic.entity';
import { User } from 'src/users/entities/user.entity';
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
