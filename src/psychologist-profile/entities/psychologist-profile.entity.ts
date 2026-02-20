import { AuditableEntity } from "@/common/entities/auditable.entity";
import { PROFILE_STATUS_ENUM, type ProfileStatus } from "@/common/enums/profile-status.enum";
import { UserClinic } from "@/user-clinic/entities/user-clinic.entity";
import { User } from "@/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('psychologist_profiles')
export class PsychologistProfile extends AuditableEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => User, (user) => user.psychologistProfile)
    @JoinColumn()
    user: User;

    @Column({
        type: 'enum',
        enum: PROFILE_STATUS_ENUM,
        default: PROFILE_STATUS_ENUM.PENDING_VERIFICATION,
    })
    status: ProfileStatus;

    @Column({ unique: true })
    crp: string;

    @OneToMany(() => UserClinic, (userClinic) => userClinic.psychologistProfile)
    userClinics: UserClinic[];
}
