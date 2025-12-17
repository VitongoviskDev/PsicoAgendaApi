import { Clinic } from "src/clinics/entity/clinic.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

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

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Clinic, { onDelete: 'CASCADE' })
    clinic: Clinic;

    @Column({
        type: 'enum',
        enum: StaffRole,
    })
    role: StaffRole;
}
