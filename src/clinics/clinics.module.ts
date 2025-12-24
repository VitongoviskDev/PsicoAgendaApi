import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicsController } from '@/clinics/clinics.controller';
import { ClinicsService } from '@/clinics/clinics.service';
import { Clinic } from '@/clinics/entity/clinic.entity';
import { ClinicStaff } from '@/clinic-staff/entity/clinic-staf.entity';
import { User } from '@/users/entities/user.entity';
import { ClinicWorkingHours } from '@/clinic-working-hours/entity/clinic-working-hours.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Clinic,
      ClinicStaff,
      ClinicWorkingHours,
      User
    ])
  ],
  controllers: [ClinicsController],
  providers: [ClinicsService],
  exports: [ClinicsService]
})
export class ClinicsModule { }
