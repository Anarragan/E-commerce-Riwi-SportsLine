import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    login: jest.fn(),
    register: jest.fn(),
    refreshToken: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should call authService.login and return tokens', async () => {
      const loginDto = {
        email: 'test@ejemplo.com',
        password: 'password123',
      };

      const expectedResult = {
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      };

      mockAuthService.login.mockResolvedValue(expectedResult);

      const result = await controller.login(loginDto);

      expect(authService.login).toHaveBeenCalledWith(loginDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('register', () => {
    it('should call authService.register and return user', async () => {
      const registerDto = {
        name: 'Test User',
        email: 'test@ejemplo.com',
        password: 'password123',
      };

      const expectedResult = {
        user: {
          id: 1,
          name: 'Test User',
          email: 'test@ejemplo.com',
        },
        message: 'User registered successfully',
      };

      mockAuthService.register.mockResolvedValue(expectedResult);

      const result = await controller.register(registerDto);

      expect(authService.register).toHaveBeenCalledWith(registerDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('refreshToken', () => {
    it('should call authService.refreshToken and return new access token', async () => {
      const req = {
        user: {
          sub: '1',
        },
      };

      const expectedResult = {
        accessToken: 'new-access-token',
      };

      mockAuthService.refreshToken.mockResolvedValue(expectedResult);

      const result = await controller.refreshToken(req);

      expect(authService.refreshToken).toHaveBeenCalledWith('1');
      expect(result).toEqual(expectedResult);
    });
  });
});
