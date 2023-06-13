import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
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
    async getGamesByUsername(@Param() params: any,  @Query('page') page?: string, @Query('pageSize') pageSize?: string): Promise<SavedGameData[]> {
        let gameArray: SavedGameData[] = [];
        (await this.savedGameService.getSavedGamesByUsername(params.username, page, parseInt(pageSize))).forEach(savedGame =>{
            gameArray.push(Convert.createSavedGameData(savedGame));
        });
        return gameArray;
    }

    @Get('user/:username/count')
    async getGameCountByUsername(@Param() params: any): Promise<number> {
        return this.savedGameService.getGameCountByUsername(params.username);
    }

    @Get(':id/user/:username')
    async getGameByUsername(@Param() params: any): Promise<SavedGameData> {
        return Convert.createSavedGameData(await this.savedGameService.getSavedGameByUsername(params.id, params.username));
    }

    @Delete('id/:id')
    async deleteGame(@Param() params: any): Promise<any> {
        await this.savedGameService.deleteSavedGame(params.id);
    }
}
