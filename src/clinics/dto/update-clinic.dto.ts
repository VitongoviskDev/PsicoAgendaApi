import { PartialType } from '@nestjs/mapped-types';
import { RegisterClinicDto } from '@/clinics/dto/register-clinic.dto';

export class UpdateClinicDto extends PartialType(RegisterClinicDto) { }
