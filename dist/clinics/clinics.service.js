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
exports.ClinicsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const clinic_entity_1 = require("./entity/clinic.entity");
let ClinicsService = class ClinicsService {
    dataSource;
    clinicRepo;
    constructor(dataSource, clinicRepo) {
        this.dataSource = dataSource;
        this.clinicRepo = clinicRepo;
    }
    async createDefaultClinic() {
        const clinic = this.clinicRepo.create({
            name: "Minha Clinica",
            status: clinic_entity_1.ClinicStatus.PENDING_SETUP
        });
        await this.clinicRepo.save(clinic);
        return clinic;
    }
    findById(id) {
        return this.clinicRepo.findOne({ where: { id } });
    }
    async update(id, data) {
        await this.clinicRepo.update(id, data);
        return this.findById(id);
    }
    async completeClinic(clinicId, dto, file) {
        return this.dataSource.transaction(async (manager) => {
            const clinic = await manager.findOne(clinic_entity_1.Clinic, {
                where: { id: clinicId },
                relations: ['workingHours'],
            });
            if (!clinic) {
                throw new common_1.NotFoundException('Clinica nao encontrada');
            }
            return {
                clinic: clinic
            };
            clinic.name = dto.name;
            clinic.description = dto.description;
            clinic.openedAt = dto.openedAt;
            clinic.status = clinic_entity_1.ClinicStatus.ACTIVE;
            clinic.workingHours = dto.workingHours;
            await manager.save(clinic_entity_1.Clinic, clinic);
            return {
                clinic: clinic,
            };
        });
    }
};
exports.ClinicsService = ClinicsService;
exports.ClinicsService = ClinicsService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(clinic_entity_1.Clinic)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        typeorm_2.Repository])
], ClinicsService);
//# sourceMappingURL=clinics.service.js.map