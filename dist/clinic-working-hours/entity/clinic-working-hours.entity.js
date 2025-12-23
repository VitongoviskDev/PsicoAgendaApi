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
exports.ClinicWorkingHours = void 0;
const typeorm_1 = require("typeorm");
const clinic_entity_1 = require("../../clinics/entity/clinic.entity");
let ClinicWorkingHours = class ClinicWorkingHours {
    id;
    dayOfWeek;
    openAt;
    closeAt;
    clinic;
};
exports.ClinicWorkingHours = ClinicWorkingHours;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ClinicWorkingHours.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], ClinicWorkingHours.prototype, "dayOfWeek", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", String)
], ClinicWorkingHours.prototype, "openAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", String)
], ClinicWorkingHours.prototype, "closeAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => clinic_entity_1.Clinic, clinic => clinic.workingHours, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", clinic_entity_1.Clinic)
], ClinicWorkingHours.prototype, "clinic", void 0);
exports.ClinicWorkingHours = ClinicWorkingHours = __decorate([
    (0, typeorm_1.Entity)('clinic_working_hours')
], ClinicWorkingHours);
//# sourceMappingURL=clinic-working-hours.entity.js.map