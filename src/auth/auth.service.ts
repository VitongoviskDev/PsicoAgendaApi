import { Injectable, UnauthorizedException, ConflictException, ForbiddenException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterOwnerDto } from './dto/register-owner.dto';
import { UserStatus } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async registerOwner(dto: RegisterOwnerDto) {
        const exists = await this.usersService.findByEmail(dto.email);
        if (exists) {
            throw new ConflictException('E-mail já está em uso.');
        }

        const hashed = await bcrypt.hash(dto.password, 10);

        const user = await this.usersService.create({
            name: dto.name,
            email: dto.email,
            password: hashed,
            status: UserStatus.PRE_REGISTRATION,
        });

        return user;
    }

    async login(body: LoginDto) {
        const { email, password } = body;
        const user = await this.usersService.findByEmail(email);
        if (!user) throw new UnauthorizedException('invalid Credentials');

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new UnauthorizedException('invalid Credentials');

        // Se o OWNER não finalizou a clínica -> bloqueia login
        if (user.status === UserStatus.PRE_REGISTRATION) {
            throw new ForbiddenException(
                'Finalize o cadastro criando sua clínica antes de acessar.',
            );
        }

        const payload = { sub: user.id };

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                status: user.status,
            },
            access_token: this.jwtService.sign(payload),
        };
    }

}
