import { ClinicWorkingHours } from '../../clinic-working-hours/entity/clinic-working-hours.entity';
export declare enum ClinicStatus {
    PENDING_SETUP = "PENDING_SETUP",
    ACTIVE = "ACTIVE"
}
export declare class Clinic {
    id: string;
    name: string;
    nickname: string;
    description: string;
    cnpj: string;
    openedAt: Date;
    status: ClinicStatus;
    workingHours: ClinicWorkingHours[];
}
