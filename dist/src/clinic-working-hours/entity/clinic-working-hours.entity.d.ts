import { Clinic } from '../../clinics/entity/clinic.entity';
export declare class ClinicWorkingHours {
    id: string;
    dayOfWeek: number;
    openAt: string;
    closeAt: string;
    clinic: Clinic;
}
