import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  const mockOrderService = {
    findAll: jest.fn().mockResolvedValue([{ id: 1, description: 'Orden demo' }]),
    create: jest.fn().mockResolvedValue({ id: 1, description: 'Nueva orden' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [{ provide: OrderService, useValue: mockOrderService }],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('findAll debería devolver órdenes', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([{ id: 1, description: 'Orden demo' }]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('create debería llamar al servicio y devolver orden', async () => {
    const dto = { description: 'Nueva orden', total: 200 };
    const result = await controller.create(dto as any);
    expect(result).toEqual({ id: 1, description: 'Nueva orden' });
    expect(service.create).toHaveBeenCalledWith(dto);
  });
});
