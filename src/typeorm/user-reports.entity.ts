import { Column, Entity, Generated, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Game } from './game.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid',{
    name: 'user_id',
  })

  id: string;

//   @OneToOne(type=> Game, game => game. )
//   game: Game;

//   @OneToOne(type=> Game, game =>  )
//    : Game[];
}