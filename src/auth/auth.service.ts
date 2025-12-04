import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async register(data) {
        const hashed = await bcrypt.hash(data.password, 10);
        return this.usersService.create({
            ...data,
            password: hashed,
        });
    }

    async login(body: LoginDto) {
        const { email, password } = body;
        const user = await this.usersService.findByEmail(email);
        if (!user) throw new UnauthorizedException('User not found');

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new UnauthorizedException('Invalid password');

        const payload = { sub: user.id, role: user.role };

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                clinicId: user.clinicId,
            },
            access_token: this.jwtService.sign(payload),
        };
    }

}
