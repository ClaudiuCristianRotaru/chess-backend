import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDto } from 'src/user/dto/user-login.dto';
import { User } from 'src/typeorm/user.entity';
import { Repository } from 'typeorm';
import { UserData } from './user.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from 'src/user/dto/user-register.dto';
import { isUUID } from 'class-validator';
import { UpdateUserDto } from './dto/user-register.dto copy';
@Injectable()
export class UserService {

    constructor(private jwtService: JwtService, @InjectRepository(User) private readonly userRepository: Repository<User>) { }

    getAllUsers(query: string): Promise<User[]> {
        try {
            let orderField = "rating";
            let order : "ASC"|"DESC" = "DESC";
            if(query)
            {
                let queryArray = query.split(":");
                orderField = queryArray[0];
                order = queryArray[1] == "asc" ? "ASC" : "DESC";
            }
            return this.userRepository
            .createQueryBuilder("user")
            .orderBy(`user.${orderField}`, order)
            .addOrderBy(`user.creationDate`, "DESC")
            .getMany();
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }

    async login({ username, password }: LoginUserDto): Promise<UserData> {
        const user = await this.getPlayerByName(username);
        if (!user) {
            throw new HttpException({
                error: 'Login failed',
                message: ['Username or password is incorrect'],
            }, HttpStatus.BAD_REQUEST);
        }

        let passwordMatch: boolean = await bcrypt.compare(password, user.password);
        
        if (!passwordMatch) {
            throw new HttpException({
                error: 'Login failed',
                message: ['Username or password is incorrect'],
            }, HttpStatus.BAD_REQUEST);
        }
        let payload = { userId: user.id, username: user.username, email: user.email, rating: user.rating };
        let accessToken: string = await this.jwtService.signAsync(payload);
        return { id: user.id, username: user.username, email: user.email, rating: user.rating, jwt: accessToken, creationDate: user.creationDate }
    }

    async register({ username, email, password, rating }: RegisterUserDto): Promise<User> {
        let user = await this.getPlayerByName(username);
        if (user) {
            throw new HttpException({
                error: 'Input data validation failed',
                message: ['Username must be unique.'],
            }, HttpStatus.BAD_REQUEST);
        }
        user = await this.getPlayerByEmail(email);
        if (user) {
            throw new HttpException({
                error: 'Input data validation failed',
                message: ['Email must be unique.'],
            }, HttpStatus.BAD_REQUEST);
        }
        let hash = await this.encryptPassword(password);
        let newUser = this.userRepository.create({ username: username, email: email, password: hash, rating: rating, creationDate: new Date(Date.now()), isClosed: false });
        return this.userRepository.save(newUser);
    }

    async getPlayerByName(username: string): Promise<User> {
        const user = await this.userRepository.findOneBy({ username: username, isClosed:false });
        return user;
    }

    async getPlayerByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOneBy({ email: email, isClosed:false });
        return user;
    }

    async getPlayerById(id: string): Promise<User> {
        if(!isUUID(id)) return null;
        const user = await this.userRepository.findOneBy({ id: id, isClosed:false });
        return user;
    }

    async updateUser({id, username, email, rating}: UpdateUserDto) {
        let o = Object.fromEntries(Object.entries({id, username, email, rating}).filter(([_, v]) => v != null));
        await this.userRepository.update({id: id}, o);

    }

    encryptPassword(plainPassword: string): string {
        const saltOrRounds = 10;
        let hash: string = bcrypt.hash(plainPassword, saltOrRounds);
        return hash;
    }

    createUserDto(user: User) {
        return {
            username: user.username,
            email: user.email,
            id: user.id,
            rating: user.rating,
            creationDate: user.creationDate
        }
    }
}
