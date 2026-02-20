import { Body, Controller, Get, Param, Post, UseGuards, ConflictException } from '@nestjs/common';
import { PatientProfileService } from './patient-profile.service';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { User } from '@/users/entities/user.entity';
import { RegisterPatientDto } from './dto/register-patient.dto';
import { ApiResponse } from '@/utils/responses/ApiResponse';

@Controller('patient-profiles')
@UseGuards(JwtAuthGuard)
export class PatientProfileController {
  constructor(private readonly patientProfileService: PatientProfileService) { }
  @Get()
  async findAll(@CurrentUser() user: User) {
    if (!user.currentUserClinic) {
      throw new ConflictException('Clínica não selecionada');
    }
    const clinicId = user.currentUserClinic.clinic.id;
    const data = await this.patientProfileService.findAllByClinic(clinicId);
    return {
      message: 'Pacientes listados com sucesso',
      data,
      status: 200,
    } as ApiResponse;
  }

  @Get(':id/overview')
  async overview(@CurrentUser() user: User, @Param('id') id: string) {
    if (!user.currentUserClinic) {
      throw new ConflictException('Clínica não selecionada');
    }
    const clinicId = user.currentUserClinic.clinic.id;
    const data = await this.patientProfileService.getOverview(clinicId, id);
    return {
      message: 'Pacientes listados com sucesso',
      data,
      status: 200,
    } as ApiResponse;
  }

  @Get('check/:cpf')
  async check(@CurrentUser() user: User, @Param('cpf') cpf: string) {
    if (!user.currentUserClinic) {
      throw new ConflictException('Clínica não selecionada');
    }
    const clinicId = user.currentUserClinic.clinic.id;
    const data = await this.patientProfileService.checkPatientByCpf(clinicId, cpf);
    return {
      message: 'Busca realizada com sucesso',
      data,
      status: 200,
    } as ApiResponse;
  }

  @Post()
  async register(@CurrentUser() user: User, @Body() dto: RegisterPatientDto) {
    if (!user.currentUserClinic) {
      throw new ConflictException('Clínica não selecionada');
    }
    const clinicId = user.currentUserClinic.clinic.id;
    const data = await this.patientProfileService.registerPatient(clinicId, dto);
    return {
      message: 'Paciente cadastrado com sucesso',
      data,
      status: 201,
    } as ApiResponse;
  }
}
