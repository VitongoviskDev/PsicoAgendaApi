import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@/users/entities/user.entity';
import { ClinicStaff, StaffRole } from '@/clinic-staff/entity/clinic-staf.entity';
import { Clinic } from '@/clinics/entity/clinic.entity';

@Injectable()
export class ClinicStaffService {
    constructor(
        @InjectRepository(ClinicStaff)
        private readonly clinicStaffRepo: Repository<ClinicStaff>,

        @InjectRepository(Clinic)
        private readonly clinicRepo: Repository<Clinic>,

        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) { }

    async create(params: {
        userId: string;
        clinicId: string;
        role: StaffRole;
    }): Promise<ClinicStaff> {
        const { userId, clinicId, role } = params;

        // 1️⃣ Valida user
        const user = await this.userRepo.findOne({
            where: { id: userId },
        });

        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }

        // 2️⃣ Valida clinic
        const clinic = await this.clinicRepo.findOne({
            where: { id: clinicId },
        });

        if (!clinic) {
            throw new NotFoundException('Clínica não encontrada');
        }

        // 3️⃣ Verifica se já existe vínculo staff
        const existingStaff = await this.clinicStaffRepo.findOne({
            where: {
                user: { id: userId },
                clinic: { id: clinicId },
            },
        });

        if (existingStaff) {
            throw new ConflictException('Usuário já faz parte do staff desta clínica');
        }

        // 4️⃣ Cria vínculo
        const staff = this.clinicStaffRepo.create({
            user,
            clinic,
            role,
        });

        return this.clinicStaffRepo.save(staff);
    }

    async findByUser(params: { userId: string }) {
        const { userId } = params;

        return this.clinicStaffRepo.find({
            where: {
                user: { id: userId },
            },
            relations: {
                clinic: true,
            },
        });
    }

}
