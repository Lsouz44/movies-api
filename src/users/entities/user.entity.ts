import { Movie } from "src/movies/entities/movie.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column({ type: 'varchar', nullable: false })
    name: string | undefined;

    @Column({ type: 'varchar', unique: true, nullable: false })
    email: string | undefined;

    @Column({ type: 'varchar', nullable: false })
    password: string | undefined;

    @Column({ type: 'varchar', nullable: true })
    avatar: string | undefined;

    @OneToMany(() => Movie, movie => movie.user)
    movies: Movie[] | undefined;
}