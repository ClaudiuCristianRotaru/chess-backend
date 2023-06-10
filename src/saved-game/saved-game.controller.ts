import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Convert } from 'src/convert-data';
import { SavedGameService } from './saved-game.service';
import { SavedGameData } from './saved-game.interface';
import { CreateSavedGameDto } from './dto/saved-game-create.dto';

@Controller('saved-game')
export class SavedGameController {

    constructor(
        private savedGameService: SavedGameService
    ) { }

    @Post('')
    async addSavedGame(@Body() createSavedGameDto: CreateSavedGameDto): Promise<SavedGameData> {
        return Convert.createSavedGameData(await this.savedGameService.create(createSavedGameDto));
    }

    @Get('user/:username')
    async getGamesByUsername(@Param() params: any, @Query('page') query?: string): Promise<SavedGameData[]> {
        let gameArray: SavedGameData[] = [];
        (await this.savedGameService.getSavedGamesByUsername(params.username, query)).forEach(savedGame =>{
            gameArray.push(Convert.createSavedGameData(savedGame));
        });
        return gameArray;
    }

    @Get('user/:username/count')
    async getGameCountByUsername(@Param() params: any): Promise<number> {
        return this.savedGameService.getGameCountByUsername(params.username);
    }
}
