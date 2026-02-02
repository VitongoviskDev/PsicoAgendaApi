import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangedUsedToVerifiedAtAtVerificationCodes1769649624105 implements MigrationInterface {
    name = 'ChangedUsedToVerifiedAtAtVerificationCodes1769649624105'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "verification_codes" RENAME COLUMN "used" TO "verified_at"`);
        await queryRunner.query(`ALTER TABLE "verification_codes" DROP COLUMN "verified_at"`);
        await queryRunner.query(`ALTER TABLE "verification_codes" ADD "verified_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TYPE "public"."clinics_status_enum" RENAME TO "clinics_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."clinics_status_enum" AS ENUM('PENDING_SETUP', 'ACTIVE')`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" TYPE "public"."clinics_status_enum" USING "status"::"text"::"public"."clinics_status_enum"`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" SET DEFAULT 'PENDING_SETUP'`);
        await queryRunner.query(`DROP TYPE "public"."clinics_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."clinics_status_enum_old" AS ENUM('PENDING_SETUP', 'ACTIVE')`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" TYPE "public"."clinics_status_enum_old" USING "status"::"text"::"public"."clinics_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" SET DEFAULT 'PENDING_SETUP'`);
        await queryRunner.query(`DROP TYPE "public"."clinics_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."clinics_status_enum_old" RENAME TO "clinics_status_enum"`);
        await queryRunner.query(`ALTER TABLE "verification_codes" DROP COLUMN "verified_at"`);
        await queryRunner.query(`ALTER TABLE "verification_codes" ADD "verified_at" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "verification_codes" RENAME COLUMN "verified_at" TO "used"`);
    }

}
