import { SetMetadata } from "@nestjs/common";
import { StaffRole } from "@/clinic-staff/entity/clinic-staf.entity";

// clinic-staff/guards/staff-role.decorator.ts
export const StaffRoles = (...roles: StaffRole[]) =>
    SetMetadata('staff_roles', roles);
