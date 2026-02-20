import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from "class-validator";
import { SESSION_STATUS_ENUM, type SessionStatus } from "../entities/session.entity";

export class CreateSessionDto {
    @IsNotEmpty()
    @IsUUID()
    patientId: string;

    @IsNotEmpty()
    @IsUUID()
    psychologistId: string;

    @IsNotEmpty()
    @IsDateString()
    date: string;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    duration: number; // minutes

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    price: number; // cents

    @IsOptional()
    @IsEnum(SESSION_STATUS_ENUM)
    status?: SessionStatus;
}
