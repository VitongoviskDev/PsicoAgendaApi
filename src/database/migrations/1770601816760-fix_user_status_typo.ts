import { MigrationInterface, QueryRunner } from "typeorm";

export class FixUserStatusTypo1770601816760 implements MigrationInterface {
    name = 'FixUserStatusTypo1770601816760'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."clinics_status_enum" RENAME TO "clinics_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."clinics_status_enum" AS ENUM('PENDING_SETUP', 'ACTIVE')`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" TYPE "public"."clinics_status_enum" USING "status"::"text"::"public"."clinics_status_enum"`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" SET DEFAULT 'PENDING_SETUP'`);
        await queryRunner.query(`DROP TYPE "public"."clinics_status_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."user_status_enum" RENAME TO "user_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('PENDING_REGISTRATION', 'PENDING_EMAIL_VERIFICATION', 'ACTIVE', 'DISABLED', 'BLOCKED')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" TYPE "public"."user_status_enum" USING (CASE WHEN "status"::text = 'PENDING_REGISTARTION' THEN 'PENDING_REGISTRATION' ELSE "status"::text END)::"public"."user_status_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'PENDING_EMAIL_VERIFICATION'`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum_old" AS ENUM('PENDING_REGISTARTION', 'PENDING_EMAIL_VERIFICATION', 'ACTIVE', 'DISABLED', 'BLOCKED')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" TYPE "public"."user_status_enum_old" USING (CASE WHEN "status"::text = 'PENDING_REGISTRATION' THEN 'PENDING_REGISTARTION' ELSE "status"::text END)::"public"."user_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'PENDING_EMAIL_VERIFICATION'`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."user_status_enum_old" RENAME TO "user_status_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."clinics_status_enum_old" AS ENUM('PENDING_SETUP', 'ACTIVE')`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" TYPE "public"."clinics_status_enum_old" USING "status"::"text"::"public"."clinics_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" SET DEFAULT 'PENDING_SETUP'`);
        await queryRunner.query(`DROP TYPE "public"."clinics_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."clinics_status_enum_old" RENAME TO "clinics_status_enum"`);
    }

}
