import { IsEmail, IsNotEmpty, MinLength, isEmail } from "class-validator";

export class RegisterUserDto {
    @IsNotEmpty()
    @MinLength(5)
    readonly username: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;

    @IsNotEmpty()
    readonly rating: number;
}