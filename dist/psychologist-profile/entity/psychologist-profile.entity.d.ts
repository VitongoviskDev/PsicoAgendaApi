import { User } from "../../users/entities/user.entity";
export declare class PsychologistProfile {
    userId: string;
    user: User;
    crp: string;
    specialty?: string;
    active: boolean;
}
