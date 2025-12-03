import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

// 👇 Cambia estos imports según el servicio y la entidad
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';

describe('ProductService', () => {
  let service: ProductService;

  // Mock genérico del repositorio
  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll debería devolver productos', async () => {
    mockRepository.find.mockResolvedValue([{ id: 1, name: 'Balón' }]);
    const result = await service.findAll();
    expect(result).toEqual([{ id: 1, name: 'Balón' }]);
    expect(mockRepository.find).toHaveBeenCalled();
  });

  it('create debería guardar un producto', async () => {
    const dto = { name: 'Camiseta', price: 100 };
    mockRepository.save.mockResolvedValue({ id: 1, ...dto });
    const result = await service.create(dto as any);
    expect(result).toEqual({ id: 1, ...dto });
    expect(mockRepository.save).toHaveBeenCalledWith(dto);
  });
});
