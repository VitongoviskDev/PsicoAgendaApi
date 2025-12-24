
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ClinicWorkingHours } from '../../clinic-working-hours/entity/clinic-working-hours.entity';

export enum ClinicStatus {
    PENDING_SETUP = 'PENDING_SETUP',
    ACTIVE = 'ACTIVE',
}

// users/entities/user.entity.ts
@Entity('clinics')
export class Clinic {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    nickname: string; // 👈 CAMPO DE TESTE

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    cnpj: string;

    @Column({ nullable: true })
    openedAt: Date;

    @Column({
        type: 'enum',
        enum: ClinicStatus,
        default: ClinicStatus.PENDING_SETUP,
    })
    status: ClinicStatus;

    @OneToMany(
        () => ClinicWorkingHours,
        workingHours => workingHours.clinic,
        {
            cascade: true,
            eager: true,
        }
    )
    workingHours: ClinicWorkingHours[];
}