import { Controller } from '@nestjs/common';
import { StaffProfileService } from './staff-profile.service';

@Controller('staff-profile')
export class StaffProfileController {
  constructor(private readonly staffProfileService: StaffProfileService) {}
}
