import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

    @Column({
        type: 'enum',
        enum: ClinicStatus,
        default: ClinicStatus.PENDING_SETUP,
    })
    status: ClinicStatus;
}