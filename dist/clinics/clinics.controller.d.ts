import { ClinicsService } from './clinics.service';
import { ApiResponse } from '../responses/ApiResponse';
import { CompleteClinicDto } from './dto/complete-clinic.dto';
export declare class ClinicsController {
    private readonly clinicService;
    constructor(clinicService: ClinicsService);
    completeClinic(clinicId: string, file: Express.Multer.File, dto: CompleteClinicDto): Promise<ApiResponse<any>>;
}
