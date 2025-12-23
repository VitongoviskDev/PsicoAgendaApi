import { WorkingHoursDto } from 'src/clinic-working-hours/dto/clinic-working-hours.dto';
export declare class CompleteClinicDto {
    name: string;
    description: string;
    openedAt: Date;
    workingHours: WorkingHoursDto[];
}
