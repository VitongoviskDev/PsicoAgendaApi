import { Clinic } from "src/clinics/entity/clinic.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

// clinic-patients/entities/clinic-patient.entity.ts
@Entity('clinic_patients')
@Unique(['user', 'clinic'])
export class ClinicPatient {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Clinic, { onDelete: 'CASCADE' })
    clinic: Clinic;

    @Column({ default: true })
    active: boolean;
}
