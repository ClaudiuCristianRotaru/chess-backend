import { UserData } from "src/user/user.interface";

export interface GameData {
    id: string;
    blackPlayer: UserData;
    whitePlayer: UserData;
    result: string;
    FENS: string;
    chatLogs: string;
    date: Date;
    whiteRating: number;
    blackRating: number;
}

