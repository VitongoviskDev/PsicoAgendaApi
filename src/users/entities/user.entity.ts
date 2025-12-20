import { PatientProfile } from "../../patient-profile/entity/patient-profile.entity";
import { PsychologistProfile } from "../../psychologist-profile/entity/psychologist-profile.entity";
import { StaffProfile } from "../../staff-profile/entity/staff-profile.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export enum UserStatus {
    PENDING_REGISTRATION = 'PENDING_REGISTRATION',
    ACTIVE = 'ACTIVE',
    DISABLED = 'DISABLED',
    BLOCKED = 'BLOCKED',
}

// users/entities/user.entity.ts
@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    phone?: string;

    @Column({ nullable: true })
    birthDate?: Date;

    @Column({ nullable: true, unique: true })
    cpf?: string;

    @Column({ type: 'uuid', nullable: true })
    lastClinicId?: string | null;

    @Column({
        type: 'enum',
        enum: UserStatus,
        default: UserStatus.PENDING_REGISTRATION,
    })
    status: UserStatus;

    @OneToOne(() => StaffProfile, p => p.user)
    staffProfile?: StaffProfile;

    @OneToOne(() => PsychologistProfile, p => p.user)
    psychologistProfile?: PsychologistProfile;

    @OneToOne(() => PatientProfile, p => p.user)
    patientProfile?: PatientProfile;
}