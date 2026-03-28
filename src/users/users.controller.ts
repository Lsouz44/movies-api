import { Controller, Post, Body, UseGuards, Get, Req, Patch, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService
    ) {}

    @Post('create')
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async findOne(@Req() req) {
        return await this.userService.findOne(req.user.id);
    }

    @Patch('edit')
    @UseGuards(JwtAuthGuard)
    async update(
        @Req() req,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        await this.userService.update(req.user.id, updateUserDto);

        return { message: 'Usuário atualizado com sucesso'};
    }

    @Patch('password')
    @UseGuards(JwtAuthGuard)
    async updatePassword(
        @Req() req,
        @Body() updatePasswordDto: UpdatePasswordDto,
    ) {
        await this.userService.updatePassword(req.user.id, updatePasswordDto);

        return { message: 'Senha atualizada com sucesso'};
    }

    @Patch('upload')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    const unique = Date.now() + '-' + file.originalname;
                    cb(null, unique);
                }
            })
        })
    )
    async uploadFile(
        @Req() req,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this.userService.updateProfileAvatar(req.user.id, file.filename);
    }
}
