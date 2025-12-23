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
exports.CompleteUserProfileDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CompleteUserProfileDto {
    cpf;
    birthDate;
    phone;
    actAsPsychologist;
    crp;
}
exports.CompleteUserProfileDto = CompleteUserProfileDto;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => typeof value === 'string'
        ? value.replace(/\D/g, '')
        : value),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CompleteUserProfileDto.prototype, "cpf", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => new Date(value)),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", String)
], CompleteUserProfileDto.prototype, "birthDate", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => typeof value === 'string'
        ? value.replace(/\D/g, '')
        : value),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CompleteUserProfileDto.prototype, "phone", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === 'true'),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CompleteUserProfileDto.prototype, "actAsPsychologist", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => typeof value === 'string'
        ? value.replace(/\D/g, '')
        : value),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CompleteUserProfileDto.prototype, "crp", void 0);
//# sourceMappingURL=complete-user-profile.dto.js.map