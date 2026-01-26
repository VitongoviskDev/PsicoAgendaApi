import { Module } from '@nestjs/common';
import { StaffProfileService } from './staff-profile.service';
import { StaffProfileController } from './staff-profile.controller';

@Module({
  controllers: [StaffProfileController],
  providers: [StaffProfileService],
})
export class StaffProfileModule {}
