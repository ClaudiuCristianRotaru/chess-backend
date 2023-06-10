import { Game } from "./game.entity";
import { SavedGame } from "./saved-games.entity";
import { User } from "./user.entity";

const entities = [User, Game, SavedGame];

export {User, Game, SavedGame};
export default entities;