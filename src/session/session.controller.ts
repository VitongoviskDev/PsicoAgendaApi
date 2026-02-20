import { Body, ConflictException, Controller, Get, Post } from '@nestjs/common';
import { SessionService } from './session.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { User } from '@/users/entities/user.entity';
import { ApiResponse } from '@/utils/responses/ApiResponse';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) { }

  @Post()
  async create(
    @CurrentUser() user: User,
    @Body() dto: CreateSessionDto,
  ) {
    if (!user.currentUserClinic) {
      throw new ConflictException('Clínica não selecionada');
    }
    const clinicId = user.currentUserClinic.clinic.id;

    const data = await this.sessionService.create(clinicId, user.id, dto);

    return {
      message: 'Sessão agendada com sucesso',
      data,
      status: 201,
    } as ApiResponse;
  }

  @Get()
  async findAll(@CurrentUser() user: User) {
    if (!user.currentUserClinic) {
      throw new ConflictException('Clínica não selecionada');
    }
    const clinicId = user.currentUserClinic.clinic.id;

    const data = await this.sessionService.findAllByClinic(clinicId);

    return {
      message: 'Sessões listadas com sucesso',
      data,
      status: 200,
    } as ApiResponse;
  }
}
