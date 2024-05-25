import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/models/users.model';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  exports: [SequelizeModule],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
