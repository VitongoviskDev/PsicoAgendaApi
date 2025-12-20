import { User } from "../users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

// psychologist-profile/entities/psychologist-profile.entity.ts
@Entity('psychologist_profiles')
export class PsychologistProfile {
    @PrimaryColumn('uuid')
    userId: string;

    @OneToOne(
        () => User,
        u => u.psychologistProfile,
        { onDelete: 'CASCADE' }
    )
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({ unique: true })
    crp: string;

    @Column({ nullable: true })
    specialty?: string;

    @Column({ default: true })
    active: boolean;
}
