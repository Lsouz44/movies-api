import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createMovieDto: CreateMovieDto, userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId});

    const movie = this.moviesRepository.create({
      ...createMovieDto,
      user: {
        id: user?.id,
        name: user?.name,
        email: user?.email,
        avatar: user?.avatar,
      }
    })

    return await this.moviesRepository.save(movie);
  }

  async findAll(userId: number) {
    return await this.moviesRepository.find({
      where: { user: { id: userId}},
    });
  }

  async findOne(id: number, userId: number) {
    const movie = await this.moviesRepository.findOne({
      where: {
        id,
        user: { id: userId },
      }
    });

    if(!movie) throw new NotFoundException('Filme não encontrado!');

    return movie;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto, userId: number) {
    const movie = await this.findOne(id, userId);
    Object.assign(movie, updateMovieDto)
    await this.moviesRepository.save(movie);

    return `Filme atualizado com sucesso`;
  }

  async remove(id: number, userId: number) {
    const movie = await this.findOne(id, userId);
    await this.moviesRepository.remove(movie);
    return `Filme excluído com sucesso`;
  }
}
