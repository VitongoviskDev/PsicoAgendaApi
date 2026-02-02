import { BadRequestException, ConflictException, ForbiddenException, GoneException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { VERIFICATION_CODE_STATUS, VERIFICATION_CODE_TYPE_ENUM, VerificationCode, VerificationCodeType } from './entities/verification-code.entity';
import { User } from '@/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { ConfigService } from '@nestjs/config';

const VALID_LETTERS = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
const VALID_NUMBERS = '23456789';
const REGENERATE_COOLDOWN_MS = 60 * 1000;
const EMAIL_VERIFICATION_CODE_TYPE = 'char-number';

@Injectable()
export class VerificationCodeService {

    private readonly emailExpirationInMinutes: number
    private readonly emailVerificationCodeLength: number

    constructor(
        @InjectRepository(VerificationCode)
        private readonly verificationCodeRepo: Repository<VerificationCode>,


        private readonly configService: ConfigService,
    ) {
        this.emailExpirationInMinutes =
            this.configService.getOrThrow<number>(
                'EMAIL_VERIFICATION_CODE_EXPIRATION_IN_MINUTES',
            )

        this.emailVerificationCodeLength =
            this.configService.getOrThrow<number>(
                'EMAIL_VERIFICATION_CODE_LENGTH',
            )

    }

    async generateEmailVerificationCode(
        userId: string
    ) {

        const canRegenerate = await this.canGenerateCode({ userId, type: VERIFICATION_CODE_TYPE_ENUM.EMAIL })

        if (!canRegenerate.regenerate) {
            throw new BadRequestException(
                `Aguarde ${Math.ceil(canRegenerate.timeLeft / 1000)} segundos antes de reenviar o código`,
            )
        }

        await this.verificationCodeRepo.update(
            {
                userId: userId,
                type: VERIFICATION_CODE_TYPE_ENUM.EMAIL,
                status: VERIFICATION_CODE_STATUS.ACTIVE,
            },
            {
                status: VERIFICATION_CODE_STATUS.CANCELLED,
            },
        )

        const code = this.generateCode(this.emailVerificationCodeLength, EMAIL_VERIFICATION_CODE_TYPE);
        const codeHash = await bcrypt.hash(code, 10);

        const expiresAt = new Date(
            Date.now() + this.emailExpirationInMinutes * 60 * 1000,
        )

        const verificationCode = this.verificationCodeRepo.create({
            userId: userId,
            type: VERIFICATION_CODE_TYPE_ENUM.EMAIL,
            codeHash,
            expiresAt,
            status: VERIFICATION_CODE_STATUS.ACTIVE,
        })

        this.verificationCodeRepo.save(verificationCode)

        return {
            can: canRegenerate,
            code,
            expiresAt: verificationCode.expiresAt,
        };
    }

    private async canGenerateCode(params: { userId: User['id'], type: VerificationCodeType }) {
        const lastCode = await this.verificationCodeRepo.findOne({
            where: {
                userId: params.userId,
                type: params.type,
                status: VERIFICATION_CODE_STATUS.ACTIVE,
            },
            order: {
                createdAt: 'DESC',
            },
        });

        if (!lastCode) {
            return {
                regenerate: true,
                timeLeft: 0
            };
        }

        const now = new Date();
        const timeSinceLastCode = now.getTime() - lastCode.createdAt.getTime();
        return {
            timeSinceLastCode: timeSinceLastCode,
            regenerate: timeSinceLastCode >= REGENERATE_COOLDOWN_MS,
            timeLeft: Math.max(0, REGENERATE_COOLDOWN_MS - timeSinceLastCode),
        };
    }

    async verifyUserEmail(user_id: User['id'], code: string) {
        const record = await this.verificationCodeRepo.findOne({
            where: {
                userId: user_id,
                type: VERIFICATION_CODE_TYPE_ENUM.EMAIL,
                status: VERIFICATION_CODE_STATUS.ACTIVE,
            },
        });

        if (!record) {
            throw new NotFoundException('Nenhum código de verificação encontrado.');
        }

        if (record.verified_at) {
            throw new ConflictException('Código de já foi utilizado.');
        }

        const isCodeValid = await bcrypt.compare(code, record.codeHash);

        if (!isCodeValid) {
            throw new BadRequestException('Código de verificação inválido.');
        }

        if (record.expiresAt < new Date()) {
            record.status = VERIFICATION_CODE_STATUS.EXPIRED;
            await this.verificationCodeRepo.save(record);
            throw new GoneException('Código de verificação expirado! Por favor, solicite um novo código.');
        }

        record.verified_at = new Date();
        record.status = VERIFICATION_CODE_STATUS.USED;
        await this.verificationCodeRepo.save(record);
    }

    private generateCode(length: number, type: 'char-number' | 'chat-only' | 'number-only' = 'char-number'): string {
        let code = ''
        const validChars = type === 'char-number' ? VALID_LETTERS + VALID_NUMBERS : type === 'chat-only' ? VALID_LETTERS : VALID_NUMBERS;

        for (let i = 0; i < length; i++) {
            code += validChars.charAt(Math.floor(Math.random() * validChars.length))
        }

        return code
    }
}
