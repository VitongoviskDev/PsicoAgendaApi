import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';

export class RegisterOwnerDto {
    @ValidateNested()
    @Type(() => RegisterUserDto)
    user: RegisterUserDto;
}
