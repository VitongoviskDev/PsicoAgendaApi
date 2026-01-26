import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        // private readonly dataSource: DataSource,

        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) { }

    async findById(id: User['id']) {
        return this.userRepo.findOneBy({ id: id });
    }

    async findByEmail(email: string) {
        return this.userRepo.findOneBy({ email: email });;
    }
}
