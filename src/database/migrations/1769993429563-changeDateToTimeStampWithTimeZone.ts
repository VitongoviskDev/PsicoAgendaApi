import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeDateToTimeStampWithTimeZone1769993429563 implements MigrationInterface {
    name = 'ChangeDateToTimeStampWithTimeZone1769993429563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // verification_codes
        await queryRunner.query(`ALTER TABLE "verification_codes" ALTER COLUMN "created_at" TYPE TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "verification_codes" ALTER COLUMN "created_at" SET DEFAULT now()`);

        await queryRunner.query(`ALTER TABLE "verification_codes" ALTER COLUMN "updated_at" TYPE TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "verification_codes" ALTER COLUMN "updated_at" SET DEFAULT now()`);

        await queryRunner.query(`ALTER TABLE "verification_codes" ALTER COLUMN "deleted_at" TYPE TIMESTAMP WITH TIME ZONE`);

        await queryRunner.query(`ALTER TABLE "verification_codes" ALTER COLUMN "expires_at" TYPE TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "verification_codes" ALTER COLUMN "verified_at" TYPE TIMESTAMP WITH TIME ZONE`);

        // psychologist_profiles
        await queryRunner.query(`ALTER TABLE "psychologist_profiles" ALTER COLUMN "created_at" TYPE TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "psychologist_profiles" ALTER COLUMN "created_at" SET DEFAULT now()`);

        await queryRunner.query(`ALTER TABLE "psychologist_profiles" ALTER COLUMN "updated_at" TYPE TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "psychologist_profiles" ALTER COLUMN "updated_at" SET DEFAULT now()`);

        await queryRunner.query(`ALTER TABLE "psychologist_profiles" ALTER COLUMN "deleted_at" TYPE TIMESTAMP WITH TIME ZONE`);

        // clinics
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "created_at" TYPE TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "created_at" SET DEFAULT now()`);

        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "updated_at" TYPE TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "updated_at" SET DEFAULT now()`);

        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "deleted_at" TYPE TIMESTAMP WITH TIME ZONE`);

        // Clinic status enum change (preserving original logic)
        await queryRunner.query(`ALTER TYPE "public"."clinics_status_enum" RENAME TO "clinics_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."clinics_status_enum" AS ENUM('PENDING_SETUP', 'ACTIVE')`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" TYPE "public"."clinics_status_enum" USING "status"::"text"::"public"."clinics_status_enum"`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" SET DEFAULT 'PENDING_SETUP'`);
        await queryRunner.query(`DROP TYPE "public"."clinics_status_enum_old"`);

        // patient_profiles
        await queryRunner.query(`ALTER TABLE "patient_profiles" ALTER COLUMN "created_at" TYPE TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "patient_profiles" ALTER COLUMN "created_at" SET DEFAULT now()`);

        await queryRunner.query(`ALTER TABLE "patient_profiles" ALTER COLUMN "updated_at" TYPE TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "patient_profiles" ALTER COLUMN "updated_at" SET DEFAULT now()`);

        await queryRunner.query(`ALTER TABLE "patient_profiles" ALTER COLUMN "deleted_at" TYPE TIMESTAMP WITH TIME ZONE`);

        // staff_profiles
        await queryRunner.query(`ALTER TABLE "staff_profiles" ALTER COLUMN "created_at" TYPE TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "staff_profiles" ALTER COLUMN "created_at" SET DEFAULT now()`);

        await queryRunner.query(`ALTER TABLE "staff_profiles" ALTER COLUMN "updated_at" TYPE TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "staff_profiles" ALTER COLUMN "updated_at" SET DEFAULT now()`);

        await queryRunner.query(`ALTER TABLE "staff_profiles" ALTER COLUMN "deleted_at" TYPE TIMESTAMP WITH TIME ZONE`);

        // user_clinics
        await queryRunner.query(`ALTER TABLE "user_clinics" ALTER COLUMN "created_at" TYPE TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "user_clinics" ALTER COLUMN "created_at" SET DEFAULT now()`);

        await queryRunner.query(`ALTER TABLE "user_clinics" ALTER COLUMN "updated_at" TYPE TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "user_clinics" ALTER COLUMN "updated_at" SET DEFAULT now()`);

        await queryRunner.query(`ALTER TABLE "user_clinics" ALTER COLUMN "deleted_at" TYPE TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Revert user_clinics
        await queryRunner.query(`ALTER TABLE "user_clinics" ALTER COLUMN "deleted_at" TYPE TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user_clinics" ALTER COLUMN "updated_at" TYPE TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user_clinics" ALTER COLUMN "created_at" TYPE TIMESTAMP`);

        // Revert staff_profiles
        await queryRunner.query(`ALTER TABLE "staff_profiles" ALTER COLUMN "deleted_at" TYPE TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "staff_profiles" ALTER COLUMN "updated_at" TYPE TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "staff_profiles" ALTER COLUMN "created_at" TYPE TIMESTAMP`);

        // Revert patient_profiles
        await queryRunner.query(`ALTER TABLE "patient_profiles" ALTER COLUMN "deleted_at" TYPE TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "patient_profiles" ALTER COLUMN "updated_at" TYPE TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "patient_profiles" ALTER COLUMN "created_at" TYPE TIMESTAMP`);

        // Revert clinic status
        await queryRunner.query(`CREATE TYPE "public"."clinics_status_enum_old" AS ENUM('PENDING_SETUP', 'ACTIVE')`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" TYPE "public"."clinics_status_enum_old" USING "status"::"text"::"public"."clinics_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" SET DEFAULT 'PENDING_SETUP'`);
        await queryRunner.query(`DROP TYPE "public"."clinics_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."clinics_status_enum_old" RENAME TO "clinics_status_enum"`);

        // Revert clinics
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "deleted_at" TYPE TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "updated_at" TYPE TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "created_at" TYPE TIMESTAMP`);

        // Revert psychologist_profiles
        await queryRunner.query(`ALTER TABLE "psychologist_profiles" ALTER COLUMN "deleted_at" TYPE TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "psychologist_profiles" ALTER COLUMN "updated_at" TYPE TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "psychologist_profiles" ALTER COLUMN "created_at" TYPE TIMESTAMP`);

        // Revert verification_codes
        await queryRunner.query(`ALTER TABLE "verification_codes" ALTER COLUMN "verified_at" TYPE TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "verification_codes" ALTER COLUMN "expires_at" TYPE TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "verification_codes" ALTER COLUMN "deleted_at" TYPE TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "verification_codes" ALTER COLUMN "updated_at" TYPE TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "verification_codes" ALTER COLUMN "created_at" TYPE TIMESTAMP`);
    }

}
