"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenedAtColumnType1766372938507 = void 0;
class OpenedAtColumnType1766372938507 {
    name = 'OpenedAtColumnType1766372938507';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "clinics" DROP COLUMN "openedAt"`);
        await queryRunner.query(`ALTER TABLE "clinics" ADD "openedAt" TIMESTAMP`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "clinics" DROP COLUMN "openedAt"`);
        await queryRunner.query(`ALTER TABLE "clinics" ADD "openedAt" character varying`);
    }
}
exports.OpenedAtColumnType1766372938507 = OpenedAtColumnType1766372938507;
//# sourceMappingURL=1766372938507-OpenedAtColumnType.js.map