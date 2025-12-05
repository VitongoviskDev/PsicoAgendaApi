import { Module } from '@nestjs/common';
import { ClinicsService } from './clinics.service';
import { ClinicsController } from './clinics.controller';
import { ClinicUserRoleModule } from '../clinic-user-role/clinic-user-role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clinic } from './entities/clinic.entity';
import { ClinicsRepository } from './clinics.repository';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Clinic]),
    ClinicUserRoleModule,
    UsersModule
  ],
  controllers: [ClinicsController],
  providers: [ClinicsService, ClinicsRepository],
  exports: [ClinicsService, ClinicsRepository]
})
export class ClinicsModule { }
