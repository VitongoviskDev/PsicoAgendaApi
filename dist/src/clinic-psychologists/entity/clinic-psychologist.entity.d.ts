import { Clinic } from "../../clinics/entity/clinic.entity";
import { User } from "../../users/entities/user.entity";
export declare class ClinicPsychologist {
    id: string;
    user: User;
    clinic: Clinic;
    active: boolean;
}
