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

    @Transform(({ value }) => {
        if (typeof value === 'boolean') return value;
        return value === 'true';
    })
    @IsBoolean()
    isPsychologist: boolean;

    @Transform(({ value }) =>
        typeof value === 'string'
            ? value.replace(/\D/g, '')
            : value
    )
    @IsOptional()
    @IsString()
    crp?: string;
}
