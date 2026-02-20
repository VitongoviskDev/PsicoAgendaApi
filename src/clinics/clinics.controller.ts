import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ClinicsService } from './clinics.service';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { User } from '@/users/entities/user.entity';
import { RegisterClinicDto } from './dto/register-clinic.dto';
import { ApiResponse } from '@/utils/responses/ApiResponse';

@Controller('clinics')
export class ClinicsController {
    constructor(
        private readonly clinicService: ClinicsService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async register(
        @CurrentUser() user: User,
        @Body() body: RegisterClinicDto) {
        const data = await this.clinicService.registerClinic(user.id, body)
        const response: ApiResponse = {
            message: 'Perfil atualizado com sucesso',
            data: data,
            status: 200
        }
        return response
    }
}