import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ClinicUserRoleModule } from 'src/old/clinic-user-role/clinic-user-role.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => ClinicUserRoleModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }

