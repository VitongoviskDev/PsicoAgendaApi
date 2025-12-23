import { IsInt, IsString } from "class-validator";

export class WorkingHoursDto {
    @IsInt()
    dayOfWeek: number;

    @IsString()
    openAt: string;

    @IsString()
    closeAt: string;
}