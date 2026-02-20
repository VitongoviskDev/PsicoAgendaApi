import { Clinic } from "@/clinics/entity/clinic.entity";
import { AuditableEntity } from "@/common/entities/auditable.entity";
import { PatientProfile } from "@/patient-profile/entities/patient-profile.entity";
import { PsychologistProfile } from "@/psychologist-profile/entities/psychologist-profile.entity";
import { User } from "@/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export const SESSION_STATUS_ENUM = {
    WAITING_CONFIRMATION: 'WAITING_CONFIRMATION',
    CONFIRMED: 'CONFIRMED',
    CANCELED: 'CANCELED',
    COMPLETED: 'COMPLETED',
    RESCHEDULED: 'RESCHEDULED',
} as const;

export type SessionStatus = typeof SESSION_STATUS_ENUM[keyof typeof SESSION_STATUS_ENUM];

@Entity('sessions')
export class Session extends AuditableEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => PatientProfile)
    patient: PatientProfile;

    @ManyToOne(() => PsychologistProfile)
    psychologist: PsychologistProfile;

    @ManyToOne(() => Clinic)
    clinic: Clinic;

    @ManyToOne(() => User)
    createdBy: User;

    @Column({
        type: 'enum',
        enum: SESSION_STATUS_ENUM,
        default: SESSION_STATUS_ENUM.WAITING_CONFIRMATION,
    })
    status: SessionStatus;

    @Column({ type: 'timestamptz' })
    date: Date;

    @Column()
    duration: number; // in minutes

    @Column({ type: 'integer', default: 0 })
    price: number; // in cents
}