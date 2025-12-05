import { IsEmail, IsEnum, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { ClinicUserRole } from '../../clinic-user-role/entities/clinic-user-role.entity';
import { UserStatus } from '../entities/user.entity';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  // status usado apenas para owners no fluxo A2
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  // lista de roles (opcional)
  @IsOptional()
  clinicRoles?: ClinicUserRole[];
}
