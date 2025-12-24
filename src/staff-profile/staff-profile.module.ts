import { Module } from '@nestjs/common';
import { StaffProfileService } from '@/staff-profile/staff-profile.service';
import { StaffProfileController } from '@/staff-profile/staff-profile.controller';

@Module({
  providers: [StaffProfileService],
  controllers: [StaffProfileController],
  exports: [StaffProfileService]
})
export class StaffProfileModule { }
