import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  const mockUser = {
    id: 1,
    name: 'Test User',
    email: 'test@ejemplo.com',
    password: 'hashedPassword',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto = {
        name: 'New User',
        email: 'newuser@ejemplo.com',
        password: 'password123',
      };

      mockRepository.create.mockReturnValue(createUserDto);
      mockRepository.save.mockResolvedValue({ id: 1, ...createUserDto });

      const result = await service.create(createUserDto);

      expect(repository.create).toHaveBeenCalledWith(createUserDto);
      expect(repository.save).toHaveBeenCalled();
      expect(result).toEqual({ id: 1, ...createUserDto });
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [mockUser];
      mockRepository.find.mockResolvedValue(users);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      mockRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.findOne(1);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(mockUser);
    });
  });

  describe('findByEmail', () => {
    it('should return a user by email with relations', async () => {
      mockRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.findByEmail('test@ejemplo.com');

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { email: 'test@ejemplo.com' },
        relations: [
          'roles',
          'roles.role',
          'roles.role.permissions',
          'roles.role.permissions.permission',
        ],
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('findByUserId', () => {
    it('should return a user by string id with relations', async () => {
      mockRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.findByUserId('1');

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: [
          'roles',
          'roles.role',
          'roles.role.permissions',
          'roles.role.permissions.permission',
        ],
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto = { name: 'Updated Name' };
      mockRepository.update.mockResolvedValue({ affected: 1 });

      const result = await service.update(1, updateUserDto);

      expect(repository.update).toHaveBeenCalledWith({ id: 1 }, updateUserDto);
      expect(result).toEqual({ affected: 1 });
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.remove(1);

      expect(repository.delete).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual({ affected: 1 });
    });
  });
});
