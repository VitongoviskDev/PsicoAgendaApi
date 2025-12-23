"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const clinics_service_1 = require("../clinics/clinics.service");
const clinic_entity_1 = require("../clinics/entity/clinic.entity");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const users_service_1 = require("../users/users.service");
const clinic_staff_service_1 = require("../clinic-staff/clinic-staff.service");
const clinic_staf_entity_1 = require("../clinic-staff/entity/clinic-staf.entity");
let AuthService = class AuthService {
    dataSource;
    usersService;
    clinicsService;
    clinicStaffService;
    jwtService;
    constructor(dataSource, usersService, clinicsService, clinicStaffService, jwtService) {
        this.dataSource = dataSource;
        this.usersService = usersService;
        this.clinicsService = clinicsService;
        this.clinicStaffService = clinicStaffService;
        this.jwtService = jwtService;
    }
    async registerOwner(dto) {
        return this.dataSource.transaction(async (manager) => {
            const existingUser = await manager.findOne(user_entity_1.User, {
                where: { email: dto.user.email },
            });
            if (existingUser) {
                throw new common_1.ConflictException('E-mail já está em uso.');
            }
            if (dto.user.password !== dto.user.confirm_password) {
                throw new common_1.ConflictException('As senhas digitadas não coincidem.');
            }
            const clinic = await manager.create(clinic_entity_1.Clinic, {
                name: 'Minha clínica',
                status: clinic_entity_1.ClinicStatus.PENDING_SETUP,
            });
            await manager.save(clinic);
            const hashedPassword = await bcrypt.hash(dto.user.password, 10);
            const user = manager.create(user_entity_1.User, {
                name: dto.user.name,
                email: dto.user.email,
                password: hashedPassword,
                status: user_entity_1.UserStatus.PENDING_REGISTRATION,
                lastClinicId: clinic.id,
            });
            await manager.save(user);
            const staff = manager.create(clinic_staf_entity_1.ClinicStaff, {
                user: user,
                clinic: clinic,
                role: clinic_staf_entity_1.StaffRole.OWNER,
            });
            await manager.save(staff);
            const payload = { sub: user.id };
            const access_token = this.jwtService.sign(payload);
            return {
                user,
                currentClinic: clinic,
                clinics: [clinic],
                access_token,
            };
        });
    }
    async login(dto) {
        const { email, password } = dto;
        const user = await this.usersService.findByEmailWithProfiles(email);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const staffRelations = await this.clinicStaffService.findByUser({ userId: user.id });
        if (!staffRelations || staffRelations && staffRelations.length === 0) {
            throw new common_1.UnauthorizedException('Usuário não possui vínculo com nenhuma clínica');
        }
        const activeStaff = staffRelations.find(r => r.clinic.id === user.lastClinicId) ??
            staffRelations[0];
        if (user.lastClinicId !== activeStaff.clinic.id) {
            await this.usersService.setLastClinic(user.id, activeStaff.clinic.id);
        }
        const clinics = staffRelations.map(r => ({
            id: r.clinic.id,
            name: r.clinic.name,
            status: r.clinic.status,
            staffRole: r.role,
        }));
        const userResponse = {
            id: user?.id,
            name: user?.name,
            email: user?.email,
            phone: user?.phone,
            birthDate: user?.birthDate,
            cpf: user?.cpf,
            status: user?.status,
            profiles: {
                staff: !!activeStaff && !!user?.staffProfile ? {
                    active: user?.staffProfile.active,
                    role: activeStaff.role,
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
        };
        const currentClinic = {
            id: activeStaff.clinic.id,
            name: activeStaff.clinic.name,
            status: activeStaff.clinic.status,
            staffRole: activeStaff.role,
        };
        const payload = {
            sub: user.id,
            clinicId: activeStaff.clinic.id,
        };
        const access_token = this.jwtService.sign(payload);
        return {
            user: userResponse,
            currentClinic,
            clinics,
            access_token,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        users_service_1.UsersService,
        clinics_service_1.ClinicsService,
        clinic_staff_service_1.ClinicStaffService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map