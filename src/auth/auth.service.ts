import { ConflictException, BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/models/users.model';
import { SignInResponse, SignUpDto, SignUpResponse } from './dtos/sign-up.dto';
import { SignInDto } from "./dtos/sign-in.dto";
import { ERROR_MESSAGES } from '../common/constants/responseMessages.constant';
import { JWTService } from '../common/services/jwt.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
        private jwtService: JWTService,
        private usersService: UsersService,
    ) {
    }

    async signup(signUpDto: SignUpDto): Promise<SignUpResponse> {

        const userExists = await this.userModel.findOne({
            where: {
                email: signUpDto.email,
            },
        });

        if (userExists) {
            throw new ConflictException(ERROR_MESSAGES.USER_EMAIL_EXISTS);
        }

        const user = await this.userModel.create(signUpDto);

        const jwt = await this.jwtService.generateJwt(user.id.toString());
        delete user.password;

        return {
            user,
            accessToken: jwt,
        };
    }


    async signin(signInDto: SignInDto): Promise<SignInResponse> {
        const user = await this.userModel.findOne({
            where: {
                email: signInDto.email,
            }
        })
        if (!user) {
            throw new ConflictException(ERROR_MESSAGES.USER_NOT_FOUND);
        }

        const compareSuccess = await this.jwtService.comparePasswords(
            signInDto.password,
            user.password,
        );

        if (!compareSuccess) {
            throw new BadRequestException(ERROR_MESSAGES.INVALID_CREDENTIALS);
        }

        const jwt = await this.jwtService.generateJwt(user.id.toString());

        return {
            user,
            accessToken: jwt,
        };

    }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(username);
        if (user && await user.validatePassword(pass)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}