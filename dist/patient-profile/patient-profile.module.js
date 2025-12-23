"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientProfileModule = void 0;
const common_1 = require("@nestjs/common");
const patient_profile_service_1 = require("./patient-profile.service");
const patient_profile_controller_1 = require("./patient-profile.controller");
const patient_profile_entity_1 = require("./entity/patient-profile.entity");
const typeorm_1 = require("@nestjs/typeorm");
let PatientProfileModule = class PatientProfileModule {
};
exports.PatientProfileModule = PatientProfileModule;
exports.PatientProfileModule = PatientProfileModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([patient_profile_entity_1.PatientProfile]),
        ],
        controllers: [patient_profile_controller_1.PatientProfileController],
        providers: [patient_profile_service_1.PatientProfileService],
        exports: [patient_profile_service_1.PatientProfileService],
    })
], PatientProfileModule);
//# sourceMappingURL=patient-profile.module.js.map