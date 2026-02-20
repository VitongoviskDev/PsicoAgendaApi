import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveClinicRTAndAddClinicCRP1739660000000 implements MigrationInterface {
    name = 'RemoveClinicRTAndAddClinicCRP1739660000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Remove ClinicResponsibleTechnician table and its enum
        await queryRunner.query(`DROP TABLE "clinic_responsible_technicians"`);
        await queryRunner.query(`DROP TYPE "public"."clinic_rt_status_enum"`);

        // Add crp column to clinics
        await queryRunner.query(`ALTER TABLE "clinics" ADD "crp" character varying`);

        // Update clinics_status_enum to remove PENDING_RT
        await queryRunner.query(`ALTER TYPE "public"."clinics_status_enum" RENAME TO "clinics_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."clinics_status_enum" AS ENUM('DRAFT', 'ACTIVE', 'SUSPENDED')`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" DROP DEFAULT`);

        // Map old status to DRAFT before changing type
        await queryRunner.query(`UPDATE "clinics" SET "status" = 'DRAFT' WHERE "status"::text = 'PENDING_RT'`);

        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" TYPE "public"."clinics_status_enum" USING "status"::"text"::"public"."clinics_status_enum"`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" SET DEFAULT 'DRAFT'`);
        await queryRunner.query(`DROP TYPE "public"."clinics_status_enum_old"`);

        // Update user_status_enum to add EMAIL_VERIFIED and fix PENDING_REGISTARTION typo
        await queryRunner.query(`ALTER TYPE "public"."user_status_enum" RENAME TO "user_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('PENDING_REGISTRATION', 'PENDING_EMAIL_VERIFICATION', 'EMAIL_VERIFIED', 'ACTIVE', 'DISABLED', 'BLOCKED')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" DROP DEFAULT`);

        // Map old typo to correct spelling before changing type
        await queryRunner.query(`UPDATE "users" SET "status" = 'PENDING_REGISTRATION' WHERE "status"::text = 'PENDING_REGISTARTION'`);

        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" TYPE "public"."user_status_enum" USING "status"::"text"::"public"."user_status_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'PENDING_EMAIL_VERIFICATION'`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Re-create user_status_enum without EMAIL_VERIFIED
        await queryRunner.query(`ALTER TYPE "public"."user_status_enum" RENAME TO "user_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('PENDING_REGISTRATION', 'PENDING_EMAIL_VERIFICATION', 'ACTIVE', 'DISABLED', 'BLOCKED')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" TYPE "public"."user_status_enum" USING "status"::"text"::"public"."user_status_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'PENDING_EMAIL_VERIFICATION'`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum_old"`);

        // Re-create clinics_status_enum with PENDING_RT
        await queryRunner.query(`ALTER TYPE "public"."clinics_status_enum" RENAME TO "clinics_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."clinics_status_enum" AS ENUM('DRAFT', 'PENDING_RT', 'ACTIVE', 'SUSPENDED')`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" TYPE "public"."clinics_status_enum" USING "status"::"text"::"public"."clinics_status_enum"`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" SET DEFAULT 'DRAFT'`);
        await queryRunner.query(`DROP TYPE "public"."clinics_status_enum_old"`);

        // Remove crp column
        await queryRunner.query(`ALTER TABLE "clinics" DROP COLUMN "crp"`);

        // Re-create clinic_responsible_technicians table and its enum
        await queryRunner.query(`CREATE TYPE "public"."clinic_rt_status_enum" AS ENUM('PENDING', 'ACTIVE', 'ENDED', 'REVOKED')`);
        await queryRunner.query(`CREATE TABLE "clinic_responsible_technicians" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "start_date" TIMESTAMP WITH TIME ZONE NOT NULL, "end_date" TIMESTAMP WITH TIME ZONE, "status" "public"."clinic_rt_status_enum" NOT NULL DEFAULT 'PENDING', "clinic_id" uuid, "user_id" uuid, "psychologist_profile_id" uuid, CONSTRAINT "PK_238a089135b0dd4c83a544ce7bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "clinic_responsible_technicians" ADD CONSTRAINT "FK_7826f32569c0c2d562c27ca374b" FOREIGN KEY ("clinic_id") REFERENCES "clinics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clinic_responsible_technicians" ADD CONSTRAINT "FK_779c4a9a5f3e692148b659e4a82" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clinic_responsible_technicians" ADD CONSTRAINT "FK_1a571834b0ffc52aa12422a2396" FOREIGN KEY ("psychologist_profile_id") REFERENCES "psychologist_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
