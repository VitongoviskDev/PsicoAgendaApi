import { AuthService } from '@/auth/auth.service';
import { LoginDto } from '@/auth/dto/login.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RegisterUserDto } from '@/users/dto/register-user.dto';
import { ApiResponse } from '@/utils/responses/ApiResponse';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

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
}
