import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dtos/create-author.dto';
import { UpdateAuthorDto } from './dtos/update-author.dto';
import { Author } from './models/authors.model';

describe('AuthorsController', () => {
  let controller: AuthorsController;
  let service: AuthorsService;

  const mockAuthorsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorsController],
      providers: [
        {
          provide: AuthorsService,
          useValue: mockAuthorsService,
        },
      ],
    }).compile();

    controller = module.get<AuthorsController>(AuthorsController);
    service = module.get<AuthorsService>(AuthorsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create an author', async () => {
      const createAuthorDto: CreateAuthorDto = {
        name: 'Test Author',
        biography: 'Test Biography',
        dateOfBirth: new Date('1990-01-01'),
      };

      const mockCreatedAuthor: Partial<Author> = {
        id: 1,
        ...createAuthorDto,
      };

      mockAuthorsService.create.mockResolvedValue(mockCreatedAuthor);

      const result = await controller.create(createAuthorDto);
      expect(result).toEqual(mockCreatedAuthor);
      expect(mockAuthorsService.create).toHaveBeenCalledWith(createAuthorDto);
    });
  });

  describe('update', () => {
    it('should update an author', async () => {
      const updateAuthorDto: UpdateAuthorDto = {
        name: 'Updated Author',
        biography: 'Updated Biography',
        dateOfBirth: new Date('1990-01-01'),
      };

      const authorId = '1';
      const mockUpdatedAuthor: Partial<Author> = {
        ...updateAuthorDto,
      };

      mockAuthorsService.update.mockResolvedValue(mockUpdatedAuthor);

      const result = await controller.update(authorId, updateAuthorDto);
      expect(result).toEqual(mockUpdatedAuthor);
      expect(mockAuthorsService.update).toHaveBeenCalledWith(+authorId, updateAuthorDto);
    });
  });

  describe('remove', () => {
    it('should remove an author', async () => {
      const authorId = '1';
      const mockDeletedMessage = 'Author deleted';

      mockAuthorsService.remove.mockResolvedValue(mockDeletedMessage);

      const result = await controller.remove(authorId);
      expect(result).toEqual(mockDeletedMessage);
      expect(mockAuthorsService.remove).toHaveBeenCalledWith(+authorId);
    });
  });
});
