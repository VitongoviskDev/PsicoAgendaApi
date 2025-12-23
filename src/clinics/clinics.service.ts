import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { RegisterClinicDto } from './dto/register-clinic.dto';
import { Clinic, ClinicStatus } from './entity/clinic.entity';
import { CompleteClinicDto } from './dto/complete-clinic.dto';
import type { Express } from 'express';
import { ClinicWorkingHours } from '../clinic-working-hours/entity/clinic-working-hours.entity';

@Injectable()
export class ClinicsService {
  constructor(
    private readonly dataSource: DataSource,

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

  async completeClinic(
    clinicId: string,
    dto: CompleteClinicDto,
    file?: Express.Multer.File,
  ) {
    return this.dataSource.transaction(async manager => {

      const clinic = await manager.findOne(Clinic, {
        where: { id: clinicId },
        relations: ['workingHours'],
      });

      if (!clinic) {
        throw new NotFoundException('Clinica nao encontrada');
      }

      // ===============================
      // Atualiza dados básicos da clínica
      // ===============================
      clinic.name = dto.name;
      clinic.description = dto.description;
      clinic.openedAt = dto.openedAt;
      clinic.status = ClinicStatus.ACTIVE;

      // ===============================
      // SYNC dos Working Hours (idempotente)
      // ===============================

      const existingHours = clinic.workingHours ?? [];

      // Map dos dias que vieram no payload
      const incomingMap = new Map(
        dto.workingHours.map(wh => [wh.dayOfWeek, wh]),
      );

      const updatedHours: ClinicWorkingHours[] = [];

      // Atualiza os existentes
      for (const existing of existingHours) {
        const incoming = incomingMap.get(existing.dayOfWeek);

        if (incoming) {
          existing.openAt = incoming.openAt;
          existing.closeAt = incoming.closeAt;

          updatedHours.push(existing);
          incomingMap.delete(existing.dayOfWeek);
        }
      }

      // Cria novos dias (os que não existiam)
      for (const incoming of incomingMap.values()) {
        const newHour = manager.create(ClinicWorkingHours, {
          dayOfWeek: incoming.dayOfWeek,
          openAt: incoming.openAt,
          closeAt: incoming.closeAt,
          clinic: clinic,
        });

        updatedHours.push(newHour);
      }

      // Remove dias que não vieram no payload
      const daysToKeep = updatedHours.map(h => h.dayOfWeek);

      const toRemove = existingHours.filter(
        h => !daysToKeep.includes(h.dayOfWeek),
      );

      if (toRemove.length) {
        await manager.remove(ClinicWorkingHours, toRemove);
      }

      clinic.workingHours = updatedHours;

      // ===============================
      // Salva tudo
      // ===============================
      await manager.save(Clinic, clinic);

      return {
        clinic,
      };
    });
  }
}
