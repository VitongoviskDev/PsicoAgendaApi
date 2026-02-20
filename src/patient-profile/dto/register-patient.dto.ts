import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

export class RegisterPatientDto {
    @IsOptional()
    @IsUUID()
    user_id?: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    cpf?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    birth_date?: string;

    @IsOptional()
    @IsString()
    code?: string;
}
