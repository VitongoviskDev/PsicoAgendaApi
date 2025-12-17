import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ClinicStatus } from '../entity/clinic.entity';

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
    @IsEnum(ClinicStatus)
    status?: ClinicStatus;
}
