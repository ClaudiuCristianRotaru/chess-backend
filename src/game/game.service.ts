import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game, User } from 'src/typeorm';
import { Repository } from 'typeorm';
import { CreateGameDto } from './dto/game-create.dto';
import { UserService } from 'src/user/user.service';
import { isUUID } from 'class-validator';

@Injectable()
export class GameService {

    constructor(@InjectRepository(Game) private readonly gameRepository: Repository<Game>,
        private userService: UserService) { }

    async getAllGames(query: string): Promise<Game[]> {
        try {
            let orderField = "gameDate";
            let order: "ASC" | "DESC" = "DESC";
            if (query) {
                let queryArray = query.split(":");
                orderField = queryArray[0];
                order = queryArray[1] == "asc" ? "ASC" : "DESC";
            }
            return await this.gameRepository
                .createQueryBuilder("game")
                .innerJoinAndSelect("game.white_user", "white")
                .innerJoinAndSelect("game.black_user", "black")
                .orderBy(`game.${orderField}`, order)
                .getMany();
        }
        catch (err) {
            console.error(err);
            return [];
        }
    }

    async getGamesByUserId(id: string): Promise<Game[]> {
        if(!isUUID(id)) return null;
        return await this.gameRepository.find(
            {
                where: [
                    { white_user: { id: id } },
                    { black_user: { id: id } }
                ], order: { gameDate: 'DESC' },
            })
    }

    
    async getGameById(id: string): Promise<Game> {
        if(!isUUID(id)) return null;
        return await this.gameRepository.findOneBy({ id: id });
    }

    async getGamesByUsername(username: string, query: string): Promise<Game[]> {
        return await this.gameRepository.find(
            {
                where: [
                    { white_user: { username: username } },
                    { black_user: { username: username } }
                ], order: { gameDate: 'DESC' },
                skip: parseInt(query)*5,
                take: 5
            })
    }

    async getGameCountByUsername(username: string): Promise<number> {
        return await this.gameRepository.count(
            {
                where: [
                    { white_user: { username: username } },
                    { black_user: { username: username } }
                ],
        })
    }

    async create(createGameDto: CreateGameDto): Promise<Game> {
        console.log(createGameDto);
        let whitePlayer: User = await this.userService.getPlayerById(createGameDto.white_id);
        let blackPlayer: User = await this.userService.getPlayerById(createGameDto.black_id);
        let newGame = this.gameRepository.create({
            id: createGameDto.id,
            result: createGameDto.result,
            FENS: createGameDto.FENS,
            chat_logs: createGameDto.chat_logs,
            white_user: whitePlayer,
            black_user: blackPlayer,
            whiteRating: whitePlayer.rating,
            blackRating: blackPlayer.rating,
            gameDate: new Date(Date.now())
        });
        return this.gameRepository.save(newGame);
    }
}
