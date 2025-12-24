import { Clinic } from "@/clinics/entity/clinic.entity";
import { User } from "@/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

// clinic-psychologists/entities/clinic-psychologist.entity.ts
@Entity('clinic_psychologists')
@Unique(['user', 'clinic'])
export class ClinicPsychologist {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Clinic, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'clinicId' })
    clinic: Clinic;

    @Column({ default: true })
    active: boolean;
}
