import { Transform, Type } from 'class-transformer';
import { IsArray, IsDate, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';

export class CompleteClinicDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsString()
    description: string;

    @Transform(({ value }) => new Date(value))
    @IsDate()
    openedAt: Date;

    // @IsArray()
    // @ValidateNested({ each: true })
    // @Type(() => WorkingHoursDto)
    // workingHours: WorkingHoursDto[];
}
