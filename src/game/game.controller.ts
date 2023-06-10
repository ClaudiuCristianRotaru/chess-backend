import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { GameService } from './game.service';
import { GameData } from './game.interface';
import { Game } from 'src/typeorm';
import { UserService } from 'src/user/user.service';
import { Convert } from 'src/convert-data';
import { map, of, pipe } from 'rxjs';
import { CreateGameDto } from './dto/game-create.dto';

@Controller('game')
export class GameController {
    constructor(
        private gameService : GameService
      ) {}
 

    @Get('games')
    async getAllGames(@Query('orderBy') query?: string): Promise<GameData[]> {
        let gameArray: GameData[] = [];
        (await this.gameService.getAllGames(query)).forEach(game =>{
            gameArray.push(Convert.createGameData(game));
        });
        return gameArray;
    }

    @Get(':id')
    async getGameById(@Param() params: any): Promise<GameData> {
        return Convert.createGameData(await this.gameService.getGameById(params.id))
    }

    @Get('id/:id')
    async getGamesByUserId(@Param() params: any): Promise<GameData[]> {
        let gameArray: GameData[] = [];
        (await this.gameService.getGamesByUserId(params.id)).forEach(game =>{
            gameArray.push(Convert.createGameData(game));
        });
        return gameArray;
    }

    @Get('user/:username')
    async getGamesByUsername(@Param() params: any, @Query('page') query?: string): Promise<GameData[]> {
        let gameArray: GameData[] = [];
        (await this.gameService.getGamesByUsername(params.username, query)).forEach(game =>{
            gameArray.push(Convert.createGameData(game));
        });
        return gameArray;
    }

    @Get('user/:username/count')
    async getGameCountByUsername(@Param() params: any): Promise<number> {
        return this.gameService.getGameCountByUsername(params.username);
    }

    @Post('')
    async addGame(@Body() createGameDto: CreateGameDto): Promise<GameData> {
        return Convert.createGameData(await this.gameService.create(createGameDto));
    }
}
