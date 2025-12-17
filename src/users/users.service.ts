import { Injectable } from '@nestjs/common';
import { User, UserStatus } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepo: Repository<User>,
    ) { }

    findAll() {
        return this.usersRepo.find();
    }

    findById(id: string) {
        return this.usersRepo.findOne({ where: { id } });
    }
    findByCpf(cpf: string) {
        return this.usersRepo.findOne({ where: { cpf } });
    }
    findByEmail(email: string) {
        return this.usersRepo.findOne({ where: { email } });
    }

    create(data: Partial<User>) {
        const user = this.usersRepo.create(data);
        return this.usersRepo.save(user);
    }

    async findByEmailWithProfiles(email: string) {
        return this.usersRepo.findOne({
            where: { email },
            relations: {
                staffProfile: true,
                psychologistProfile: true,
                patientProfile: true,
            },
        });
    }

    async updateStatus(id: string, status: UserStatus) {
        await this.usersRepo.update(id, { status });
    }

    async update(id: string, data: Partial<User>) {
        await this.usersRepo.update(id, data);
        return this.findById(id);
    }

    async setLastClinic(userId: string, clinicId: string | null) {
        await this.usersRepo.update(userId, { lastClinicId: clinicId });
        return this.findById(userId);
    }

}
