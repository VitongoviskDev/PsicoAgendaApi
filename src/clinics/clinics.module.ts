import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicsController } from '@/clinics/clinics.controller';
import { ClinicsService } from '@/clinics/clinics.service';
import { Clinic } from '@/clinics/entity/clinic.entity';
import { User } from '@/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Clinic,
      User
    ])
  ],
  controllers: [ClinicsController],
  providers: [ClinicsService],
  exports: [ClinicsService]
})
export class ClinicsModule { }
