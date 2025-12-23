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
exports.ClinicPsychologist = void 0;
const clinic_entity_1 = require("../../clinics/entity/clinic.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
let ClinicPsychologist = class ClinicPsychologist {
    id;
    user;
    clinic;
    active;
};
exports.ClinicPsychologist = ClinicPsychologist;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ClinicPsychologist.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], ClinicPsychologist.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => clinic_entity_1.Clinic, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'clinicId' }),
    __metadata("design:type", clinic_entity_1.Clinic)
], ClinicPsychologist.prototype, "clinic", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], ClinicPsychologist.prototype, "active", void 0);
exports.ClinicPsychologist = ClinicPsychologist = __decorate([
    (0, typeorm_1.Entity)('clinic_psychologists'),
    (0, typeorm_1.Unique)(['user', 'clinic'])
], ClinicPsychologist);
//# sourceMappingURL=clinic-psychologist.entity.js.map