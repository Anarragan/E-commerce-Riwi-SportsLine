import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../modules/users/users.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;
  let configService: ConfigService;

  const mockUser = {
    id: 1,
    name: 'Test User',
    email: 'test@ejemplo.com',
    password: 'hashedPassword',
    createdAt: new Date(),
    updatedAt: new Date(),
    roles: [
      {
        id: 1,
        role: {
          id: 1,
          name: 'admin',
          permissions: [
            {
              id: 1,
              permission: {
                id: 1,
                name: 'manage_users',
              },
            },
          ],
        },
      },
    ],
  };

  const mockUsersService = {
    findByEmail: jest.fn(),
    findByUserId: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    const loginDto = {
      email: 'test@ejemplo.com',
      password: 'password123',
    };

    it('should return access and refresh tokens on successful login', async () => {
      mockUsersService.findByEmail.mockResolvedValue(mockUser);
      mockConfigService.get.mockReturnValue('test-secret');
      mockJwtService.signAsync.mockResolvedValueOnce('access-token');
      mockJwtService.signAsync.mockResolvedValueOnce('refresh-token');

      const result = await service.login(loginDto);

      expect(result).toEqual({
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      });
      expect(usersService.findByEmail).toHaveBeenCalledWith(loginDto.email);
      expect(jwtService.signAsync).toHaveBeenCalledTimes(2);
    });

    it('should throw UnauthorizedException if user not found', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(usersService.findByEmail).toHaveBeenCalledWith(loginDto.email);
    });

    it('should map roles and permissions correctly', async () => {
      mockUsersService.findByEmail.mockResolvedValue(mockUser);
      mockConfigService.get.mockReturnValue('test-secret');
      mockJwtService.signAsync.mockResolvedValue('token');

      await service.login(loginDto);

      const payloadCall = mockJwtService.signAsync.mock.calls[0][0];
      expect(payloadCall.roles).toEqual(['admin']);
      expect(payloadCall.permissions).toEqual(['manage_users']);
    });
  });

  describe('register', () => {
    const registerDto = {
      name: 'New User',
      email: 'newuser@ejemplo.com',
      password: 'password123',
    };

    it('should create a new user successfully', async () => {
      const createdUser = { ...mockUser, id: 2, ...registerDto };
      mockUsersService.create.mockResolvedValue(createdUser);

      const result = await service.register(registerDto);

      expect(result).toEqual({
        user: createdUser,
        message: 'User registered successfully',
      });
      expect(usersService.create).toHaveBeenCalledWith(registerDto);
    });
  });

  describe('refreshToken', () => {
    it('should return new access token', async () => {
      mockUsersService.findByUserId.mockResolvedValue(mockUser);
      mockConfigService.get.mockReturnValue('test-secret');
      mockJwtService.signAsync.mockResolvedValue('new-access-token');

      const result = await service.refreshToken('1');

      expect(result).toEqual({ accessToken: 'new-access-token' });
      expect(usersService.findByUserId).toHaveBeenCalledWith('1');
    });

    it('should throw UnauthorizedException if user not found', async () => {
      mockUsersService.findByUserId.mockResolvedValue(null);

      await expect(service.refreshToken('999')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('getJwtSecret', () => {
    it('should throw error if JWT_SECRET is not defined', () => {
      mockConfigService.get.mockReturnValue(undefined);

      expect(() => service['getJwtSecret']()).toThrow(
        'JWT_SECRET no está definido',
      );
    });

    it('should return secret if defined', () => {
      mockConfigService.get.mockReturnValue('my-secret');

      const result = service['getJwtSecret']();

      expect(result).toBe('my-secret');
    });
  });
});
