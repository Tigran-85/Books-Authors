import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt.authGuard';
import { Book } from './models/books.model';
import { NotFoundException, ConflictException } from '@nestjs/common';

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;

  const mockBooksService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockBook: Partial<Book> = {
    id: 1,
    title: 'Test Book',
    authorId: 1,
    ISBN: '123-4567890123',
    publishedDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: mockBooksService,
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a book', async () => {
      const createBookDto: CreateBookDto = {
        authorId: 1,
        title: 'Test Book',
        ISBN: '123-4567890123',
        publishedDate: new Date(),
      };

      mockBooksService.create.mockResolvedValue(mockBook);

      expect(await controller.create(createBookDto)).toEqual(mockBook);
      expect(mockBooksService.create).toHaveBeenCalledWith(createBookDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      mockBooksService.findAll.mockResolvedValue([mockBook]);

      expect(await controller.findAll()).toEqual([mockBook]);
      expect(mockBooksService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a book by id', async () => {
      mockBooksService.findOne.mockResolvedValue(mockBook);

      expect(await controller.findOne('1')).toEqual(mockBook);
      expect(mockBooksService.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if book is not found', async () => {
      mockBooksService.findOne.mockRejectedValue(new NotFoundException());

      await expect(controller.findOne('1')).rejects.toThrow(NotFoundException);
      expect(mockBooksService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a book', async () => {
      const updateBookDto: UpdateBookDto = {
        authorId: 1,
        title: 'Updated Book',
        ISBN: '123-4567890123',
        publishedDate: new Date(),
      };

      mockBooksService.update.mockResolvedValue({ ...mockBook, ...updateBookDto });

      expect(await controller.update('1', updateBookDto)).toEqual({ ...mockBook, ...updateBookDto });
      expect(mockBooksService.update).toHaveBeenCalledWith(1, updateBookDto);
    });

    it('should throw NotFoundException if book is not found', async () => {
      mockBooksService.update.mockRejectedValue(new NotFoundException());

      await expect(controller.update('1', {
        authorId: 1,
        title: 'Updated Book',
        ISBN: '123-4567890123',
        publishedDate: new Date(),
      })).rejects.toThrow(NotFoundException);
      expect(mockBooksService.update).toHaveBeenCalledWith(1, expect.any(Object));
    });
  });

  describe('remove', () => {
    it('should remove a book', async () => {
      mockBooksService.remove.mockResolvedValue('Book deleted');

      expect(await controller.remove('1')).toEqual('Book deleted');
      expect(mockBooksService.remove).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if book is not found', async () => {
      mockBooksService.remove.mockRejectedValue(new NotFoundException());

      await expect(controller.remove('1')).rejects.toThrow(NotFoundException);
      expect(mockBooksService.remove).toHaveBeenCalledWith(1);
    });
  });
});
