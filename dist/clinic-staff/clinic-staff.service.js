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
exports.ClinicStaffService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const clinic_staf_entity_1 = require("./entity/clinic-staf.entity");
const clinic_entity_1 = require("../clinics/entity/clinic.entity");
let ClinicStaffService = class ClinicStaffService {
    clinicStaffRepo;
    clinicRepo;
    userRepo;
    constructor(clinicStaffRepo, clinicRepo, userRepo) {
        this.clinicStaffRepo = clinicStaffRepo;
        this.clinicRepo = clinicRepo;
        this.userRepo = userRepo;
    }
    async create(params) {
        const { userId, clinicId, role } = params;
        const user = await this.userRepo.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('Usuário não encontrado');
        }
        const clinic = await this.clinicRepo.findOne({
            where: { id: clinicId },
        });
        if (!clinic) {
            throw new common_1.NotFoundException('Clínica não encontrada');
        }
        const existingStaff = await this.clinicStaffRepo.findOne({
            where: {
                user: { id: userId },
                clinic: { id: clinicId },
            },
        });
        if (existingStaff) {
            throw new common_1.ConflictException('Usuário já faz parte do staff desta clínica');
        }
        const staff = this.clinicStaffRepo.create({
            user,
            clinic,
            role,
        });
        return this.clinicStaffRepo.save(staff);
    }
    async findByUser(params) {
        const { userId } = params;
        return this.clinicStaffRepo.find({
            where: {
                user: { id: userId },
            },
            relations: {
                clinic: true,
            },
        });
    }
};
exports.ClinicStaffService = ClinicStaffService;
exports.ClinicStaffService = ClinicStaffService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(clinic_staf_entity_1.ClinicStaff)),
    __param(1, (0, typeorm_1.InjectRepository)(clinic_entity_1.Clinic)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ClinicStaffService);
//# sourceMappingURL=clinic-staff.service.js.map