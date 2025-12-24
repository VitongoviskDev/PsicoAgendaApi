
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Clinic } from '@/clinics/entity/clinic.entity';
import { Exclude } from 'class-transformer';


@Entity('clinic_working_hours')
export class ClinicWorkingHours {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'int' })
    dayOfWeek: number;
    // 0 = Domingo, 6 = Sábado (padrão JS)

    @Column({ type: 'time' })
    openAt: string; // '08:00'

    @Column({ type: 'time' })
    closeAt: string; // '18:00'

    @ManyToOne(() => Clinic, clinic => clinic.workingHours, {
        onDelete: 'CASCADE',
    })
    @Exclude()
    clinic: Clinic;
}
