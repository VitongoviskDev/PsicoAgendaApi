import { Controller, Post, Body, UseGuards, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ClinicsService } from '@/clinics/clinics.service';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { ApiResponse } from '@/utils/responses/ApiResponse';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Express } from 'express';
import { CompleteClinicDto } from '@/clinics/dto/complete-clinic.dto';
import { CurrentClinic } from '@/common/decorators/current-clinic.decorator';

@Controller('clinics')
export class ClinicsController {
    constructor(
        private readonly clinicService: ClinicsService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('picture'))
    @Post('complete-clinic')
    async completeClinic(
        @CurrentClinic() clinicId: string,
        @UploadedFile() file: Express.Multer.File,
        @Body() dto: CompleteClinicDto,
    ) {
        const data = await this.clinicService.completeClinic(clinicId, dto, file);
        const response: ApiResponse = {
            message: 'Clinica atualizada com sucesso!',
            data: data,
            status: 200
        }
        return response
    }
}
