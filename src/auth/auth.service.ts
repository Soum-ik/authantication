import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { logInDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private UserModel: Model<User>) { }

    async signup(signupData: SignUpDto) {
        const { email, username, password } = signupData;

        const emailIsUse = await this.UserModel.findOne({ email: signupData.email });
        if (emailIsUse) {
            throw new BadRequestException('Email is already in use');
        }

        const hashPassword = bcrypt.hashSync(password, 10);
        const user = await this.UserModel.create({ email, username, password: hashPassword });
        return user;
    }

    async login(login: logInDto) {
        const { email, password } = login;

        const user = await this.UserModel.findOne({ email });
        if (!user) {
            throw new BadRequestException('Invalid credentials');
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            throw new BadRequestException('Invalid credentials');
        }

        const token = {
            email: user.email,
            username: user.username,
            id: user._id
        }

        return 'Success';

    }


}
