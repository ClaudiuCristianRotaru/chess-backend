export class CreateGameDto {
    id?: string;
    white_id: string;
    black_id: string;
    result: string;
    FENS: string;
    chatLogs: string;
  }