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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompleteOwnerRegistrationDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const register_clinic_dto_1 = require("../../clinics/dto/register-clinic.dto");
const register_psychologist_dto_1 = require("../../psychologist-profile/dto/register-psychologist.dto");
class CompleteOwnerRegistrationDto {
    clinic;
    psychologist;
}
exports.CompleteOwnerRegistrationDto = CompleteOwnerRegistrationDto;
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => register_clinic_dto_1.RegisterClinicDto),
    __metadata("design:type", register_clinic_dto_1.RegisterClinicDto)
], CompleteOwnerRegistrationDto.prototype, "clinic", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => register_psychologist_dto_1.RegisterPsychologistDto),
    __metadata("design:type", register_psychologist_dto_1.RegisterPsychologistDto)
], CompleteOwnerRegistrationDto.prototype, "psychologist", void 0);
//# sourceMappingURL=complete-registration.dto.js.map