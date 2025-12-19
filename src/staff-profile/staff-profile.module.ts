import { Module } from '@nestjs/common';
import { StaffProfileService } from './staff-profile.service';
import { StaffProfileController } from './staff-profile.controller';

@Module({
  providers: [StaffProfileService],
  controllers: [StaffProfileController],
  exports: [StaffProfileService]
})
export class StaffProfileModule { }
