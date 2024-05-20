import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Book } from './models/books.model';
import { Author } from '../authors/models/authors.model';

@Module({
  imports: [SequelizeModule.forFeature([Book, Author])],
  exports: [SequelizeModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
