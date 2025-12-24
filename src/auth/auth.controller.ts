import { Body, Controller, Get, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { RegisterOwnerDto } from '@/auth/dto/register-owner.dto';
import { ApiResponse } from '@/utils/responses/ApiResponse';
import { LoginDto } from '@/auth/dto/login.dto';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register-owner')
    async registerOwner(@Body() dto: RegisterOwnerDto) {
        const data = await this.authService.registerOwner(dto)
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
}
