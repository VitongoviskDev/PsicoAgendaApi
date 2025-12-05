import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ClinicUserRole } from '../../clinic-user-role/entities/clinic-user-role.entity';

export enum UserStatus {
    PRE_REGISTRATION = 'pre_registration',
    ACTIVE = 'active',
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    phone?: string;

    @Column({ nullable: true, unique: true })
    cpf?: string;

    @Column({ nullable: true, unique: true })
    crp?: string;


    @Column({
        type: 'enum',
        enum: UserStatus,
        default: UserStatus.PRE_REGISTRATION,
    })
    status: UserStatus;

    @OneToMany(() => ClinicUserRole, (cur) => cur.user)
    clinicRoles: ClinicUserRole[];
}
