import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PsychologistProfile } from './entities/psychologist-profile.entity';

@Injectable()
export class PsychologistProfileService {
    constructor(
        @InjectRepository(PsychologistProfile)
        private readonly psychologistProfileRepo: Repository<PsychologistProfile>,
    ) { }

    async findAllByClinic(clinicId: string) {
        const psychologists = await this.psychologistProfileRepo.find({
            where: {
                userClinics: {
                    clinic: { id: clinicId }
                }
            },
            relations: ['user'],
        });

        return {
            psychologists: psychologists.map((psychologist) => ({
                clinicId,
                id: psychologist.id,
                user: psychologist.user,
                email: psychologist.user.email,
                crp: psychologist.crp,
            }))
        }
    }
}
