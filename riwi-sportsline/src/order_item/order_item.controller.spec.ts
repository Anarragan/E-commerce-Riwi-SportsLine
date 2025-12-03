import { Test, TestingModule } from '@nestjs/testing';
import { OrderItemController } from './order_item.controller';
import { OrderItemService } from './order_item.service';

describe('OrderItemController', () => {
  let controller: OrderItemController;
  let service: OrderItemService;

  const mockOrderItemService = {
    findAll: jest.fn().mockResolvedValue([{ id: 1, productName: 'Balón', quantity: 2 }]),
    create: jest.fn().mockResolvedValue({ id: 1, productName: 'Camiseta', quantity: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderItemController],
      providers: [{ provide: OrderItemService, useValue: mockOrderItemService }],
    }).compile();

    controller = module.get<OrderItemController>(OrderItemController);
    service = module.get<OrderItemService>(OrderItemService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('findAll debería devolver items de orden', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([{ id: 1, productName: 'Balón', quantity: 2 }]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('create debería llamar al servicio y devolver item de orden', async () => {
    const dto = { productName: 'Camiseta', quantity: 1 };
    const result = await controller.create(dto as any);
    expect(result).toEqual({ id: 1, productName: 'Camiseta', quantity: 1 });
    expect(service.create).toHaveBeenCalledWith(dto);
  });
});
