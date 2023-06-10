import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
          //TODO: change and hide later
            JwtModule.register({
              global: true,
              secret: "GThHMftB4wc9d9ZO4pwbX4D9nmpBbGMnpxQk5sPHOZ7CqjgReORZvNB1sltC1BjJFNCgd2p4PCu74oj0X1rFlRhOQV5d34AyMPa8FYG4AD7H2Z3BO0zYKi9MZ7pCrXPTzDKXZTSdgsdXR00w7CvwDUKMUu02b0TToXLYeev5m7wn7ugYCnyPmYGzKgfibfROFvqetWAL",
            })],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
