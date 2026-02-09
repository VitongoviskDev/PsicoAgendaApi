import { AuditableEntity } from "@/common/entities/auditable.entity";
import { PROFILE_STATUS_ENUM, type ProfileStatus } from "@/common/enums/profile-status.enum";
import { User } from "@/users/entities/user.entity";
import { ClinicResponsibleTechnician } from "@/clinic-responsible-technician/entities/clinic-responsible-technician.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('psychologist_profiles')
@Unique(['user'])
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

    @OneToMany(() => ClinicResponsibleTechnician, (rt) => rt.psychologistProfile)
    responsibleTechnicians: ClinicResponsibleTechnician[];
}
