import { GameData } from "src/game/game.interface";
import { UserData } from "src/user/user.interface";

export interface SavedGameData {
    id: string;
    note: string;
    game: GameData;
    user: UserData;
}

