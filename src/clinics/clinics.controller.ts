import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ClinicsService } from './clinics.service';
import { RegisterClinicDto } from './dto/register-clinic.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiResponse } from '../responses/ApiResponse';

@Controller('clinics')
export class ClinicsController {}
