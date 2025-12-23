"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateClinicDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const register_clinic_dto_1 = require("./register-clinic.dto");
class UpdateClinicDto extends (0, mapped_types_1.PartialType)(register_clinic_dto_1.RegisterClinicDto) {
}
exports.UpdateClinicDto = UpdateClinicDto;
//# sourceMappingURL=update-clinic.dto.js.map