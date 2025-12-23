"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixClinicDescription1766368545291 = void 0;
class FixClinicDescription1766368545291 {
    name = 'FixClinicDescription1766368545291';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "clinic_working_hours" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "dayOfWeek" integer NOT NULL, "openAt" TIME NOT NULL, "closeAt" TIME NOT NULL, "clinicId" uuid, CONSTRAINT "PK_088fcd99dbf1c99df21e8b984de" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clinic_psychologists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "active" boolean NOT NULL DEFAULT true, "userId" uuid, "clinicId" uuid, CONSTRAINT "UQ_deade3dbbc46c54a78b3afd499e" UNIQUE ("userId", "clinicId"), CONSTRAINT "PK_e6c2609c455ed40ae6582866daf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clinic_patients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "active" boolean NOT NULL DEFAULT true, "userId" uuid, "clinicId" uuid, CONSTRAINT "UQ_ee21a33817e2381455732d9af20" UNIQUE ("userId", "clinicId"), CONSTRAINT "PK_e4b871c6733d596d35fe3e27628" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "clinics" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "clinics" ADD "openedAt" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clinic_staff" DROP CONSTRAINT "FK_efbc5099478abf71965de5ff439"`);
        await queryRunner.query(`ALTER TABLE "clinic_staff" DROP CONSTRAINT "FK_a0401fd7e261acfc8ee37185796"`);
        await queryRunner.query(`ALTER TABLE "clinic_staff" DROP CONSTRAINT "UQ_f7b37e8320f65d5cf63b7d63e1f"`);
        await queryRunner.query(`ALTER TABLE "clinic_staff" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clinic_staff" ALTER COLUMN "clinicId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clinic_staff" ADD CONSTRAINT "UQ_f7b37e8320f65d5cf63b7d63e1f" UNIQUE ("userId", "clinicId")`);
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
        await queryRunner.query(`ALTER TABLE "clinic_staff" DROP CONSTRAINT "UQ_f7b37e8320f65d5cf63b7d63e1f"`);
        await queryRunner.query(`ALTER TABLE "clinic_staff" ALTER COLUMN "clinicId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clinic_staff" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clinic_staff" ADD CONSTRAINT "UQ_f7b37e8320f65d5cf63b7d63e1f" UNIQUE ("userId", "clinicId")`);
        await queryRunner.query(`ALTER TABLE "clinic_staff" ADD CONSTRAINT "FK_a0401fd7e261acfc8ee37185796" FOREIGN KEY ("clinicId") REFERENCES "clinics"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clinic_staff" ADD CONSTRAINT "FK_efbc5099478abf71965de5ff439" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clinics" DROP COLUMN "openedAt"`);
        await queryRunner.query(`ALTER TABLE "clinics" DROP COLUMN "description"`);
        await queryRunner.query(`DROP TABLE "clinic_patients"`);
        await queryRunner.query(`DROP TABLE "clinic_psychologists"`);
        await queryRunner.query(`DROP TABLE "clinic_working_hours"`);
    }
}
exports.FixClinicDescription1766368545291 = FixClinicDescription1766368545291;
//# sourceMappingURL=1766368545291-FixClinicDescription.js.map