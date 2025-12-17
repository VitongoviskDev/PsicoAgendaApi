import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

// clinic-psychologists/guards/can-attend.guard.ts
@Injectable()
export class CanAttendGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        // psychologistProfile + ClinicPsychologist ativo
        return true;
    }
}
