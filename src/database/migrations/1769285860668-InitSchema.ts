import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1769285860668 implements MigrationInterface {
    name = 'InitSchema1769285860668'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clinics" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "cnpj" character varying, "opened_at" TIMESTAMP, "status" "public"."clinics_status_enum" NOT NULL DEFAULT 'PENDING_SETUP', CONSTRAINT "PK_5513b659e4d12b01a8ab3956abc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_clinics" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" SERIAL NOT NULL, "user_id" uuid, "clinic_id" uuid, CONSTRAINT "UQ_df58577968b9471dd97c741689b" UNIQUE ("user_id", "clinic_id"), CONSTRAINT "PK_a2a93ea4c1b877f81238152477b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "phone" character varying, "birth_date" TIMESTAMP, "cpf" character varying, "status" "public"."user_status_enum" NOT NULL DEFAULT 'PENDING_REGISTRATION', "current_user_clinic_id" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_clinics" ADD CONSTRAINT "FK_0dc6a54f9bef29def00c4039bfc" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_clinics" ADD CONSTRAINT "FK_a083644676487e98d69c7f8f479" FOREIGN KEY ("clinic_id") REFERENCES "clinics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_886eec2de4533729b4b3031e337" FOREIGN KEY ("current_user_clinic_id") REFERENCES "user_clinics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_886eec2de4533729b4b3031e337"`);
        await queryRunner.query(`ALTER TABLE "user_clinics" DROP CONSTRAINT "FK_a083644676487e98d69c7f8f479"`);
        await queryRunner.query(`ALTER TABLE "user_clinics" DROP CONSTRAINT "FK_0dc6a54f9bef29def00c4039bfc"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "user_clinics"`);
        await queryRunner.query(`DROP TABLE "clinics"`);
    }

}
