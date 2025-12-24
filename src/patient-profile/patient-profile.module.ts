import { forwardRef, Module } from '@nestjs/common';
import { PatientProfileService } from '@/patient-profile/patient-profile.service';
import { PatientProfileController } from '@/patient-profile/patient-profile.controller';
import { PatientProfile } from '@/patient-profile/entity/patient-profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([PatientProfile]),
  ],
  controllers: [PatientProfileController],
  providers: [PatientProfileService],
  exports: [PatientProfileService],
})
export class PatientProfileModule { }
