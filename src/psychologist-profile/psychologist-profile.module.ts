import { Module } from '@nestjs/common';
import { PsychologistProfileService } from './psychologist-profile.service';
import { PsychologistProfileController } from './psychologist-profile.controller';

@Module({
  controllers: [PsychologistProfileController],
  providers: [PsychologistProfileService],
})
export class PsychologistProfileModule {}
