import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

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

    async login(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user) throw new UnauthorizedException('User not found');

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new UnauthorizedException('Invalid password');

        const payload = { sub: user.id, role: user.role };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
