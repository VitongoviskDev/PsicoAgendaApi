import { User } from "../users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

@Entity('patient_profiles')
export class PatientProfile {

    @PrimaryColumn('uuid')
    userId: string;

    @OneToOne(
        () => User,
        user => user.patientProfile,
        { onDelete: 'CASCADE' }
    )
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({ nullable: true })
    notes?: string;
}
