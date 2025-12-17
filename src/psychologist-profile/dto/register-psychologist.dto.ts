import { IsNotEmpty } from 'class-validator';

export class RegisterPsychologistDto {
  @IsNotEmpty()
  crp: string;
}
