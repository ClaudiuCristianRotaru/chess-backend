import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from 'src/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Game]),
            JwtModule.register({
              global: true,
              secret: "GThHMftB4wc9d9ZO4pwbX4D9nmpBbGMnpxQk5sPHOZ7CqjgReORZvNB1sltC1BjJFNCgd2p4PCu74oj0X1rFlRhOQV5d34AyMPa8FYG4AD7H2Z3BO0zYKi9MZ7pCrXPTzDKXZTSdgsdXR00w7CvwDUKMUu02b0TToXLYeev5m7wn7ugYCnyPmYGzKgfibfROFvqetWAL",
            }), UserModule],
  controllers: [GameController],
  providers: [GameService],
  exports: [GameService]
})
export class GameModule {}
