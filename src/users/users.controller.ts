import { Controller, Get, Post, Body, UseGuards, Patch, Req, ForbiddenException, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SwitchClinicDto } from './dto/switch-clinic.dto';
import { ClinicUserRoleService } from 'src/old/clinic-user-role/clinic-user-role.service';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly clinicUserRoleService: ClinicUserRoleService,
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
    @Patch('switch-clinic')
    async selectClinic(@Req() req, @Body() dto: SwitchClinicDto) {
        const userId = req.user.sub;
        const { clinicId } = dto;

        // valida que usuário pertence à clínica
        const hasAccess = await this.clinicUserRoleService.userHasAnyRole(userId, clinicId);
        if (!hasAccess) {
            throw new ForbiddenException('Você não tem acesso a essa clínica.');
        }

        // salvar
        await this.usersService.setLastClinic(userId, clinicId);

        return { message: 'Clínica selecionada.' };
    }
}
