import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { ClinicStaff, StaffRole } from './entity/clinic-staf.entity';
import { Clinic } from '../clinics/entity/clinic.entity';
export declare class ClinicStaffService {
    private readonly clinicStaffRepo;
    private readonly clinicRepo;
    private readonly userRepo;
    constructor(clinicStaffRepo: Repository<ClinicStaff>, clinicRepo: Repository<Clinic>, userRepo: Repository<User>);
    create(params: {
        userId: string;
        clinicId: string;
        role: StaffRole;
    }): Promise<ClinicStaff>;
    findByUser(params: {
        userId: string;
    }): Promise<ClinicStaff[]>;
}
