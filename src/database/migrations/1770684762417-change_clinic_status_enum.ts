import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeClinicStatusEnum1770684762417 implements MigrationInterface {
    name = 'ChangeClinicStatusEnum1770684762417'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "staff_profiles" DROP CONSTRAINT "FK_87286026d44178d35d83ecd6e94"`);
        await queryRunner.query(`ALTER TABLE "staff_profiles" RENAME COLUMN "user_clinics_id" TO "user_clinic_id"`);
        await queryRunner.query(`CREATE TYPE "public"."clinic_rt_status_enum" AS ENUM('PENDING', 'ACTIVE', 'ENDED', 'REVOKED')`);
        await queryRunner.query(`CREATE TABLE "clinic_responsible_technicians" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "start_date" TIMESTAMP WITH TIME ZONE NOT NULL, "end_date" TIMESTAMP WITH TIME ZONE, "status" "public"."clinic_rt_status_enum" NOT NULL DEFAULT 'PENDING', "clinic_id" uuid, "user_id" uuid, "psychologist_profile_id" uuid, CONSTRAINT "PK_238a089135b0dd4c83a544ce7bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TYPE "public"."clinics_status_enum" RENAME TO "clinics_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."clinics_status_enum" AS ENUM('DRAFT', 'PENDING_RT', 'ACTIVE', 'SUSPENDED')`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" TYPE "public"."clinics_status_enum" USING "status"::"text"::"public"."clinics_status_enum"`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" SET DEFAULT 'DRAFT'`);
        await queryRunner.query(`DROP TYPE "public"."clinics_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "staff_profiles" ADD CONSTRAINT "FK_298a3bc5fe15d8937ca5b413b71" FOREIGN KEY ("user_clinic_id") REFERENCES "user_clinics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clinic_responsible_technicians" ADD CONSTRAINT "FK_7826f32569c0c2d562c27ca374b" FOREIGN KEY ("clinic_id") REFERENCES "clinics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clinic_responsible_technicians" ADD CONSTRAINT "FK_779c4a9a5f3e692148b659e4a82" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clinic_responsible_technicians" ADD CONSTRAINT "FK_1a571834b0ffc52aa12422a2396" FOREIGN KEY ("psychologist_profile_id") REFERENCES "psychologist_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clinic_responsible_technicians" DROP CONSTRAINT "FK_1a571834b0ffc52aa12422a2396"`);
        await queryRunner.query(`ALTER TABLE "clinic_responsible_technicians" DROP CONSTRAINT "FK_779c4a9a5f3e692148b659e4a82"`);
        await queryRunner.query(`ALTER TABLE "clinic_responsible_technicians" DROP CONSTRAINT "FK_7826f32569c0c2d562c27ca374b"`);
        await queryRunner.query(`ALTER TABLE "staff_profiles" DROP CONSTRAINT "FK_298a3bc5fe15d8937ca5b413b71"`);
        await queryRunner.query(`CREATE TYPE "public"."clinics_status_enum_old" AS ENUM('PENDING_SETUP', 'ACTIVE')`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" TYPE "public"."clinics_status_enum_old" USING "status"::"text"::"public"."clinics_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" SET DEFAULT 'PENDING_SETUP'`);
        await queryRunner.query(`DROP TYPE "public"."clinics_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."clinics_status_enum_old" RENAME TO "clinics_status_enum"`);
        await queryRunner.query(`DROP TABLE "clinic_responsible_technicians"`);
        await queryRunner.query(`DROP TYPE "public"."clinic_rt_status_enum"`);
        await queryRunner.query(`ALTER TABLE "staff_profiles" RENAME COLUMN "user_clinic_id" TO "user_clinics_id"`);
        await queryRunner.query(`ALTER TABLE "staff_profiles" ADD CONSTRAINT "FK_87286026d44178d35d83ecd6e94" FOREIGN KEY ("user_clinics_id") REFERENCES "user_clinics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
