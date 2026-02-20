import { ConflictException, Controller, Get, UseGuards } from '@nestjs/common';
import { PsychologistProfileService } from './psychologist-profile.service';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { User } from '@/users/entities/user.entity';
import { ApiResponse } from '@/utils/responses/ApiResponse';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('psychologist-profiles') // Pluralizing
export class PsychologistProfileController {
  constructor(private readonly psychologistProfileService: PsychologistProfileService) { }

  @Get()
  async findAll(@CurrentUser() user: User) {
    if (!user.currentUserClinic) {
      throw new ConflictException('Clínica não selecionada');
    }
    const clinicId = user.currentUserClinic.clinic.id;

    const data = await this.psychologistProfileService.findAllByClinic(clinicId);

    return {
      message: 'Psicólogos listados com sucesso',
      data,
      status: 200,
    } as ApiResponse;
  }
}
