import { Module } from '@nestjs/common';
import { PatientProfileService } from './patient-profile.service';
import { PatientProfileController } from './patient-profile.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientProfile } from './entities/patient-profile.entity';
import { UsersModule } from '@/users/users.module';
import { UserClinicModule } from '@/user-clinic/user-clinic.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PatientProfile]),
    UsersModule,
    UserClinicModule,
  ],
  controllers: [PatientProfileController],
  providers: [PatientProfileService],
  exports: [PatientProfileService],
})
export class PatientProfileModule { }
