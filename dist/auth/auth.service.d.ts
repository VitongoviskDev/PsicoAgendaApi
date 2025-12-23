import { JwtService } from '@nestjs/jwt';
import { ClinicsService } from '../clinics/clinics.service';
import { Clinic, ClinicStatus } from '../clinics/entity/clinic.entity';
import { DataSource } from 'typeorm';
import { User, UserStatus } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterOwnerDto } from './dto/register-owner.dto';
import { ClinicStaffService } from '../clinic-staff/clinic-staff.service';
import { StaffRole } from '../clinic-staff/entity/clinic-staf.entity';
export declare class AuthService {
    private readonly dataSource;
    private usersService;
    private clinicsService;
    private clinicStaffService;
    private jwtService;
    constructor(dataSource: DataSource, usersService: UsersService, clinicsService: ClinicsService, clinicStaffService: ClinicStaffService, jwtService: JwtService);
    registerOwner(dto: RegisterOwnerDto): Promise<{
        user: User;
        currentClinic: Clinic;
        clinics: Clinic[];
        access_token: string;
    }>;
    login(dto: LoginDto): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            phone: string | undefined;
            birthDate: Date | undefined;
            cpf: string | undefined;
            status: UserStatus;
            profiles: {
                staff: {
                    active: boolean;
                    role: StaffRole;
                } | null;
                psychologist: {
                    active: boolean;
                    crp: string;
                    specialty: string | null;
                } | null;
                patient: {
                    notes: string | null;
                } | null;
            };
        };
        currentClinic: {
            id: string;
            name: string;
            status: ClinicStatus;
            staffRole: StaffRole;
        };
        clinics: {
            id: string;
            name: string;
            status: ClinicStatus;
            staffRole: StaffRole;
        }[];
        access_token: string;
    }>;
}
