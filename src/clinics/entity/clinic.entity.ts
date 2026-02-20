import { AuditableEntity } from '@/common/entities/auditable.entity';
import { UserClinic } from '@/user-clinic/entities/user-clinic.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export const CLINIC_STATUS_ENUM = {
    DRAFT: 'DRAFT',
    ACTIVE: 'ACTIVE',
    SUSPENDED: 'SUSPENDED',
} as const;
export type ClinicStatus = typeof CLINIC_STATUS_ENUM[keyof typeof CLINIC_STATUS_ENUM];

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
    crp: string;

    @Column({ nullable: true })
    openedAt: Date;

    @Column({
        type: 'enum',
        enum: CLINIC_STATUS_ENUM,
        enumName: 'clinics_status_enum',
        default: CLINIC_STATUS_ENUM.DRAFT,
    })
    status: ClinicStatus;

    @OneToMany(() => UserClinic, (userClinic) => userClinic.clinic)
    userClinics: UserClinic[];
}
