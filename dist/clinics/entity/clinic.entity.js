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
exports.Clinic = exports.ClinicStatus = void 0;
const typeorm_1 = require("typeorm");
const clinic_working_hours_entity_1 = require("../../clinic-working-hours/entity/clinic-working-hours.entity");
var ClinicStatus;
(function (ClinicStatus) {
    ClinicStatus["PENDING_SETUP"] = "PENDING_SETUP";
    ClinicStatus["ACTIVE"] = "ACTIVE";
})(ClinicStatus || (exports.ClinicStatus = ClinicStatus = {}));
let Clinic = class Clinic {
    id;
    name;
    description;
    openedAt;
    status;
    workingHours;
};
exports.Clinic = Clinic;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Clinic.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Clinic.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Clinic.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Clinic.prototype, "openedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ClinicStatus,
        default: ClinicStatus.PENDING_SETUP,
    }),
    __metadata("design:type", String)
], Clinic.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => clinic_working_hours_entity_1.ClinicWorkingHours, workingHours => workingHours.clinic, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], Clinic.prototype, "workingHours", void 0);
exports.Clinic = Clinic = __decorate([
    (0, typeorm_1.Entity)('clinics')
], Clinic);
//# sourceMappingURL=clinic.entity.js.map