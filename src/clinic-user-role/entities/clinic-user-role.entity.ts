import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Clinic } from '../../clinics/entities/clinic.entity';

export enum ClinicRole {
    PATIENT = 'patient',
    PSYCHOLOGIST = 'psychologist',
    ADMIN = 'admin',
    OWNER = 'owner',
}

@Entity('clinic_user_roles')
export class ClinicUserRole {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.clinicRoles, { eager: true })
    user: User;

    @ManyToOne(() => Clinic, (clinic) => clinic.clinicRoles, { eager: true })
    clinic: Clinic;

    @Column({ type: 'enum', enum: ClinicRole })
    role: ClinicRole;
}
