import { User } from "@/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Session, type SessionStatus, SESSION_STATUS_ENUM } from "./session.entity";

@Entity('session_histories')
export class SessionHistory {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Session)
    session: Session;

    @Column({
        type: 'enum',
        enum: SESSION_STATUS_ENUM,
        nullable: true
    })
    previousStatus: SessionStatus;

    @Column({
        type: 'enum',
        enum: SESSION_STATUS_ENUM
    })
    newStatus: SessionStatus;

    @ManyToOne(() => User)
    changedBy: User;

    @Column({ nullable: true })
    reason: string;

    @CreateDateColumn({ name: 'changed_at', type: 'timestamptz' })
    changedAt: Date;
}
