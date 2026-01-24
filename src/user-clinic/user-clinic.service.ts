import { Injectable } from '@nestjs/common';
import { CreateUserClinicDto } from './dto/create-user-clinic.dto';
import { UpdateUserClinicDto } from './dto/update-user-clinic.dto';

@Injectable()
export class UserClinicService {
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
}
