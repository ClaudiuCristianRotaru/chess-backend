import { IsEmail, IsNotEmpty, IsUUID, MinLength, isEmail } from "class-validator";

export class UpdateUserDto {
    @IsNotEmpty()
    @IsUUID()
    readonly id: string;

    readonly username?: string;

    readonly email?: string;

    readonly password?: string;

    readonly rating?: number;
}