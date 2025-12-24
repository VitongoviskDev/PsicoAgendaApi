"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClinicPsychologistModule = void 0;
const common_1 = require("@nestjs/common");
const clinic_psychologist_service_1 = require("./clinic-psychologist.service");
const clinic_psychologist_controller_1 = require("./clinic-psychologist.controller");
let ClinicPsychologistModule = class ClinicPsychologistModule {
};
exports.ClinicPsychologistModule = ClinicPsychologistModule;
exports.ClinicPsychologistModule = ClinicPsychologistModule = __decorate([
    (0, common_1.Module)({
        providers: [clinic_psychologist_service_1.ClinicPsychologistService],
        controllers: [clinic_psychologist_controller_1.ClinicPsychologistController]
    })
], ClinicPsychologistModule);
//# sourceMappingURL=clinic-psychologist.module.js.map