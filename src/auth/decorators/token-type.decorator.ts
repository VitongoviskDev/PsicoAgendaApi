import { SetMetadata } from '@nestjs/common';

export type TokenType = 'onboarding' | 'access';

export const TOKEN_TYPE_KEY = 'tokenType';
export const RequiredTokenType = (type: TokenType) => SetMetadata(TOKEN_TYPE_KEY, type);
