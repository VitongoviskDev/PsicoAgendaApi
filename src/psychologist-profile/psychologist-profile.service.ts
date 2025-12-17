import { Injectable } from '@nestjs/common';
import { PsychologistProfile } from './entity/psychologist-profile.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PsychologistProfileService { }
