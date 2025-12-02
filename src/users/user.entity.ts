import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

export enum UserRole {
    PATIENT = 'patient',
    PSYCHOLOGIST = 'psychologist',
    ADMIN = 'admin',
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

    @Column({
        type: 'enum',
        enum: UserRole,
    })
    role: UserRole;

    @Column({ nullable: true })
    clinicId: string; // multitenant - opcional
}
