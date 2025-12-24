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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const psychologist_profile_entity_1 = require("../psychologist-profile/entity/psychologist-profile.entity");
const clinic_staf_entity_1 = require("../clinic-staff/entity/clinic-staf.entity");
let UsersService = class UsersService {
    dataSource;
    usersRepo;
    constructor(dataSource, usersRepo) {
        this.dataSource = dataSource;
        this.usersRepo = usersRepo;
    }
    findAll() {
        return this.usersRepo.find();
    }
    findById(id) {
        return this.usersRepo.findOne({ where: { id } });
    }
    findByCpf(cpf) {
        return this.usersRepo.findOne({ where: { cpf } });
    }
    create(data) {
        const user = this.usersRepo.create(data);
        return this.usersRepo.save(user);
    }
    async findByEmailWithProfiles(email) {
        return this.usersRepo.findOne({
            where: { email },
            relations: {
                staffProfile: true,
                psychologistProfile: true,
                patientProfile: true,
            },
        });
    }
    async update(id, data) {
        await this.usersRepo.update(id, data);
        return this.findById(id);
    }
    async setLastClinic(userId, clinicId) {
        await this.usersRepo.update(userId, { lastClinicId: clinicId });
        return this.findById(userId);
    }
    async completeProfile(userId, clinicId, dto, file) {
        return this.dataSource.transaction(async (manager) => {
            await manager.update(user_entity_1.User, userId, {
                cpf: dto.cpf,
                birthDate: dto.birthDate,
                phone: dto.phone,
                status: user_entity_1.UserStatus.ACTIVE,
            });
            if (dto.actAsPsychologist) {
                const exists = await manager.findOne(psychologist_profile_entity_1.PsychologistProfile, {
                    where: { user: { id: userId } },
                });
                if (!exists) {
                    await manager.save(psychologist_profile_entity_1.PsychologistProfile, {
                        user: { id: userId },
                        crp: dto.crp,
                    });
                }
            }
            const user = await manager.findOne(user_entity_1.User, {
                where: { id: userId },
                relations: {
                    staffProfile: true,
                    psychologistProfile: true,
                    patientProfile: true,
                },
            });
            const staffRelation = await manager.findOne(clinic_staf_entity_1.ClinicStaff, {
                where: {
                    user: { id: userId },
                    clinic: { id: clinicId },
                },
            });
            return {
                user: {
                    id: user?.id,
                    name: user?.name,
                    email: user?.email,
                    phone: user?.phone,
                    birthDate: user?.birthDate,
                    cpf: user?.cpf,
                    status: user?.status,
                    profiles: {
                        staff: !!staffRelation && !!user?.staffProfile ? {
                            active: user?.staffProfile.active,
                            role: staffRelation.role,
                        } : null,
                        psychologist: !!user?.psychologistProfile ? {
                            active: user.psychologistProfile.active,
                            crp: user.psychologistProfile.crp,
                            specialty: user.psychologistProfile.specialty ?? null,
                        } : null,
                        patient: !!user?.patientProfile ? {
                            notes: user.patientProfile.notes ?? null,
                        } : null,
                    },
                },
            };
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        typeorm_1.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map