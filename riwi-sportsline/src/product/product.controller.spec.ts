import { Test, TestingModule } from '@nestjs/testing';

// 👇 Cambia estos imports según el controlador y servicio
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  // Mock del servicio
  const mockProductService = {
    findAll: jest.fn().mockResolvedValue([{ id: 1, name: 'Balón' }]),
    create: jest.fn().mockResolvedValue({ id: 1, name: 'Camiseta' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        { provide: ProductService, useValue: mockProductService },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('findAll debería devolver productos', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([{ id: 1, name: 'Balón' }]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('create debería llamar al servicio y devolver producto', async () => {
    const dto = { name: 'Camiseta', price: 100 };
    const result = await controller.create(dto as any);
    expect(result).toEqual({ id: 1, name: 'Camiseta' });
    expect(service.create).toHaveBeenCalledWith(dto);
  });
});