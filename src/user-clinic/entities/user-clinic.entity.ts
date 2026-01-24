import { Clinic } from "@/clinics/entity/clinic.entity";
import { AuditableEntity } from "@/common/entities/auditable.entity";
import { User } from "@/users/entities/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('user_clinics')
@Unique(['user', 'clinic'])
export class UserClinic extends AuditableEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.userClinics, {
        cascade: true,
    })
    user: User;

    @ManyToOne(() => Clinic, (clinic) => clinic.userClinics, {
        cascade: true,
    })
    clinic: Clinic;
}
