import { PartialType } from '@nestjs/mapped-types';
import { RegisterClinicDto } from './register-clinic.dto';

export class UpdateClinicDto extends PartialType(RegisterClinicDto) {}
