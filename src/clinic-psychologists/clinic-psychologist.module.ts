import { Module } from '@nestjs/common';
import { ClinicPsychologistService } from './clinic-psychologist.service';
import { ClinicPsychologistController } from './clinic-psychologist.controller';

@Module({
  providers: [ClinicPsychologistService],
  controllers: [ClinicPsychologistController]
})
export class ClinicPsychologistModule {}
