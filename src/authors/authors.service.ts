import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAuthorDto } from './dtos/create-author.dto';
import { UpdateAuthorDto } from './dtos/update-author.dto';
import { Author } from './models/authors.model';
import { ERROR_MESSAGES, RESPONSE_MESSAGES } from '../common/constants/responseMessages.constant';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel(Author)
    private authorModel: typeof Author,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const authorExists = await this.authorModel.findOne({
      where: {
        name: createAuthorDto.name
      }
    });

    if (authorExists) {
      throw new ConflictException(ERROR_MESSAGES.AUTHOR_EXISTS)
    }

    return this.authorModel.create({
      name: createAuthorDto.name,
      biography: createAuthorDto.biography,
      dateOfBirth: createAuthorDto.dateOfBirth
    });
  }

  async findAll(): Promise<Author[]> {
    const authors: Author[] = await this.authorModel.findAll();

    return authors;
  }

  async findOne(id: number): Promise<Author> {
    const author: Author = await this.authorModel.findByPk(id);

    if (!author) {
      throw new NotFoundException(ERROR_MESSAGES.AUTHOR_NOT_FOUND)
    }

    return author;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Partial<Author>> {
    const author: Author = await this.authorModel.findByPk(id);

    if (!author) {
      throw new NotFoundException(ERROR_MESSAGES.AUTHOR_NOT_FOUND)
    }

    await this.authorModel.update({ ...updateAuthorDto },
      {
        where: {
          id,
        },
      });

      return {...author.dataValues, ...updateAuthorDto};
  }

  async remove(id: number): Promise<string> {
    const author: Author = await this.authorModel.findByPk(id);

    if (!author) {
      throw new NotFoundException(ERROR_MESSAGES.AUTHOR_NOT_FOUND)
    }

    await author.destroy();

    return RESPONSE_MESSAGES.DELETED;
  }
}
