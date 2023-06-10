import { Column, Entity, Generated, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Game } from './game.entity';
@Entity()
export class SavedGame {

  @PrimaryGeneratedColumn(
    { name: 'savedgame_id' }
  )
  id: string;

  @Column({
    nullable: true,
    default: '',
  })
  note: string;

  @ManyToOne(() => User, (user) => user.savedgames,{nullable: false, eager: true})
  @JoinColumn()
  user: User

  @ManyToOne(() => Game, (game) => game.savedgame,{nullable: false, eager: true})
  @JoinColumn()
  game: Game

}