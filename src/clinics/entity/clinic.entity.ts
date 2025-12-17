import { Column, PrimaryGeneratedColumn } from 'typeorm';

export enum ClinicStatus {
    PENDING_SETUP = 'pending_setup',
    ACTIVE = 'active',
}

// users/entities/user.entity.ts
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