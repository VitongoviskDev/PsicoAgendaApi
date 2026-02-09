import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CompleteUserProfileDto } from './dto/complete-user-profile.dto';
import { UsersService } from './users.service';
import { ApiResponse } from '@/utils/responses/ApiResponse';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post('complete-profile')
    async register(
        @CurrentUser() user: User,
        @Body() body: CompleteUserProfileDto) {
        const data = await this.userService.completeUserProfile(user.id, body)
        const response: ApiResponse = {
            message: 'Perfil atualizado com sucesso',
            data: data,
            status: 200
        }
        return response
    }
}
