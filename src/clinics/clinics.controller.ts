import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ClinicsService } from './clinics.service';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiResponse } from 'src/responses/ApiResponse';

@Controller('clinics')
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateClinicDto, @Req() req) {
    const userId = req.user.sub;

    const clinic = await this.clinicsService.createClinic(dto, userId);

    return {
      message: 'Clínica criada com sucesso.',
      data: clinic,
    } as ApiResponse;
  }
}
