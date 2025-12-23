import { MigrationInterface, QueryRunner } from "typeorm";

export class NullableOpenedAt1766370759696 implements MigrationInterface {
    name = 'NullableOpenedAt1766370759696'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "openedAt" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "openedAt" SET NOT NULL`);
    }

}
