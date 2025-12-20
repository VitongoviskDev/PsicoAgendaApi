import { Clinic } from "../../clinics/entity/clinic.entity";
import { User } from "../../users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

// clinic-staff/entities/clinic-staff.entity.ts
export enum StaffRole {
    OWNER = 'OWNER',
    ADMIN = 'ADMIN',
    EMPLOYEE = 'EMPLOYEE',
}

@Entity('clinic_staff')
@Unique(['user', 'clinic'])
export class ClinicStaff {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Clinic, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'clinicId' })
    clinic: Clinic;

    @Column({
        type: 'enum',
        enum: StaffRole,
    })
    role: StaffRole;
}
