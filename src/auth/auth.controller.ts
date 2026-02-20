import { AuthService } from '@/auth/auth.service';
import { LoginDto } from '@/auth/dto/login.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { RegisterUserDto } from '@/users/dto/register-user.dto';
import { User } from '@/users/entities/user.entity';
import { ApiResponse } from '@/utils/responses/ApiResponse';
import { VerificationCodeService } from '@/verification-code/verification-code.service';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private verificationCodeService: VerificationCodeService,
    ) { }

    @Post('register')
    async register(@Body() body: RegisterUserDto) {
        const data = await this.authService.register(body)
        const response: ApiResponse = {
            message: 'Owner registrado com sucesso',
            data: data,
            status: 200
        }
        return response
    }

    @Post('login')
    async login(@Body() body: LoginDto) {
        const data = await this.authService.login(body);
        const response: ApiResponse = {
            message: 'Login realizado com sucesso!',
            data: data,
            status: 200
        }
        return response
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getProfile(@Req() req) {
        return req.user;
    }

    @UseGuards(JwtAuthGuard)
    @Post('verify-email-verification-code')
    async verifyEmail(
        @CurrentUser() user: User,
        @Body() body: { code: string },
    ) {
        const data = await this.authService.verifyUserEmail(user.id, body.code);
        const response: ApiResponse = {
            message: 'Email verificado com sucesso!',
            data: data,
            status: 200
        }
        return response;
    }

    @UseGuards(JwtAuthGuard)
    @Post('resend-email-verification-code')
    async regenerateVerificationEmail(
        @CurrentUser() user: User,
    ) {
        const data = await this.authService.resendVerificationCode(user.id);
        const response: ApiResponse = {
            message: 'Código de verificação reenviado com sucesso!',
            data: data,
            status: 200
        }
        return response;
    }

}
