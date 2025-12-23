import { MigrationInterface, QueryRunner } from "typeorm";

export class OpenedAtColumnType1766372938507 implements MigrationInterface {
    name = 'OpenedAtColumnType1766372938507'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clinics" DROP COLUMN "openedAt"`);
        await queryRunner.query(`ALTER TABLE "clinics" ADD "openedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clinics" DROP COLUMN "openedAt"`);
        await queryRunner.query(`ALTER TABLE "clinics" ADD "openedAt" character varying`);
    }

}
