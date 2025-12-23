import { ClinicStatus } from '../entity/clinic.entity';
export declare class RegisterClinicDto {
    name: string;
    address?: string;
    phone?: string;
    status?: ClinicStatus;
}
