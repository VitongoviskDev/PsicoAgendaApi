import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ApiResponse } from 'src/responses/ApiResponse';
import { CompleteUserProfileDto } from './dto/complete-user-profile.dto';
import { UsersService } from './users.service';
import { CurrentClinic } from 'src/common/decorators/current-clinic.decorator';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) { }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get('cpf/:cpf')
    findByCpf(@Param('cpf') cpf: string) {
        return this.usersService.findByCpf(cpf);
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('profile_picture'))
    @Post('complete-profile/owner')
    async completeProfile(
        @CurrentUser() user,
        @UploadedFile() file: Express.Multer.File,
        @Body() dto: CompleteUserProfileDto,
    ) {
        const data = await this.usersService.completeProfile(user.id, user.lastClinicId, dto, file);
        const response: ApiResponse = {
            message: 'Perfil atualizado com sucesso!',
            data: data,
            status: 200
        }
        return response
    }
}
