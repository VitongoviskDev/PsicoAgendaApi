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
exports.User = exports.UserStatus = void 0;
const patient_profile_entity_1 = require("../../patient-profile/entity/patient-profile.entity");
const psychologist_profile_entity_1 = require("../../psychologist-profile/entity/psychologist-profile.entity");
const staff_profile_entity_1 = require("../../staff-profile/entity/staff-profile.entity");
const typeorm_1 = require("typeorm");
var UserStatus;
(function (UserStatus) {
    UserStatus["PENDING_REGISTRATION"] = "PENDING_REGISTRATION";
    UserStatus["ACTIVE"] = "ACTIVE";
    UserStatus["DISABLED"] = "DISABLED";
    UserStatus["BLOCKED"] = "BLOCKED";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
let User = class User {
    id;
    name;
    email;
    password;
    phone;
    birthDate;
    cpf;
    lastClinicId;
    status;
    staffProfile;
    psychologistProfile;
    patientProfile;
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "birthDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "cpf", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "lastClinicId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: UserStatus,
        default: UserStatus.PENDING_REGISTRATION,
    }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => staff_profile_entity_1.StaffProfile, p => p.user),
    __metadata("design:type", staff_profile_entity_1.StaffProfile)
], User.prototype, "staffProfile", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => psychologist_profile_entity_1.PsychologistProfile, p => p.user),
    __metadata("design:type", psychologist_profile_entity_1.PsychologistProfile)
], User.prototype, "psychologistProfile", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => patient_profile_entity_1.PatientProfile, p => p.user),
    __metadata("design:type", patient_profile_entity_1.PatientProfile)
], User.prototype, "patientProfile", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
//# sourceMappingURL=user.entity.js.map