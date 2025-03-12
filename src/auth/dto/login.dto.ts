import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class logInDto {
    @IsString()
    @MinLength(6)
    password: string

    @IsEmail()
    email: string
}
