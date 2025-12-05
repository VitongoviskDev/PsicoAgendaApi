import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicUserRole } from './entities/clinic-user-role.entity';
import { ClinicUserRoleRepository } from './clinic-user-role.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ClinicUserRole])],
  providers: [ClinicUserRoleRepository],
  exports: [TypeOrmModule, ClinicUserRoleRepository],
})
export class ClinicUserRoleModule { }
