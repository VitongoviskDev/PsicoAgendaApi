import { PsychologistProfile } from "@/psychologist-profile/entities/psychologist-profile.entity";
import { UserClinic } from "@/user-clinic/entities/user-clinic.entity";
import { Exclude } from "class-transformer";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export const USER_STATUS_ENUM = {
    PENDING_REGISTRATION: 'PENDING_REGISTRATION',
    PENDING_EMAIL_VERIFICATION: 'PENDING_EMAIL_VERIFICATION',
    INVITE_PENDING: 'INVITE_PENDING',
    EMAIL_VERIFIED: 'EMAIL_VERIFIED',
    ACTIVE: 'ACTIVE',
    DISABLED: 'DISABLED',
    BLOCKED: 'BLOCKED',
} as const;

type UserStatus = typeof USER_STATUS_ENUM[keyof typeof USER_STATUS_ENUM];

// users/entities/user.entity.ts
@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Exclude()
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
        enum: USER_STATUS_ENUM,
        enumName: 'user_status_enum',
        default: USER_STATUS_ENUM.PENDING_EMAIL_VERIFICATION,
    })
    status: UserStatus;

    @OneToMany(() => UserClinic, (userClinic) => userClinic.user)
    userClinics: UserClinic[];

    @OneToOne(() => PsychologistProfile, (psychologistProfile) => psychologistProfile.user, {
        cascade: true,
        nullable: true,
    })
    psychologistProfile: PsychologistProfile;
}