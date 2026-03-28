import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ) {}

    async create(data: CreateUserDto){
        const hash = await bcrypt.hash(data.password, 10);

        const user = this.usersRepository.create({
            ...data,
            password: hash,
        })

        return this.usersRepository.save(user)
    }

    async findByEmail(email: string) {
        return await this.usersRepository.findOne({ where: { email } });
    }

    async findOne(id: number) {
        const data = await this.usersRepository.findOneBy({ id });

        return {
            name: data?.name,
            email: data?.email,
            avatar: data?.avatar,
        }
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        return await this.usersRepository.update({ id }, updateUserDto);
    }

    async updatePassword(id: number, dto: UpdatePasswordDto) {
        const user = await this.usersRepository.findOneBy({ id });

        if(!user) {
            throw new NotFoundException('Usuário não encontrado');
        }

        const passwordMatch = await bcrypt.compare(
            dto.currentPassword,
            user.password
        )

        if (!passwordMatch) {
            throw new UnauthorizedException('Senha atual incorreta');
        }

        const newHashedPassword = await bcrypt.hash(dto.newPassword, 10)

        await this.usersRepository.update(id, {
            password: newHashedPassword,
        })
    }

    async updateProfileAvatar(userId: number, filename: string) {
        await this.usersRepository.update(userId, {
            avatar: filename,
        })

        return { message: 'Imagem atualizado com sucesso' };
    }
}
