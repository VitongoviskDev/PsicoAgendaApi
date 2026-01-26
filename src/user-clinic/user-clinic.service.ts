import { Injectable } from '@nestjs/common';
import { CreateUserClinicDto } from './dto/create-user-clinic.dto';
import { UpdateUserClinicDto } from './dto/update-user-clinic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserClinic } from './entities/user-clinic.entity';

@Injectable()
export class UserClinicService {
  constructor(
    // private readonly dataSource: DataSource,

    @InjectRepository(UserClinic)
    private readonly userClinicRepo: Repository<UserClinic>,
  ) { }

  create(createUserClinicDto: CreateUserClinicDto) {
    return 'This action adds a new userClinic';
  }

  findAll() {
    return `This action returns all userClinic`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userClinic`;
  }

  update(id: number, updateUserClinicDto: UpdateUserClinicDto) {
    return `This action updates a #${id} userClinic`;
  }

  remove(id: number) {
    return `This action removes a #${id} userClinic`;
  }

  findByUserAndClinic(userId: string, clinicId: string) {
    return this.userClinicRepo.findOne({
      where: { user: { id: userId }, clinic: { id: clinicId } },
    });
  }
}