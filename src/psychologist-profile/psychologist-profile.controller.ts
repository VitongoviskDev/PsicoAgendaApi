import { Controller } from '@nestjs/common';
import { PsychologistProfileService } from './psychologist-profile.service';

@Controller('psychologist-profile')
export class PsychologistProfileController {
  constructor(private readonly psychologistProfileService: PsychologistProfileService) {}
}
