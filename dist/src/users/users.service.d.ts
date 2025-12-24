import { User, UserStatus } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CompleteUserProfileDto } from './dto/complete-user-profile.dto';
export declare class UsersService {
    private readonly dataSource;
    private readonly usersRepo;
    constructor(dataSource: DataSource, usersRepo: Repository<User>);
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User | null>;
    findByCpf(cpf: string): Promise<User | null>;
    create(data: Partial<User>): Promise<User>;
    findByEmailWithProfiles(email: string): Promise<User | null>;
    update(id: string, data: Partial<User>): Promise<User | null>;
    setLastClinic(userId: string, clinicId: string | null): Promise<User | null>;
    completeProfile(userId: string, clinicId: string, dto: CompleteUserProfileDto, file?: Express.Multer.File): Promise<{
        user: {
            id: string | undefined;
            name: string | undefined;
            email: string | undefined;
            phone: string | undefined;
            birthDate: Date | undefined;
            cpf: string | undefined;
            status: UserStatus | undefined;
            profiles: {
                staff: {
                    active: boolean;
                    role: import("../clinic-staff/entity/clinic-staf.entity").StaffRole;
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
    }>;
}
