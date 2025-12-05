import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(private usersRepo: UsersRepository) { }

    findById(id: string) {
        return this.usersRepo.findOne({ where: { id } });
    }
    getUsers() {
        return this.usersRepo.find();
    }
    create(data: CreateUserDto) {
        const user = this.usersRepo.create(data);
        return this.usersRepo.save(user);
    }
    findByEmail(email: string) {
        return this.usersRepo.findOne({ where: { email } });
    }
}
