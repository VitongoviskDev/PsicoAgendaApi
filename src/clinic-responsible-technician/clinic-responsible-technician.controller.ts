import { Controller } from '@nestjs/common';
import { ClinicResponsibleTechnicianService } from './clinic-responsible-technician.service';

@Controller('clinic-responsible-technicians')
export class ClinicResponsibleTechnicianController {
    constructor(private readonly rtService: ClinicResponsibleTechnicianService) { }
}
