import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PsychologistProfileService } from './psychologist-profile.service';
import { PsychologistProfileController } from './psychologist-profile.controller';
import { PsychologistProfile } from './entities/psychologist-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PsychologistProfile])],
  controllers: [PsychologistProfileController],
  providers: [PsychologistProfileService],
  exports: [PsychologistProfileService],
})
export class PsychologistProfileModule { }
