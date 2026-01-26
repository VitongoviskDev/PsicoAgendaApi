import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CLINIC_STATUS_ENUM, type ClinicStatus } from '@/clinics/entity/clinic.entity';

export class RegisterClinicDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsEnum(CLINIC_STATUS_ENUM)
    status?: ClinicStatus;
}
