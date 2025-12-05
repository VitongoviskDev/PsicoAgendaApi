import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clinic } from './entities/clinic.entity';
import { Repository } from 'typeorm';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { ClinicUserRole } from '../clinic-user-role/entities/clinic-user-role.entity';
import { ClinicRole } from '../clinic-user-role/entities/clinic-user-role.entity';
import { UsersService } from '../users/users.service';
import { ClinicsRepository } from './clinics.repository';
import { ClinicUserRoleRepository } from 'src/clinic-user-role/clinic-user-role.repository';

@Injectable()
export class ClinicsService {
  constructor(

    // @InjectRepository(Clinic)
    // private clinicRepo: Repository<Clinic>,
    private clinicRepo: ClinicsRepository,
    
    // @InjectRepository(ClinicUserRole)
    // private clinicUserRoleRepo: Repository<ClinicUserRole>,
    private clinicUserRoleRepo: ClinicUserRoleRepository,

    private usersService: UsersService,
  ) { }

  async createClinic(dto: CreateClinicDto, ownerId: string) {
    const user = await this.usersService.findById(ownerId);
    if (!user) throw new NotFoundException('Usuário não encontrado');

    // 1. Criar clínica
    const clinic = this.clinicRepo.create(dto);
    await this.clinicRepo.save(clinic);

    // 2. Criar vínculo OWNER
    const ownerRole = this.clinicUserRoleRepo.create({
      user,
      clinic,
      role: ClinicRole.OWNER,
    });

    await this.clinicUserRoleRepo.save(ownerRole);

    return clinic;
  }
}
