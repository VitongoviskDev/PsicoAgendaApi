"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentClinic = void 0;
const common_1 = require("@nestjs/common");
exports.CurrentClinic = (0, common_1.createParamDecorator)((_, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    if (request.user?.clinicId) {
        return request.user.clinicId;
    }
    if (request.headers['x-clinic-id']) {
        return request.headers['x-clinic-id'];
    }
    if (request.user?.lastClinicId) {
        return request.user.lastClinicId;
    }
    return null;
});
//# sourceMappingURL=current-clinic.decorator.js.map