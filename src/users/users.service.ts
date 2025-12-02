import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(private usersRepo: UsersRepository) { }

    getUsers() {
        return this.usersRepo.findAll();
    }

    create(data: CreateUserDto) {
        return this.usersRepo.createUser(data);
    }

    findByEmail(email: string) {
        return this.usersRepo.findByEmail(email);
    }
}
