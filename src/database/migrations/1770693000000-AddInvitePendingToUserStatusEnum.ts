import { MigrationInterface, QueryRunner } from "typeorm";

export class AddInvitePendingToUserStatusEnum1770693000000 implements MigrationInterface {
    name = 'AddInvitePendingToUserStatusEnum1770693000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add value to the existing enum
        await queryRunner.query(`ALTER TYPE "user_status_enum" ADD VALUE 'INVITE_PENDING'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // PostgreSQL doesn't support easy removal of enum values. 
        // This is usually handled by recreating the type, but for a simple "down" it's often skipped or warned.
        console.warn('Down migration for AddInvitePendingToUserStatusEnum1770693000000 is not supported directly in Postgres.');
    }

}
