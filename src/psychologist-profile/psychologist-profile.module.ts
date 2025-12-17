import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PsychologistProfile } from './entity/psychologist-profile.entity';
import { PsychologistProfileService } from './psychologist-profile.service';
import { PsychologistProfileController } from './psychologist-profile.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([PsychologistProfile])
  ],
  controllers: [PsychologistProfileController],
  providers: [PsychologistProfileService],
  exports: [PsychologistProfileService],
})
export class PsychologistProfileModule { }
