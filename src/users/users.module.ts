import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { StaffProfile } from 'src/staff-profile/entity/staff-profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      StaffProfile
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }

