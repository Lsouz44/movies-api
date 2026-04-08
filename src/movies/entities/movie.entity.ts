import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Movie {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column({ type: 'varchar', nullable: false })
    title: string | undefined;

    @Column({ type: 'text', nullable: false })
    description: string | undefined;

    @Column({ type: 'float', nullable: false })
    rating: number | undefined;

    @ManyToOne(() => User, user => user.movies, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'fk_user' })
    user: User | undefined;
}
