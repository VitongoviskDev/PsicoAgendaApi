"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffProfileModule = void 0;
const common_1 = require("@nestjs/common");
const staff_profile_service_1 = require("./staff-profile.service");
const staff_profile_controller_1 = require("./staff-profile.controller");
let StaffProfileModule = class StaffProfileModule {
};
exports.StaffProfileModule = StaffProfileModule;
exports.StaffProfileModule = StaffProfileModule = __decorate([
    (0, common_1.Module)({
        providers: [staff_profile_service_1.StaffProfileService],
        controllers: [staff_profile_controller_1.StaffProfileController],
        exports: [staff_profile_service_1.StaffProfileService]
    })
], StaffProfileModule);
//# sourceMappingURL=staff-profile.module.js.map