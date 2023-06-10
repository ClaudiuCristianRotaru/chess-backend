import { Column, Entity, Generated, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { SavedGame } from './saved-games.entity';
@Entity()
export class Game {
  @PrimaryGeneratedColumn('uuid',{
    name: 'game_id',
  })
  @Generated('uuid')
  id: string;

  @Column({
    nullable: false,
    default: '',
  })
  result: string;

  @Column({
    nullable: false,
    default: '',
  })
  FENS: string;

  @Column({
    default: '',
  })
  chat_logs: string;

  @Column({
    name: "game_date",
    nullable: false,
    type: 'timestamptz',
  })
  gameDate: Date;

  @Column({
    name: "white_rating",
    nullable:true
  })
  whiteRating: number;

  @Column({
    name: "black_rating",
    nullable:true
  })
  blackRating: number;

  @ManyToOne(type => User, user => user.whitegames, {nullable: false, eager: true})
  white_user:User

  @ManyToOne(type=> User, user => user.blackgames, {nullable: false, eager: true})
  black_user:User

  @OneToMany(type=> SavedGame, savedGame => savedGame.game)
  savedgame:SavedGame

}