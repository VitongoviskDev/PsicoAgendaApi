import { PatientProfile } from "../../patient-profile/entity/patient-profile.entity";
import { PsychologistProfile } from "../../psychologist-profile/entity/psychologist-profile.entity";
import { StaffProfile } from "../../staff-profile/entity/staff-profile.entity";
export declare enum UserStatus {
    PENDING_REGISTRATION = "PENDING_REGISTRATION",
    ACTIVE = "ACTIVE",
    DISABLED = "DISABLED",
    BLOCKED = "BLOCKED"
}
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    phone?: string;
    birthDate?: Date;
    cpf?: string;
    lastClinicId?: string | null;
    status: UserStatus;
    staffProfile?: StaffProfile;
    psychologistProfile?: PsychologistProfile;
    patientProfile?: PatientProfile;
}
