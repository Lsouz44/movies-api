import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createMovieDto: CreateMovieDto,
    @Req() req,
  ) {
    return this.moviesService.create(createMovieDto, req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Req() req) {
    return this.moviesService.findAll(req.user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Req() req, @Param('id') id: string) {
    return this.moviesService.findOne(+id, req.user.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Req() req, @Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(+id, updateMovieDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Req() req, @Param('id') id: string) {
    return this.moviesService.remove(+id, req.user.id);
  }
}
