import { MigrationInterface, QueryRunner } from "typeorm";

export class StandardizeClinicProfiles1771280570332 implements MigrationInterface {
    name = 'StandardizeClinicProfiles1771280570332'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient_profiles" DROP CONSTRAINT "FK_6051f74fbca4239d95978ff5cbe"`);
        await queryRunner.query(`ALTER TABLE "staff_profiles" DROP CONSTRAINT "FK_298a3bc5fe15d8937ca5b413b71"`);
        await queryRunner.query(`ALTER TABLE "patient_profiles" DROP CONSTRAINT "REL_6051f74fbca4239d95978ff5cb"`);
        await queryRunner.query(`ALTER TABLE "patient_profiles" DROP COLUMN "user_clinics_id"`);
        await queryRunner.query(`ALTER TABLE "staff_profiles" DROP CONSTRAINT "REL_87286026d44178d35d83ecd6e9"`);
        await queryRunner.query(`ALTER TABLE "staff_profiles" DROP COLUMN "user_clinic_id"`);
        await queryRunner.query(`ALTER TABLE "user_clinics" ADD "patient_profile_id" uuid`);
        await queryRunner.query(`ALTER TABLE "user_clinics" ADD CONSTRAINT "UQ_66c9da88e843c4d5b8aeaa6d016" UNIQUE ("patient_profile_id")`);
        await queryRunner.query(`ALTER TABLE "user_clinics" ADD "staff_profile_id" uuid`);
        await queryRunner.query(`ALTER TABLE "user_clinics" ADD CONSTRAINT "UQ_cb802983604f38dfedb706d8a41" UNIQUE ("staff_profile_id")`);
        await queryRunner.query(`ALTER TYPE "public"."clinics_status_enum" RENAME TO "clinics_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."clinics_status_enum" AS ENUM('DRAFT', 'ACTIVE', 'SUSPENDED')`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" TYPE "public"."clinics_status_enum" USING "status"::"text"::"public"."clinics_status_enum"`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" SET DEFAULT 'DRAFT'`);
        await queryRunner.query(`DROP TYPE "public"."clinics_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "user_clinics" ADD CONSTRAINT "FK_66c9da88e843c4d5b8aeaa6d016" FOREIGN KEY ("patient_profile_id") REFERENCES "patient_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_clinics" ADD CONSTRAINT "FK_cb802983604f38dfedb706d8a41" FOREIGN KEY ("staff_profile_id") REFERENCES "staff_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_clinics" DROP CONSTRAINT "FK_cb802983604f38dfedb706d8a41"`);
        await queryRunner.query(`ALTER TABLE "user_clinics" DROP CONSTRAINT "FK_66c9da88e843c4d5b8aeaa6d016"`);
        await queryRunner.query(`CREATE TYPE "public"."clinics_status_enum_old" AS ENUM('DRAFT', 'ACTIVE', 'SUSPENDED')`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" TYPE "public"."clinics_status_enum_old" USING "status"::"text"::"public"."clinics_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" SET DEFAULT 'DRAFT'`);
        await queryRunner.query(`DROP TYPE "public"."clinics_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."clinics_status_enum_old" RENAME TO "clinics_status_enum"`);
        await queryRunner.query(`ALTER TABLE "user_clinics" DROP CONSTRAINT "UQ_cb802983604f38dfedb706d8a41"`);
        await queryRunner.query(`ALTER TABLE "user_clinics" DROP COLUMN "staff_profile_id"`);
        await queryRunner.query(`ALTER TABLE "user_clinics" DROP CONSTRAINT "UQ_66c9da88e843c4d5b8aeaa6d016"`);
        await queryRunner.query(`ALTER TABLE "user_clinics" DROP COLUMN "patient_profile_id"`);
        await queryRunner.query(`ALTER TABLE "staff_profiles" ADD "user_clinic_id" integer`);
        await queryRunner.query(`ALTER TABLE "staff_profiles" ADD CONSTRAINT "REL_87286026d44178d35d83ecd6e9" UNIQUE ("user_clinic_id")`);
        await queryRunner.query(`ALTER TABLE "patient_profiles" ADD "user_clinics_id" integer`);
        await queryRunner.query(`ALTER TABLE "patient_profiles" ADD CONSTRAINT "REL_6051f74fbca4239d95978ff5cb" UNIQUE ("user_clinics_id")`);
        await queryRunner.query(`ALTER TABLE "staff_profiles" ADD CONSTRAINT "FK_298a3bc5fe15d8937ca5b413b71" FOREIGN KEY ("user_clinic_id") REFERENCES "user_clinics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient_profiles" ADD CONSTRAINT "FK_6051f74fbca4239d95978ff5cbe" FOREIGN KEY ("user_clinics_id") REFERENCES "user_clinics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
