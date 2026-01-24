import { AuditableEntity } from '@/common/entities/auditable.entity';
import { UserClinic } from '@/user-clinic/entities/user-clinic.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum ClinicStatus {
    PENDING_SETUP = 'PENDING_SETUP',
    ACTIVE = 'ACTIVE',
}

// users/entities/user.entity.ts
@Entity('clinics')
export class Clinic extends AuditableEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    cnpj: string;

    @Column({ nullable: true })
    openedAt: Date;

    @Column({
        type: 'enum',
        enum: ClinicStatus,
        enumName: 'clinics_status_enum',
        default: ClinicStatus.PENDING_SETUP,
    })
    status: ClinicStatus;

    @OneToMany(() => UserClinic, (userClinic) => userClinic.user)
    userClinics: UserClinic[]; s
}