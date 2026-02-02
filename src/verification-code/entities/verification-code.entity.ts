import { AuditableEntity } from "@/common/entities/auditable.entity"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

export const VERIFICATION_CODE_TYPE_ENUM = {
    EMAIL: 'EMAIL',
} as const;
export type VerificationCodeType = typeof VERIFICATION_CODE_TYPE_ENUM[keyof typeof VERIFICATION_CODE_TYPE_ENUM];

export const VERIFICATION_CODE_STATUS = {
    ACTIVE: 'ACTIVE',
    USED: 'USED',
    EXPIRED: 'EXPIRED',
    CANCELLED: 'CANCELLED',
} as const;
type VerificationCodeStatus = typeof VERIFICATION_CODE_STATUS[keyof typeof VERIFICATION_CODE_STATUS];


@Entity('verification_codes')
export class VerificationCode extends AuditableEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    userId: string

    @Column()
    codeHash: string

    @Column({ type: 'timestamptz' })
    expiresAt: Date

    @Column({ nullable: true, type: 'timestamptz' })
    verified_at?: Date

    @Column({
        type: 'enum',
        enum: VERIFICATION_CODE_TYPE_ENUM,
        enumName: 'verification_code_type_enum',
        default: VERIFICATION_CODE_TYPE_ENUM.EMAIL,
    })
    type: VerificationCodeType;

    @Column({
        type: 'enum',
        enum: VERIFICATION_CODE_STATUS,
        enumName: 'verification_code_status_enum',
        default: VERIFICATION_CODE_STATUS.ACTIVE,
    })
    status: VerificationCodeStatus;

    isExpired(): boolean {
        return this.expiresAt.getTime() < Date.now()
    }

    canBeUsed(): boolean {
        return this.status === 'ACTIVE' && !this.isExpired()
    }
}
