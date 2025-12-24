import { DataSource, Repository } from 'typeorm';
import { Clinic } from './entity/clinic.entity';
import { CompleteClinicDto } from './dto/complete-clinic.dto';
export declare class ClinicsService {
    private readonly dataSource;
    private readonly clinicRepo;
    constructor(dataSource: DataSource, clinicRepo: Repository<Clinic>);
    createDefaultClinic(): Promise<Clinic>;
    findById(id: string): Promise<Clinic | null>;
    update(id: string, data: Partial<Clinic>): Promise<Clinic | null>;
    completeClinic(clinicId: string, dto: CompleteClinicDto, file?: Express.Multer.File): Promise<{
        clinic: Clinic;
    }>;
}
