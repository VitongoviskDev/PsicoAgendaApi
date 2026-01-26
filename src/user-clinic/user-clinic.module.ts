import { Module } from '@nestjs/common';
import { UserClinicService } from './user-clinic.service';
import { UserClinicController } from './user-clinic.controller';
import { UserClinic } from './entities/user-clinic.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserClinic,
    ])
  ],
  controllers: [UserClinicController],
  providers: [UserClinicService],
  exports: [UserClinicService],
})
export class UserClinicModule { }
