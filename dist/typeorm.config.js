"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const data_source_1 = require("./src/data-source");
exports.default = new typeorm_1.DataSource(data_source_1.dataSourceOptions);
//# sourceMappingURL=typeorm.config.js.map