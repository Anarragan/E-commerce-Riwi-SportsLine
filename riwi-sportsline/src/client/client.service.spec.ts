import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ClientService } from './client.service';
import { Client } from './entities/client.entity';

describe('ClientService', () => {
  let service: ClientService;

  const mockClientRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn().mockImplementation(dto => dto), // 👈 añadido
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        { provide: getRepositoryToken(Client), useValue: mockClientRepository },
      ],
    }).compile();

    service = module.get<ClientService>(ClientService);
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('create debería guardar un cliente', async () => {
    const dto = { name: 'Nuevo Cliente', email: 'cliente@example.com' };
    mockClientRepository.save.mockResolvedValue({ id: 1, ...dto });

    const result = await service.create(dto as any);
    expect(result).toEqual({ id: 1, ...dto });
    expect(mockClientRepository.create).toHaveBeenCalledWith(dto);
    expect(mockClientRepository.save).toHaveBeenCalled();
  });
});
