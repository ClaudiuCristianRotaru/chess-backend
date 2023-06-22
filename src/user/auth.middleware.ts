import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService, private jwtService: JwtService) { }

  async use(req: Request & any, res: any, next: () => void) {
    try {
      const authHeaders = req.headers.authorization;
      if (authHeaders && (authHeaders as string).split(' ')[1]) {
        const token = (authHeaders as string).split(' ')[1];
        const decoded: any = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });

        const user = await this.userService.getPlayerById(decoded.userId);
        if (!user) {
          throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
        }

        next();

      } else {
        throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
      }

    } catch (err) {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
  }
}

