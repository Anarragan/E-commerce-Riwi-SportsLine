import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

describe('ClientController', () => {
  let controller: ClientController;
  let service: ClientService;

  const mockClientService = {
    findAll: jest.fn().mockResolvedValue([{ id: 1, name: 'Cliente demo' }]),
    create: jest.fn().mockResolvedValue({ id: 1, name: 'Nuevo cliente' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [{ provide: ClientService, useValue: mockClientService }],
    }).compile();

    controller = module.get<ClientController>(ClientController);
    service = module.get<ClientService>(ClientService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('findAll debería devolver clientes', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([{ id: 1, name: 'Cliente demo' }]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('create debería llamar al servicio y devolver cliente', async () => {
    const dto = { name: 'Nuevo cliente', email: 'cliente@example.com' };
    const result = await controller.create(dto as any);
    expect(result).toEqual({ id: 1, name: 'Nuevo cliente' });
    expect(service.create).toHaveBeenCalledWith(dto);
  });
});
