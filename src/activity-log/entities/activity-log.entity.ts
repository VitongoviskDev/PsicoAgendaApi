import { Clinic } from "@/clinics/entity/clinic.entity";
import { User } from "@/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('activity_logs')
export class ActivityLog {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User)
    performedBy: User;

    @ManyToOne(() => Clinic)
    clinic: Clinic;

    @Column()
    targetEntity: string; // e.g., 'SESSION', 'PATIENT_PROFILE'

    @Column()
    targetId: string; // UUID of the record

    @Column()
    action: string; // e.g., 'CREATED', 'UPDATED', 'STATUS_CHANGED'

    @Column({ type: 'jsonb', nullable: true })
    metadata: any;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;
}
