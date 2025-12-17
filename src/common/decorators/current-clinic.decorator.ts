import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentClinic = createParamDecorator(
    (_: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();

        // opção 1: via JWT
        if (request.user?.clinicId) {
            return request.user.clinicId;
        }

        // opção 2: via header
        if (request.headers['x-clinic-id']) {
            return request.headers['x-clinic-id'];
        }

        // fallback: lastClinicId
        if (request.user?.lastClinicId) {
            return request.user.lastClinicId;
        }

        return null;
    },
);
