import { Clinic } from "../../clinics/entity/clinic.entity";
import { User } from "../../users/entities/user.entity";
export declare enum StaffRole {
    OWNER = "OWNER",
    ADMIN = "ADMIN",
    EMPLOYEE = "EMPLOYEE"
}
export declare class ClinicStaff {
    id: string;
    user: User;
    clinic: Clinic;
    role: StaffRole;
}
