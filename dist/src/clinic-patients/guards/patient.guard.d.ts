import { CanActivate, ExecutionContext } from "@nestjs/common";
export declare class PatientGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
