import { MigrationInterface, QueryRunner } from "typeorm";

export class PsychilogistAndClinicRelation1771274854720 implements MigrationInterface {
    name = 'PsychilogistAndClinicRelation1771274854720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."sessions_status_enum" AS ENUM('WAITING_CONFIRMATION', 'CONFIRMED', 'CANCELED', 'COMPLETED', 'RESCHEDULED')`);
        await queryRunner.query(`CREATE TABLE "sessions" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."sessions_status_enum" NOT NULL DEFAULT 'WAITING_CONFIRMATION', "date" TIMESTAMP WITH TIME ZONE NOT NULL, "duration" integer NOT NULL, "price" integer NOT NULL DEFAULT '0', "patient_id" uuid, "psychologist_id" uuid, "clinic_id" uuid, "created_by_id" uuid, CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."session_histories_previous_status_enum" AS ENUM('WAITING_CONFIRMATION', 'CONFIRMED', 'CANCELED', 'COMPLETED', 'RESCHEDULED')`);
        await queryRunner.query(`CREATE TYPE "public"."session_histories_new_status_enum" AS ENUM('WAITING_CONFIRMATION', 'CONFIRMED', 'CANCELED', 'COMPLETED', 'RESCHEDULED')`);
        await queryRunner.query(`CREATE TABLE "session_histories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "previous_status" "public"."session_histories_previous_status_enum", "new_status" "public"."session_histories_new_status_enum" NOT NULL, "reason" character varying, "changed_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "session_id" uuid, "changed_by_id" uuid, CONSTRAINT "PK_f0efced40a44367739672072dc7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "activity_logs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "target_entity" character varying NOT NULL, "target_id" character varying NOT NULL, "action" character varying NOT NULL, "metadata" jsonb, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "performed_by_id" uuid, "clinic_id" uuid, CONSTRAINT "PK_f25287b6140c5ba18d38776a796" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_clinics" ADD "psychologist_profiles_id" uuid`);
        await queryRunner.query(`ALTER TYPE "public"."clinics_status_enum" RENAME TO "clinics_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."clinics_status_enum" AS ENUM('DRAFT', 'ACTIVE', 'SUSPENDED')`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" TYPE "public"."clinics_status_enum" USING "status"::"text"::"public"."clinics_status_enum"`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" SET DEFAULT 'DRAFT'`);
        await queryRunner.query(`DROP TYPE "public"."clinics_status_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."psychologist_profiles_status_enum" RENAME TO "psychologist_profiles_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."psychologist_profiles_status_enum" AS ENUM('PENDING_VERIFICATION', 'WAITING_FIRST_SECTION', 'ACTIVE', 'DISABLED', 'BLOCKED')`);
        await queryRunner.query(`ALTER TABLE "psychologist_profiles" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "psychologist_profiles" ALTER COLUMN "status" TYPE "public"."psychologist_profiles_status_enum" USING "status"::"text"::"public"."psychologist_profiles_status_enum"`);
        await queryRunner.query(`ALTER TABLE "psychologist_profiles" ALTER COLUMN "status" SET DEFAULT 'PENDING_VERIFICATION'`);
        await queryRunner.query(`DROP TYPE "public"."psychologist_profiles_status_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."staff_profiles_status_enum" RENAME TO "staff_profiles_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."staff_profiles_status_enum" AS ENUM('PENDING_VERIFICATION', 'WAITING_FIRST_SECTION', 'ACTIVE', 'DISABLED', 'BLOCKED')`);
        await queryRunner.query(`ALTER TABLE "staff_profiles" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "staff_profiles" ALTER COLUMN "status" TYPE "public"."staff_profiles_status_enum" USING "status"::"text"::"public"."staff_profiles_status_enum"`);
        await queryRunner.query(`ALTER TABLE "staff_profiles" ALTER COLUMN "status" SET DEFAULT 'PENDING_VERIFICATION'`);
        await queryRunner.query(`DROP TYPE "public"."staff_profiles_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "user_clinics" ADD CONSTRAINT "FK_dc555c6d1bee1de2f408ab251b9" FOREIGN KEY ("psychologist_profiles_id") REFERENCES "psychologist_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "FK_b53ef4073197ef9be0c1d914c54" FOREIGN KEY ("patient_id") REFERENCES "patient_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "FK_061cbe532a40612182717dc6bea" FOREIGN KEY ("psychologist_id") REFERENCES "psychologist_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "FK_631bd580b523d8f725792b0b426" FOREIGN KEY ("clinic_id") REFERENCES "clinics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "FK_1ccf045da14e5350b26ee882592" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session_histories" ADD CONSTRAINT "FK_dc8959d52e5c55515c0834021bd" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session_histories" ADD CONSTRAINT "FK_ab452dda4207fbb6100d7676bef" FOREIGN KEY ("changed_by_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "activity_logs" ADD CONSTRAINT "FK_f3ae221e1012294853ee4bd5879" FOREIGN KEY ("performed_by_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "activity_logs" ADD CONSTRAINT "FK_850f7dc66703adb3e0441105596" FOREIGN KEY ("clinic_id") REFERENCES "clinics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activity_logs" DROP CONSTRAINT "FK_850f7dc66703adb3e0441105596"`);
        await queryRunner.query(`ALTER TABLE "activity_logs" DROP CONSTRAINT "FK_f3ae221e1012294853ee4bd5879"`);
        await queryRunner.query(`ALTER TABLE "session_histories" DROP CONSTRAINT "FK_ab452dda4207fbb6100d7676bef"`);
        await queryRunner.query(`ALTER TABLE "session_histories" DROP CONSTRAINT "FK_dc8959d52e5c55515c0834021bd"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_1ccf045da14e5350b26ee882592"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_631bd580b523d8f725792b0b426"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_061cbe532a40612182717dc6bea"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_b53ef4073197ef9be0c1d914c54"`);
        await queryRunner.query(`ALTER TABLE "user_clinics" DROP CONSTRAINT "FK_dc555c6d1bee1de2f408ab251b9"`);
        await queryRunner.query(`CREATE TYPE "public"."staff_profiles_status_enum_old" AS ENUM('ACTIVE', 'BLOCKED', 'DISABLED', 'PENDING_VERIFICATION')`);
        await queryRunner.query(`ALTER TABLE "staff_profiles" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "staff_profiles" ALTER COLUMN "status" TYPE "public"."staff_profiles_status_enum_old" USING "status"::"text"::"public"."staff_profiles_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "staff_profiles" ALTER COLUMN "status" SET DEFAULT 'PENDING_VERIFICATION'`);
        await queryRunner.query(`DROP TYPE "public"."staff_profiles_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."staff_profiles_status_enum_old" RENAME TO "staff_profiles_status_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."psychologist_profiles_status_enum_old" AS ENUM('ACTIVE', 'BLOCKED', 'DISABLED', 'PENDING_VERIFICATION')`);
        await queryRunner.query(`ALTER TABLE "psychologist_profiles" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "psychologist_profiles" ALTER COLUMN "status" TYPE "public"."psychologist_profiles_status_enum_old" USING "status"::"text"::"public"."psychologist_profiles_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "psychologist_profiles" ALTER COLUMN "status" SET DEFAULT 'PENDING_VERIFICATION'`);
        await queryRunner.query(`DROP TYPE "public"."psychologist_profiles_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."psychologist_profiles_status_enum_old" RENAME TO "psychologist_profiles_status_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."clinics_status_enum_old" AS ENUM('ACTIVE', 'DRAFT', 'SUSPENDED')`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" TYPE "public"."clinics_status_enum_old" USING "status"::"text"::"public"."clinics_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "status" SET DEFAULT 'DRAFT'`);
        await queryRunner.query(`DROP TYPE "public"."clinics_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."clinics_status_enum_old" RENAME TO "clinics_status_enum"`);
        await queryRunner.query(`ALTER TABLE "user_clinics" DROP COLUMN "psychologist_profiles_id"`);
        await queryRunner.query(`DROP TABLE "activity_logs"`);
        await queryRunner.query(`DROP TABLE "session_histories"`);
        await queryRunner.query(`DROP TYPE "public"."session_histories_new_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."session_histories_previous_status_enum"`);
        await queryRunner.query(`DROP TABLE "sessions"`);
        await queryRunner.query(`DROP TYPE "public"."sessions_status_enum"`);
    }

}
