import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { ClinicUserRoleModule } from 'src/clinic-user-role/clinic-user-role.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ClinicUserRoleModule
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule { }

