"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NullableOpenedAt1766370759696 = void 0;
class NullableOpenedAt1766370759696 {
    name = 'NullableOpenedAt1766370759696';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "openedAt" DROP NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "clinics" ALTER COLUMN "openedAt" SET NOT NULL`);
    }
}
exports.NullableOpenedAt1766370759696 = NullableOpenedAt1766370759696;
//# sourceMappingURL=1766370759696-NullableOpenedAt.js.map