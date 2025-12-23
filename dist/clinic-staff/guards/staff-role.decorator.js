"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffRoles = void 0;
const common_1 = require("@nestjs/common");
const StaffRoles = (...roles) => (0, common_1.SetMetadata)('staff_roles', roles);
exports.StaffRoles = StaffRoles;
//# sourceMappingURL=staff-role.decorator.js.map