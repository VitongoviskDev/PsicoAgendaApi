import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User, USER_STATUS_ENUM } from './entities/user.entity';
import { CompleteUserProfileDto } from './dto/complete-user-profile.dto';
import { PsychologistProfile } from '@/psychologist-profile/entities/psychologist-profile.entity';

@Injectable()
export class UsersService {
    constructor(
        private readonly dataSource: DataSource,

        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) { }

    async findById(id: User['id']) {
        return this.userRepo.findOneBy({ id: id });
    }

    async findByEmail(email: string) {
        return this.userRepo.findOneBy({ email: email });;
    }

    async updateStatus(id: User['id'], status: User['status']) {
        return this.userRepo.update({ id: id }, { status: status });
    }

    async completeUserProfile(id: User['id'], body: CompleteUserProfileDto) {
        const { isPsychologist, crp, ...userData } = body;

        return this.dataSource.transaction(async (manager) => {

            const existingUser = await manager.findOne(User, {
                where: { cpf: body.cpf },
            });

            if (existingUser) {
                throw new ConflictException('CPF já está em uso.');
            }

            const psychologist = isPsychologist ? await manager.create(PsychologistProfile, {
                user_id: id,
                crp: crp,
            }) : null;

            if (!!psychologist) {
                await manager.save(psychologist);
            }

            await manager.update(User, { id: id }, {
                ...userData,
            });
            const updatedUser = await manager.findOneBy(User, { id });

            return {
                user: updatedUser,
                profiles: {
                    psychologist: psychologist
                }
            };
        });
    }
}
