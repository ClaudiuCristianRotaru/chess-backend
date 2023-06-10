import { UserData } from "src/user/user.interface";

export interface GameData {
    id: string;
    black_player: UserData;
    white_player: UserData;
    result: string;
    FENS: string;
    chat_logs: string;
    date: Date;
    whiteRating: number;
    blackRating: number;
}
