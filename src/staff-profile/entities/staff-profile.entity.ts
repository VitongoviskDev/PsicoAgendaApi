import { AuditableEntity } from "@/common/entities/auditable.entity";
import { PROFILE_STATUS_ENUM, type ProfileStatus } from "@/common/enums/profile-status.enum";
import { UserClinic } from "@/user-clinic/entities/user-clinic.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

export const STAFF_ROLE_ENUM = {
    OWNER: 'OWNER',
    ADMIN: 'ADMIN',
    EMPLOYEE: 'EMPLOYEE',
} as const

type StaffRole = typeof STAFF_ROLE_ENUM[keyof typeof STAFF_ROLE_ENUM];

@Entity('staff_profiles')
export class StaffProfile extends AuditableEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: STAFF_ROLE_ENUM,
        default: STAFF_ROLE_ENUM.EMPLOYEE,
    })
    role: StaffRole;

    @Column({
        type: 'enum',
        enum: PROFILE_STATUS_ENUM,
        default: PROFILE_STATUS_ENUM.PENDING_VERIFICATION,
    })
    status: ProfileStatus;

    @OneToOne(() => UserClinic, (userClinic) => userClinic.staffProfile)
    userClinic: UserClinic;
}
