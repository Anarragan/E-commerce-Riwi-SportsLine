import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsuarioService } from './usuario.service';
import { Usuario } from './entities/usuario.entity';

describe('UsuarioService', () => {
  let service: UsuarioService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuarioService,
        {
          provide: getRepositoryToken(Usuario),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of usuarios', async () => {
      const usuarios = [{ id: '1', email: 'test@example.com', nombre: 'Test' }] as Usuario[];
      mockRepository.find.mockResolvedValue(usuarios);

      expect(await service.findAll()).toEqual(usuarios);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a usuario by id', async () => {
      const usuario = { id: '1', email: 'test@example.com' } as Usuario;
      mockRepository.findOne.mockResolvedValue(usuario);

      expect(await service.findOne('1')).toEqual(usuario);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    });
  });
});
