"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialSchema1766603651491 = void 0;
class InitialSchema1766603651491 {
    name = 'InitialSchema1766603651491';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "patient_profiles" ("userId" uuid NOT NULL, "notes" character varying, CONSTRAINT "PK_fc4788002ae2de0a68f6ccf24e5" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "psychologist_profiles" ("userId" uuid NOT NULL, "crp" character varying NOT NULL, "specialty" character varying, "active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_f512a150dbeb06ac5caaa8904ef" UNIQUE ("crp"), CONSTRAINT "PK_2f9fb42f8935016574658aff62c" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "staff_profiles" ("userId" uuid NOT NULL, "active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_538ab8c582b6c827244952a2923" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_status_enum" AS ENUM('PENDING_REGISTRATION', 'ACTIVE', 'DISABLED', 'BLOCKED')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "phone" character varying, "birthDate" TIMESTAMP, "cpf" character varying, "lastClinicId" uuid, "status" "public"."users_status_enum" NOT NULL DEFAULT 'PENDING_REGISTRATION', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clinic_working_hours" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "dayOfWeek" integer NOT NULL, "openAt" TIME NOT NULL, "closeAt" TIME NOT NULL, "clinicId" uuid, CONSTRAINT "PK_088fcd99dbf1c99df21e8b984de" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."clinics_status_enum" AS ENUM('PENDING_SETUP', 'ACTIVE')`);
        await queryRunner.query(`CREATE TABLE "clinics" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "nickname" character varying, "description" character varying, "cnpj" character varying, "openedAt" TIMESTAMP, "status" "public"."clinics_status_enum" NOT NULL DEFAULT 'PENDING_SETUP', CONSTRAINT "PK_5513b659e4d12b01a8ab3956abc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."clinic_staff_role_enum" AS ENUM('OWNER', 'ADMIN', 'EMPLOYEE')`);
        await queryRunner.query(`CREATE TABLE "clinic_staff" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role" "public"."clinic_staff_role_enum" NOT NULL, "userId" uuid NOT NULL, "clinicId" uuid NOT NULL, CONSTRAINT "UQ_f7b37e8320f65d5cf63b7d63e1f" UNIQUE ("userId", "clinicId"), CONSTRAINT "PK_e7a2233a8f335413d5d0e2879e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clinic_psychologists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "active" boolean NOT NULL DEFAULT true, "userId" uuid, "clinicId" uuid, CONSTRAINT "UQ_deade3dbbc46c54a78b3afd499e" UNIQUE ("userId", "clinicId"), CONSTRAINT "PK_e6c2609c455ed40ae6582866daf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clinic_patients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "active" boolean NOT NULL DEFAULT true, "userId" uuid, "clinicId" uuid, CONSTRAINT "UQ_ee21a33817e2381455732d9af20" UNIQUE ("userId", "clinicId"), CONSTRAINT "PK_e4b871c6733d596d35fe3e27628" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "patient_profiles" ADD CONSTRAINT "FK_fc4788002ae2de0a68f6ccf24e5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "psychologist_profiles" ADD CONSTRAINT "FK_2f9fb42f8935016574658aff62c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "staff_profiles" ADD CONSTRAINT "FK_538ab8c582b6c827244952a2923" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clinic_working_hours" ADD CONSTRAINT "FK_f43afd7497d314772c23e9ee144" FOREIGN KEY ("clinicId") REFERENCES "clinics"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clinic_staff" ADD CONSTRAINT "FK_efbc5099478abf71965de5ff439" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clinic_staff" ADD CONSTRAINT "FK_a0401fd7e261acfc8ee37185796" FOREIGN KEY ("clinicId") REFERENCES "clinics"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clinic_psychologists" ADD CONSTRAINT "FK_20e06c443d90770b299750c41a9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clinic_psychologists" ADD CONSTRAINT "FK_e502d1bc359277b23a04bcead38" FOREIGN KEY ("clinicId") REFERENCES "clinics"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clinic_patients" ADD CONSTRAINT "FK_db880371c673f17bc84e9c405e0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clinic_patients" ADD CONSTRAINT "FK_afa8a55d8f9eb4797569946f562" FOREIGN KEY ("clinicId") REFERENCES "clinics"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "clinic_patients" DROP CONSTRAINT "FK_afa8a55d8f9eb4797569946f562"`);
        await queryRunner.query(`ALTER TABLE "clinic_patients" DROP CONSTRAINT "FK_db880371c673f17bc84e9c405e0"`);
        await queryRunner.query(`ALTER TABLE "clinic_psychologists" DROP CONSTRAINT "FK_e502d1bc359277b23a04bcead38"`);
        await queryRunner.query(`ALTER TABLE "clinic_psychologists" DROP CONSTRAINT "FK_20e06c443d90770b299750c41a9"`);
        await queryRunner.query(`ALTER TABLE "clinic_staff" DROP CONSTRAINT "FK_a0401fd7e261acfc8ee37185796"`);
        await queryRunner.query(`ALTER TABLE "clinic_staff" DROP CONSTRAINT "FK_efbc5099478abf71965de5ff439"`);
        await queryRunner.query(`ALTER TABLE "clinic_working_hours" DROP CONSTRAINT "FK_f43afd7497d314772c23e9ee144"`);
        await queryRunner.query(`ALTER TABLE "staff_profiles" DROP CONSTRAINT "FK_538ab8c582b6c827244952a2923"`);
        await queryRunner.query(`ALTER TABLE "psychologist_profiles" DROP CONSTRAINT "FK_2f9fb42f8935016574658aff62c"`);
        await queryRunner.query(`ALTER TABLE "patient_profiles" DROP CONSTRAINT "FK_fc4788002ae2de0a68f6ccf24e5"`);
        await queryRunner.query(`DROP TABLE "clinic_patients"`);
        await queryRunner.query(`DROP TABLE "clinic_psychologists"`);
        await queryRunner.query(`DROP TABLE "clinic_staff"`);
        await queryRunner.query(`DROP TYPE "public"."clinic_staff_role_enum"`);
        await queryRunner.query(`DROP TABLE "clinics"`);
        await queryRunner.query(`DROP TYPE "public"."clinics_status_enum"`);
        await queryRunner.query(`DROP TABLE "clinic_working_hours"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
        await queryRunner.query(`DROP TABLE "staff_profiles"`);
        await queryRunner.query(`DROP TABLE "psychologist_profiles"`);
        await queryRunner.query(`DROP TABLE "patient_profiles"`);
    }
}
exports.InitialSchema1766603651491 = InitialSchema1766603651491;
//# sourceMappingURL=1766603651491-InitialSchema.js.map