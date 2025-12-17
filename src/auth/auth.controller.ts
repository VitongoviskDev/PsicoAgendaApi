import { Body, Controller, Get, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiResponse } from 'src/responses/ApiResponse';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterOwnerDto } from './dto/register-owner.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

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

    @UseGuards(JwtAuthGuard)
    @Post('complete-registration')
    @UseInterceptors(FileInterceptor('image'))
    async completeRegistration(
        @UploadedFile() image: Express.Multer.File,
        @Body() body: CompleteRegistrationDto,
        @Req() req
    ) {
        const data = await this.authService.completeRegistration(req.user.sub, {
            ...body,
            image
        });

        return {
            message: 'Cadastro finalizado com sucesso!',
            data,
            status: 200
        };
    }
}
