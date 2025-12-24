"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClinicsController = void 0;
const common_1 = require("@nestjs/common");
const clinics_service_1 = require("./clinics.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const platform_express_1 = require("@nestjs/platform-express");
const complete_clinic_dto_1 = require("./dto/complete-clinic.dto");
const current_clinic_decorator_1 = require("../common/decorators/current-clinic.decorator");
let ClinicsController = class ClinicsController {
    clinicService;
    constructor(clinicService) {
        this.clinicService = clinicService;
    }
    async completeClinic(clinicId, file, dto) {
        const data = await this.clinicService.completeClinic(clinicId, dto, file);
        const response = {
            message: 'Clinica atualizada com sucesso!',
            data: data,
            status: 200
        };
        return response;
    }
};
exports.ClinicsController = ClinicsController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('picture')),
    (0, common_1.Post)('complete-clinic'),
    __param(0, (0, current_clinic_decorator_1.CurrentClinic)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, complete_clinic_dto_1.CompleteClinicDto]),
    __metadata("design:returntype", Promise)
], ClinicsController.prototype, "completeClinic", null);
exports.ClinicsController = ClinicsController = __decorate([
    (0, common_1.Controller)('clinics'),
    __metadata("design:paramtypes", [clinics_service_1.ClinicsService])
], ClinicsController);
//# sourceMappingURL=clinics.controller.js.map