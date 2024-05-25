import { Injectable } from '@nestjs/common';
import { User } from './models/users.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
      ) {}

    async findByEmail(email: string): Promise<User> {
        const user = await this.userModel.findOne({
          where: [{ email }],
        });
        
        return user;
    }

}
