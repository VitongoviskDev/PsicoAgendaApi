import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClinicDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    phone?: string;
}
