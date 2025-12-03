import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrderItemService } from './order_item.service';
import { OrderItem } from './entities/order_item.entity';

describe('OrderItemService', () => {
  let service: OrderItemService;

  const mockOrderItemRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn().mockImplementation(dto => dto), // 👈 añadido
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderItemService,
        { provide: getRepositoryToken(OrderItem), useValue: mockOrderItemRepository },
      ],
    }).compile();

    service = module.get<OrderItemService>(OrderItemService);
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('create debería guardar un item de orden', async () => {
    const dto = { productName: 'Camiseta', quantity: 1 };
    mockOrderItemRepository.save.mockResolvedValue({ id: 1, ...dto });

    const result = await service.create(dto as any);
    expect(result).toEqual({ id: 1, ...dto });
    expect(mockOrderItemRepository.create).toHaveBeenCalledWith(dto);
    expect(mockOrderItemRepository.save).toHaveBeenCalled();
  });
});
