import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { ClinicUserRole } from '../../clinic-user-role/entities/clinic-user-role.entity';
import { User } from '../../users/entities/user.entity';

export enum ClinicStatus {
    PENDING_SETUP = 'pending_setup',
    ACTIVE = 'active',
}

@Entity('clinics')
export class Clinic {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    cnpj?: string;

    @Column({ nullable: true })
    address?: string;

    @Column({ nullable: true })
    phone?: string;

    @Column({
        type: 'enum',
        enum: ClinicStatus,
        default: ClinicStatus.PENDING_SETUP,
    })
    status: ClinicStatus;

    @ManyToOne(() => User, { eager: true })
    owner: User;

    @OneToMany(() => ClinicUserRole, (cur) => cur.clinic)
    clinicRoles: ClinicUserRole[];
}
