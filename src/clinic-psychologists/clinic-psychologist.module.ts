import { Module } from '@nestjs/common';
import { ClinicPsychologistService } from '@/clinic-psychologists/clinic-psychologist.service';
import { ClinicPsychologistController } from '@/clinic-psychologists/clinic-psychologist.controller';

@Module({
  providers: [ClinicPsychologistService],
  controllers: [ClinicPsychologistController]
})
export class ClinicPsychologistModule {}
