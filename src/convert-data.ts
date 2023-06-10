import { HttpException, HttpStatus } from "@nestjs/common";
import { Game, SavedGame, User } from "./typeorm";
import { GameData } from "./game/game.interface";
import { UserData } from "./user/user.interface";
import { SavedGameData } from "./saved-game/saved-game.interface";

export class Convert {
    static createUserData(user : User):UserData {
        if( !user ) throw new HttpException({
            error: 'Not Found.',
            message: ["User doesn't exist or has closed their account."],
        }, HttpStatus.NOT_FOUND);
        return {
            username: user.username,
            email: user.email,
            id: user.id,
            rating: user.rating,
            creationDate: user.creationDate
        }
    }

    static createGameData(game : Game): GameData {
        if( !game ) throw new HttpException({
            error: 'Not Found.',
            message: ["User doesn't exist or has closed their account."],
        }, HttpStatus.NOT_FOUND);
        return {
            id: game.id,
            black_player: this.createUserData(game.black_user),
            white_player: this.createUserData(game.white_user),
            result: game.result,
            FENS: game.FENS,
            chat_logs: game.chat_logs,
            date: game.gameDate,
            whiteRating: game.whiteRating,
            blackRating: game.blackRating
        }
    }

    static createSavedGameData(savedGame : SavedGame): SavedGameData {
        if( !savedGame ) throw new HttpException({
            error: 'Not Found.',
            message: ["Saved game not found"],
        }, HttpStatus.NOT_FOUND);
        return {
            id: savedGame.id,
            note: savedGame.note,
            game: this.createGameData(savedGame.game),
            user: this.createUserData(savedGame.user)
        }
    }
}