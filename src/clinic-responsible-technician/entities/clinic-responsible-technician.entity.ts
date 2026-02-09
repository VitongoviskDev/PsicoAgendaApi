import { Clinic } from "@/clinics/entity/clinic.entity";
import { AuditableEntity } from "@/common/entities/auditable.entity";
import { PsychologistProfile } from "@/psychologist-profile/entities/psychologist-profile.entity";
import { User } from "@/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export const CLINIC_RT_STATUS_ENUM = {
    PENDING: 'PENDING',
    ACTIVE: 'ACTIVE',
    ENDED: 'ENDED',
    REVOKED: 'REVOKED',
} as const;

export type ClinicRTStatus = typeof CLINIC_RT_STATUS_ENUM[keyof typeof CLINIC_RT_STATUS_ENUM];

@Entity('clinic_responsible_technicians')
export class ClinicResponsibleTechnician extends AuditableEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Clinic, (clinic) => clinic.responsibleTechnicians)
    @JoinColumn({ name: 'clinic_id' })
    clinic: Clinic;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => PsychologistProfile, (profile) => profile.responsibleTechnicians)
    @JoinColumn({ name: 'psychologist_profile_id' })
    psychologistProfile: PsychologistProfile;

    @Column({ type: 'timestamptz' })
    startDate: Date;

    @Column({ type: 'timestamptz', nullable: true })
    endDate: Date;

    @Column({
        type: 'enum',
        enum: CLINIC_RT_STATUS_ENUM,
        enumName: 'clinic_rt_status_enum',
        default: CLINIC_RT_STATUS_ENUM.PENDING,
    })
    status: ClinicRTStatus;
}
