import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import * as bcrypt from 'bcrypt';
import { NotFoundException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;

  const mockUserRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(), // 👈 añadido
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockRoleRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
        { provide: getRepositoryToken(Role), useValue: mockRoleRepository },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    jest.clearAllMocks();
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  // ✅ Caso positivo
  it('findAll debería devolver usuarios', async () => {
    mockUserRepository.find.mockResolvedValue([{ id: 1, email: 'test@example.com' }]);
    const result = await service.findAll();
    expect(result).toEqual([{ id: 1, email: 'test@example.com' }]);
    expect(mockUserRepository.find).toHaveBeenCalled();
  });

  // ✅ Caso positivo
  it('create debería guardar un usuario con rol', async () => {
    const dto = { name: 'Nuevo', email: 'nuevo@example.com', password: '123456', roleId: 1 };

    mockRoleRepository.findOne.mockResolvedValue({ id: 1, name: 'analyst' });
    mockUserRepository.save.mockResolvedValue({
      id: 1,
      name: dto.name,
      email: dto.email,
      password: await bcrypt.hash(dto.password, 10),
      role: { id: 1, name: 'analyst' },
    });

    const result = await service.create(dto as any);

    expect(result).toHaveProperty('id', 1);
    expect(result).toHaveProperty('email', 'nuevo@example.com');
    expect(mockUserRepository.create).toHaveBeenCalled();
    expect(mockUserRepository.save).toHaveBeenCalled();
    expect(mockRoleRepository.findOne).toHaveBeenCalledWith({ where: { id: dto.roleId } });
  });

  // ❌ Caso negativo: usuario no encontrado
  it('findOne debería lanzar NotFoundException si el usuario no existe', async () => {
    mockUserRepository.findOneBy.mockResolvedValue(null); // 👈 usar findOneBy
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  // ❌ Caso negativo: rol inexistente en create
  it('create debería lanzar error si el rol no existe', async () => {
    const dto = { name: 'Nuevo', email: 'nuevo@example.com', password: '123456', roleId: 99 };
    mockRoleRepository.findOne.mockResolvedValue(null);

    await expect(service.create(dto as any)).rejects.toThrow(NotFoundException);
  });

  // ❌ Caso negativo: update de usuario inexistente
  it('update debería lanzar NotFoundException si el usuario no existe', async () => {
    mockUserRepository.findOneBy.mockResolvedValue(null); // 👈 usar findOneBy
    await expect(service.update(999, { email: 'new@example.com' })).rejects.toThrow(NotFoundException);
  });

  // ❌ Caso negativo: remove de usuario inexistente
  it('remove debería lanzar NotFoundException si el usuario no existe', async () => {
    mockUserRepository.findOneBy.mockResolvedValue(null); // 👈 usar findOneBy
    await expect(service.remove(999)).rejects.toThrow(NotFoundException);
  });
});
