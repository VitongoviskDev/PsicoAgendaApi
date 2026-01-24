import { PartialType } from '@nestjs/mapped-types';
import { CreateUserClinicDto } from './create-user-clinic.dto';

export class UpdateUserClinicDto extends PartialType(CreateUserClinicDto) {}
