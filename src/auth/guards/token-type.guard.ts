import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TOKEN_TYPE_KEY, TokenType } from '../decorators/token-type.decorator';

@Injectable()
export class TokenTypeGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredTokenType = this.reflector.getAllAndOverride<TokenType>(TOKEN_TYPE_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredTokenType) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();

        if (!user || user.tokenType !== requiredTokenType) {
            throw new ForbiddenException(`This route requires an ${requiredTokenType} token`);
        }

        return true;
    }
}
