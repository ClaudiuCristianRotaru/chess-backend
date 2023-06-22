import { Column, Entity, Generated, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Game } from './game.entity';
import { SavedGame } from './saved-games.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid',{
    name: 'user_id',
  })
  @Generated('uuid')
  id: string;

  @Column({
    nullable: false,
    default: '',
  })
  username: string;

  @Column({
    name: 'email_address',
    nullable: false,
    default: '',
  })
  email: string;

  @Column({
    nullable: false,
    default: '',
  })
  password: string;

  @Column({
    nullable: false,
  })
  rating: number;

  @Column({
    name: "creation_date",
    nullable: false,
    type: 'timestamptz',
  })
  creationDate: Date;

  @Column({
    name: 'closed',
    nullable: false,
    default: false,
  })
  isClosed: boolean;

  @OneToMany(type=> Game, game => game.white_user )
  whitegames: Game[];

  @OneToMany(type=> Game, game => game.black_user )
  blackgames: Game[];

  @OneToMany(type=> SavedGame, savedGame => savedGame.user)
  savedgames: SavedGame[];
}