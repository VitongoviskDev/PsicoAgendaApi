import { User } from '../users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity('staff_profiles')
export class StaffProfile {

    @PrimaryColumn('uuid')
    userId: string;

    @OneToOne(
        () => User,
        user => user.staffProfile,
        { onDelete: 'CASCADE' }
    )
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({ default: true })
    active: boolean;

    // futuros campos:
    // @Column({ nullable: true })
    // internalCode?: string;

    // @Column({ nullable: true })
    // department?: string;
}
