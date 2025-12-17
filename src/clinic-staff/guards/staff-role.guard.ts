import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

// clinic-staff/guards/staff-role.guard.ts
@Injectable()
export class StaffRoleGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
    ) { }

    canActivate(context: ExecutionContext): boolean {
        // valida OWNER / ADMIN / EMPLOYEE
        return true;
    }
}
