import { Module } from '@nestjs/common';
import { UserClinicService } from './user-clinic.service';
import { UserClinicController } from './user-clinic.controller';

@Module({
  controllers: [UserClinicController],
  providers: [UserClinicService],
})
export class UserClinicModule {}
