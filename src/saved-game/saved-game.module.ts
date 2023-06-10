import { Module } from '@nestjs/common';
import { SavedGameController } from './saved-game.controller';
import { SavedGameService } from './saved-game.service';
import { GameModule } from 'src/game/game.module';
import { UserModule } from 'src/user/user.module';
import { SavedGame } from 'src/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SavedGame]), GameModule, UserModule],
  controllers: [SavedGameController],
  providers: [SavedGameService]
})
export class SavedGameModule {}
