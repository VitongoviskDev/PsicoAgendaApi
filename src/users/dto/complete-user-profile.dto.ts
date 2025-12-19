import { Transform } from 'class-transformer';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

export class CompleteUserProfileDto {
    @Transform(({ value }) =>
        typeof value === 'string'
            ? value.replace(/\D/g, '')
            : value
    )
    @IsString()
    cpf: string;

    @Transform(({ value }) => new Date(value))
    @IsDate()
    birthDate: string;

    @Transform(({ value }) =>
        typeof value === 'string'
            ? value.replace(/\D/g, '')
            : value
    )
    @IsString()
    phone: string;

    @Transform(({ value }) => value === 'true')
    @IsBoolean()
    actAsPsychologist: boolean;

    @Transform(({ value }) =>
        typeof value === 'string'
            ? value.replace(/\D/g, '')
            : value
    )
    @IsOptional()
    @IsString()
    crp?: string;
}
