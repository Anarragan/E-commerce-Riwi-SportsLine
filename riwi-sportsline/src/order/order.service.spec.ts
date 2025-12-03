import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';

describe('OrderService', () => {
  let service: OrderService;

  const mockOrderRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn().mockImplementation(dto => dto), // 👈 añadido
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        { provide: getRepositoryToken(Order), useValue: mockOrderRepository },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('findAll debería devolver órdenes', async () => {
    mockOrderRepository.find.mockResolvedValue([{ id: 1, description: 'Orden demo' }]);
    const result = await service.findAll();
    expect(result).toEqual([{ id: 1, description: 'Orden demo' }]);
    expect(mockOrderRepository.find).toHaveBeenCalled();
  });

  it('create debería guardar una orden', async () => {
    const dto = { description: 'Nueva orden', total: 200 };
    mockOrderRepository.save.mockResolvedValue({ id: 1, ...dto });

    const result = await service.create(dto as any);
    expect(result).toEqual({ id: 1, ...dto });
    expect(mockOrderRepository.create).toHaveBeenCalledWith(dto);
    expect(mockOrderRepository.save).toHaveBeenCalled();
  });
});
