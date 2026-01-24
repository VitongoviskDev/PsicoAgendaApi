import { UserClinic } from "@/user-clinic/entities/user-clinic.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum UserStatus {
    PENDING_REGISTRATION = 'PENDING_REGISTRATION',
    ACTIVE = 'ACTIVE',
    DISABLED = 'DISABLED',
    BLOCKED = 'BLOCKED',
    INVITED = 'INVITED',
}

// users/entities/user.entity.ts
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

    @Column({ nullable: true })
    birthDate?: Date;

    @Column({ nullable: true, unique: true })
    cpf?: string;

    @ManyToOne(() => UserClinic, { nullable: true })
    currentUserClinic?: UserClinic;

    @Column({
        type: 'enum',
        enum: UserStatus,
        enumName: 'user_status_enum',
        default: UserStatus.PENDING_REGISTRATION,
    })
    status: UserStatus;

    @OneToMany(() => UserClinic, (userClinic) => userClinic.user)
    userClinics: UserClinic[];
}