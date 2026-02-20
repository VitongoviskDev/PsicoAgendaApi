import { AuditableEntity } from "@/common/entities/auditable.entity";
import { PROFILE_STATUS_ENUM, type ProfileStatus } from "@/common/enums/profile-status.enum";
import { UserClinic } from "@/user-clinic/entities/user-clinic.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('patient_profiles')
export class PatientProfile extends AuditableEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: PROFILE_STATUS_ENUM,
        default: PROFILE_STATUS_ENUM.PENDING_VERIFICATION,
    })
    status: ProfileStatus;

    @OneToOne(() => UserClinic, (userClinic) => userClinic.patientProfile)
    userClinic: UserClinic;

    @Column({ nullable: true })
    code: string; // Internal clinic code for the patient
}
