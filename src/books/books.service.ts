import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from './models/books.model';
import { Author } from '../authors/models/authors.model';
import {
  ERROR_MESSAGES,
  RESPONSE_MESSAGES,
} from 'src/common/constants/responseMessages.constant';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book)
    private bookModel: typeof Book,
    @InjectModel(Author)
    private authorModel: typeof Author,
  ) { }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const authorExists = await this.authorModel.findOne({
      where: {
        id: createBookDto.authorId
      }
    });

    const bookExists = await this.bookModel.findOne({
      where: {
        title: createBookDto.title
      }
    });

    if (!authorExists) {
      throw new NotFoundException(ERROR_MESSAGES.AUTHOR_NOT_FOUND)
    }

    if (bookExists) {
      throw new ConflictException(ERROR_MESSAGES.BOOK_EXISTS)
    }

    return this.bookModel.create({
      authorId: createBookDto.authorId,
      title: createBookDto.title,
      ISBN: createBookDto.ISBN,
      publishedDate: createBookDto.publishedDate
    });
  }

  async findAll(): Promise<Book[]> {
    const books: Book[] = await this.bookModel.findAll();

    return books;
  }

  async findOne(id: number): Promise<Book> {
    const book: Book = await this.bookModel.findByPk(id);

    if (!book) {
      throw new NotFoundException(ERROR_MESSAGES.BOOK_NOT_FOUND)
    }

    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Partial<Book>> {
    const book: Book = await this.bookModel.findByPk(id);

    if (!book) {
      throw new NotFoundException(ERROR_MESSAGES.BOOK_NOT_FOUND)
    }

    await this.bookModel.update({ ...updateBookDto },
      {
        where: {
          id,
        },
      });

      return {...book.dataValues, ...updateBookDto};
  }

  async remove(id: number): Promise<string> {
    const book: Book = await this.bookModel.findByPk(id);

    if (!book) {
      throw new NotFoundException(ERROR_MESSAGES.BOOK_NOT_FOUND)
    }

    await book.destroy();

    return RESPONSE_MESSAGES.DELETED;
  }
}
