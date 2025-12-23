"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddLastClinicIdToUserYYYYMMDDHHMMSS = void 0;
const typeorm_1 = require("typeorm");
class AddLastClinicIdToUserYYYYMMDDHHMMSS {
    async up(queryRunner) {
        await queryRunner.addColumn('users', new typeorm_1.TableColumn({
            name: 'lastClinicId',
            type: 'uuid',
            isNullable: true,
        }));
        await queryRunner.query(`CREATE INDEX "IDX_users_lastClinicId" ON "users" ("lastClinicId")`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "IDX_users_lastClinicId"`);
        await queryRunner.dropColumn('users', 'lastClinicId');
    }
}
exports.AddLastClinicIdToUserYYYYMMDDHHMMSS = AddLastClinicIdToUserYYYYMMDDHHMMSS;
//# sourceMappingURL=2025_11_09_23h59-AddLastClinicIdToUser.js.map