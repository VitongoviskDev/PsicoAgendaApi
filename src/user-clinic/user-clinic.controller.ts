import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserClinicService } from './user-clinic.service';
import { CreateUserClinicDto } from './dto/create-user-clinic.dto';
import { UpdateUserClinicDto } from './dto/update-user-clinic.dto';

@Controller('user-clinic')
export class UserClinicController {
  constructor(private readonly userClinicService: UserClinicService) {}

  @Post()
  create(@Body() createUserClinicDto: CreateUserClinicDto) {
    return this.userClinicService.create(createUserClinicDto);
  }

  @Get()
  findAll() {
    return this.userClinicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userClinicService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserClinicDto: UpdateUserClinicDto) {
    return this.userClinicService.update(+id, updateUserClinicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userClinicService.remove(+id);
  }
}
