import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { LoginUserDto } from 'src/user/dto/user-login.dto';
import { UserService } from './user.service';
import { RegisterUserDto } from 'src/user/dto/user-register.dto';
import { UserData } from './user.interface';
import { User } from 'src/typeorm';
import { Convert } from 'src/convert-data';
import { UpdateUserDto } from './dto/user-register.dto copy';

@Controller('user')
export class UserController {
    constructor(
        private userService : UserService
      ) {}

    @Get('users?')
    async getAllUsers(@Query('orderBy') query?: string): Promise<UserData[]> {
        let userArray: UserData[] = [];
        (await this.userService.getAllUsers(query)).forEach(user =>{
            userArray.push(Convert.createUserData(user));
        });
        return userArray;
    }

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) : Promise<UserData> {
        return this.userService.login(loginUserDto);
    }

    @Post('register')
    async register(@Body() registerUserDto: RegisterUserDto) : Promise<UserData> {
        return Convert.createUserData(await this.userService.register(registerUserDto));
    }

    @Get("id/:id")
    async getPlayerById(@Param() params: any) : Promise<UserData> {
        return Convert.createUserData(await this.userService.getPlayerById(params.id));
    }

    @Get("username/:username")
    async getPlayerByUsername(@Param() params: any){
        return Convert.createUserData(await this.userService.getPlayerByName(params.username));
    }

    @Get("email/:email")
    async getPlayerByEmail(@Param() params: any){
        return Convert.createUserData(await this.userService.getPlayerByEmail(params.email));
    }

    @Patch('id/:id')
    async updateUser(@Body() registerUserDto: UpdateUserDto) {
        this.userService.updateUser(registerUserDto);

    }
}
