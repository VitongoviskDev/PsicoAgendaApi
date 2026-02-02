import {
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn
} from 'typeorm';


export abstract class AuditableEntity {
    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
    deletedAt?: Date;
}
