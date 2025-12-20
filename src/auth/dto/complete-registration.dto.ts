import { Type } from 'class-transformer';
import { ValidateNested, IsOptional } from 'class-validator';
import { RegisterClinicDto } from '../../clinics/dto/register-clinic.dto';
import { RegisterPsychologistDto } from '../../psychologist-profile/dto/register-psychologist.dto';

export class CompleteOwnerRegistrationDto {
    @ValidateNested()
    @Type(() => RegisterClinicDto)
    clinic?: RegisterClinicDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RegisterPsychologistDto)
    psychologist?: RegisterPsychologistDto;
}
