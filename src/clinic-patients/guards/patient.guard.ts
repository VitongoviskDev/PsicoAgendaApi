import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

// clinic-patients/guards/patient.guard.ts
@Injectable()
export class PatientGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        // ClinicPatient ativo
        return true;
    }
}
