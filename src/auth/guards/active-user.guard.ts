import { USER_STATUS_ENUM } from "@/users/entities/user.entity";
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";

@Injectable()
export class ActiveUserGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (user.status !== USER_STATUS_ENUM.ACTIVE) {
            throw new ForbiddenException('Conta não ativada');
        }

        return true;
    }
}
