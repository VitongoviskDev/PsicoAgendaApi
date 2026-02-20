import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterClinicDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;

    @IsString()
    @IsOptional()
    crp?: string;

    @Transform(({ value }) => new Date(value))
    @IsDate()
    openedAt: Date;
}

