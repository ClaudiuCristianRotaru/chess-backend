import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GameService } from 'src/game/game.service';
import { Game, SavedGame, User } from 'src/typeorm';
import { UserService } from 'src/user/user.service';
import { CreateSavedGameDto } from './dto/saved-game-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SavedGameService {

    constructor(
        @InjectRepository(SavedGame) private readonly savedGameRepository: Repository<SavedGame>,
        private userService : UserService,
        private gameService: GameService) {}

    async create(createSavedGameDto: CreateSavedGameDto) : Promise<SavedGame> {
        let user: User = await this.userService.getPlayerByName(createSavedGameDto.username);
        if(!user){
            throw new HttpException({
                error: 'Not Found.',
                message: ["User not found"],
            }, HttpStatus.NOT_FOUND);
        }
        let game: Game = await this.gameService.getGameById(createSavedGameDto.game_id);
        if(!game) {
            throw new HttpException({
                error: 'Not Found.',
                message: ["Game not found"],
            }, HttpStatus.NOT_FOUND);
        }
        let newSavedGame = this.savedGameRepository.create({
            user:user,
            game:game,
            note: createSavedGameDto.note
        });
        return this.savedGameRepository.save(newSavedGame);
    }

    async getSavedGamesByUsername(username: string, query: string): Promise<SavedGame[]> {
        return await this.savedGameRepository.find(
            {
                where: [
                    { user: { username: username } },
                ],
                skip: parseInt(query)*5,
                take: 5
            })
    }

    async getGameCountByUsername(username: string): Promise<number> {
        return await this.savedGameRepository.count(
            {
                where: [
                    { user: { username: username } },
                ],
        })
    }
}
