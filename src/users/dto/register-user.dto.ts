import { MatchValidator } from '@/common/validators/match.validator';
import { IsEmail, IsNotEmpty, MinLength, Validate } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  name: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @Validate(MatchValidator, ['password'])
  confirm_password: string;
}
