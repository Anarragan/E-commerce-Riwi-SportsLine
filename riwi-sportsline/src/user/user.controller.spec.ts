import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUserService = {
    findAll: jest.fn().mockResolvedValue([{ id: 1, email: 'test@example.com' }]),
    create: jest.fn().mockResolvedValue({ id: 1, email: 'nuevo@example.com' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('findAll debería devolver usuarios', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([{ id: 1, email: 'test@example.com' }]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('create debería llamar al servicio y devolver usuario', async () => {
    const dto = { email: 'nuevo@example.com', password: '123456' };
    const result = await controller.create(dto as any);
    expect(result).toEqual({ id: 1, email: 'nuevo@example.com' });
    expect(service.create).toHaveBeenCalledWith(dto);
  });
});
