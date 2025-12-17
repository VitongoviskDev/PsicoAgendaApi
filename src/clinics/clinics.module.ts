import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicUserRole } from 'src/old/clinic-user-role/entities/clinic-user-role.entity';
import { UsersModule } from 'src/users/users.module';
import { ClinicsController } from './clinics.controller';
import { ClinicsService } from './clinics.service';
import { Clinic } from './entity/clinic.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Clinic, ClinicUserRole]),
    forwardRef(() => UsersModule)
  ],
  controllers: [ClinicsController],
  providers: [ClinicsService],
  exports: [ClinicsService]
})
export class ClinicsModule { }
