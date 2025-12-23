"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClinicPatientModule = void 0;
const common_1 = require("@nestjs/common");
const clinic_patient_service_1 = require("./clinic-patient.service");
const clinic_patient_controller_1 = require("./clinic-patient.controller");
let ClinicPatientModule = class ClinicPatientModule {
};
exports.ClinicPatientModule = ClinicPatientModule;
exports.ClinicPatientModule = ClinicPatientModule = __decorate([
    (0, common_1.Module)({
        providers: [clinic_patient_service_1.ClinicPatientService],
        controllers: [clinic_patient_controller_1.ClinicPatientController]
    })
], ClinicPatientModule);
//# sourceMappingURL=clinic-patient.module.js.map