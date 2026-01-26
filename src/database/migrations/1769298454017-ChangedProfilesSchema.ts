import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangedProfilesSchema1769298454017 implements MigrationInterface {
    name = 'ChangedProfilesSchema1769298454017'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."psychologist_profiles_status_enum" AS ENUM('PENDING_VERIFICATION', 'ACTIVE', 'DISABLED', 'BLOCKED')`);
        await queryRunner.query(`CREATE TABLE "psychologist_profiles" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."psychologist_profiles_status_enum" NOT NULL DEFAULT 'PENDING_VERIFICATION', "crp" character varying NOT NULL, "user_id" uuid, CONSTRAINT "UQ_f512a150dbeb06ac5caaa8904ef" UNIQUE ("crp"), CONSTRAINT "UQ_5f3a9ede716eb4487f8ba39c235" UNIQUE ("user_id"), CONSTRAINT "REL_5f3a9ede716eb4487f8ba39c23" UNIQUE ("user_id"), CONSTRAINT "PK_04a8da0fcf6d3a86c273d8994c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."patient_profiles_status_enum" AS ENUM('PENDING_VERIFICATION', 'ACTIVE', 'DISABLED', 'BLOCKED')`);
        await queryRunner.query(`CREATE TABLE "patient_profiles" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."patient_profiles_status_enum" NOT NULL DEFAULT 'PENDING_VERIFICATION', "user_clinics_id" integer, CONSTRAINT "REL_6051f74fbca4239d95978ff5cb" UNIQUE ("user_clinics_id"), CONSTRAINT "PK_7297a6976f065cc75e798674aa8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."staff_profiles_role_enum" AS ENUM('OWNER', 'ADMIN', 'EMPLOYEE')`);
        await queryRunner.query(`CREATE TYPE "public"."staff_profiles_status_enum" AS ENUM('PENDING_VERIFICATION', 'ACTIVE', 'DISABLED', 'BLOCKED')`);
        await queryRunner.query(`CREATE TABLE "staff_profiles" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role" "public"."staff_profiles_role_enum" NOT NULL DEFAULT 'EMPLOYEE', "status" "public"."staff_profiles_status_enum" NOT NULL DEFAULT 'PENDING_VERIFICATION', "user_clinics_id" integer, CONSTRAINT "REL_87286026d44178d35d83ecd6e9" UNIQUE ("user_clinics_id"), CONSTRAINT "PK_6d4c6c0b447e39147b4a6dcbede" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TYPE "public"."clinics_status_enum" RENAME TO "clinics_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."clinics_status_enum" AS ENUM('PENDING_SETUP', 'ACTIVE')`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" TYPE "public"."clinics_status_enum" USING "status"::"text"::"public"."clinics_status_enum"`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" SET DEFAULT 'PENDING_SETUP'`);
        await queryRunner.query(`DROP TYPE "public"."clinics_status_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."user_status_enum" RENAME TO "user_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('PENDING_EMAIL_VERIFICATION', 'ACTIVE', 'DISABLED', 'BLOCKED')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" TYPE "public"."user_status_enum" USING "status"::"text"::"public"."user_status_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'PENDING_EMAIL_VERIFICATION'`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "psychologist_profiles" ADD CONSTRAINT "FK_5f3a9ede716eb4487f8ba39c235" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient_profiles" ADD CONSTRAINT "FK_6051f74fbca4239d95978ff5cbe" FOREIGN KEY ("user_clinics_id") REFERENCES "user_clinics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "staff_profiles" ADD CONSTRAINT "FK_87286026d44178d35d83ecd6e94" FOREIGN KEY ("user_clinics_id") REFERENCES "user_clinics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "staff_profiles" DROP CONSTRAINT "FK_87286026d44178d35d83ecd6e94"`);
        await queryRunner.query(`ALTER TABLE "patient_profiles" DROP CONSTRAINT "FK_6051f74fbca4239d95978ff5cbe"`);
        await queryRunner.query(`ALTER TABLE "psychologist_profiles" DROP CONSTRAINT "FK_5f3a9ede716eb4487f8ba39c235"`);
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum_old" AS ENUM('ACTIVE', 'BLOCKED', 'DISABLED', 'INVITED', 'PENDING_REGISTRATION')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" TYPE "public"."user_status_enum_old" USING "status"::"text"::"public"."user_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'PENDING_REGISTRATION'`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."user_status_enum_old" RENAME TO "user_status_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."clinics_status_enum_old" AS ENUM('ACTIVE', 'PENDING_SETUP')`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" TYPE "public"."clinics_status_enum_old" USING "status"::"text"::"public"."clinics_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" SET DEFAULT 'PENDING_SETUP'`);
        await queryRunner.query(`DROP TYPE "public"."clinics_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."clinics_status_enum_old" RENAME TO "clinics_status_enum"`);
        await queryRunner.query(`DROP TABLE "staff_profiles"`);
        await queryRunner.query(`DROP TYPE "public"."staff_profiles_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."staff_profiles_role_enum"`);
        await queryRunner.query(`DROP TABLE "patient_profiles"`);
        await queryRunner.query(`DROP TYPE "public"."patient_profiles_status_enum"`);
        await queryRunner.query(`DROP TABLE "psychologist_profiles"`);
        await queryRunner.query(`DROP TYPE "public"."psychologist_profiles_status_enum"`);
    }

}
