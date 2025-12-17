import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { RegisterClinicDto } from './dto/register-clinic.dto';
import { Clinic, ClinicStatus } from './entity/clinic.entity';

@Injectable()
export class ClinicsService {
  constructor(

    @InjectRepository(Clinic)
    private readonly clinicRepo: Repository<Clinic>,
  ) { }

  async createDefaultClinic() {
    // 1. Criar clínica
    const clinic = this.clinicRepo.create({
      name: "Minha Clinica",
      status: ClinicStatus.PENDING_SETUP
    });
    await this.clinicRepo.save(clinic);

    return clinic;
  }

  findById(id: string) {
    return this.clinicRepo.findOne({ where: { id } });
  }

  async update(id: string, data: Partial<Clinic>) {
    await this.clinicRepo.update(id, data);
    return this.findById(id);
  }
}
