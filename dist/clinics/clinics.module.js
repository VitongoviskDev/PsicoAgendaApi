"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClinicsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const clinics_controller_1 = require("./clinics.controller");
const clinics_service_1 = require("./clinics.service");
const clinic_entity_1 = require("./entity/clinic.entity");
const clinic_staf_entity_1 = require("../clinic-staff/entity/clinic-staf.entity");
const user_entity_1 = require("../users/entities/user.entity");
const clinic_working_hours_entity_1 = require("../clinic-working-hours/entity/clinic-working-hours.entity");
let ClinicsModule = class ClinicsModule {
};
exports.ClinicsModule = ClinicsModule;
exports.ClinicsModule = ClinicsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                clinic_entity_1.Clinic,
                clinic_staf_entity_1.ClinicStaff,
                clinic_working_hours_entity_1.ClinicWorkingHours,
                user_entity_1.User
            ])
        ],
        controllers: [clinics_controller_1.ClinicsController],
        providers: [clinics_service_1.ClinicsService],
        exports: [clinics_service_1.ClinicsService]
    })
], ClinicsModule);
//# sourceMappingURL=clinics.module.js.map