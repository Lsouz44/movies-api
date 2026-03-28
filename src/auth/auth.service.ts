import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}
    
    async login(loginDto: LoginDto) {
        const user = await this.usersService.findByEmail(loginDto.email);

        if (!user) throw new BadRequestException('Não existe um cadastro com esse email');

        const valid = await bcrypt.compare(loginDto.password, user.password);

        if (!valid) throw new UnauthorizedException('Senha inválida');

        return {
            access_token: this.jwtService.sign({ sub: user.id }),
            name: user?.name,
            email: user?.email,
            avatar: user?.avatar,
        }
    }
}
