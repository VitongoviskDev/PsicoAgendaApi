import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {
    super(repo.target, repo.manager, repo.queryRunner)
  }

}
