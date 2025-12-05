import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RegisterOwnerDto } from './dto/register-owner.dto';
import { ResponseBuilder } from 'src/utils/ResponseBuilder';
import { ApiResponse } from 'src/responses/ApiResponse';

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
