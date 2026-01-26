import { Controller } from '@nestjs/common';
import { PatientProfileService } from './patient-profile.service';

@Controller('patient-profile')
export class PatientProfileController {
  constructor(private readonly patientProfileService: PatientProfileService) {}
}
