"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("dotenv/config");
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
    synchronize: false,
    logging: false,
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/migrations/*.ts'],
});
//# sourceMappingURL=data-source.js.map