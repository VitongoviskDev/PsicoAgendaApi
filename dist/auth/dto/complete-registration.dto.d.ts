import { RegisterClinicDto } from '../../clinics/dto/register-clinic.dto';
import { RegisterPsychologistDto } from '../../psychologist-profile/dto/register-psychologist.dto';
export declare class CompleteOwnerRegistrationDto {
    clinic?: RegisterClinicDto;
    psychologist?: RegisterPsychologistDto;
}
