import { Test, TestingModule } from '@nestjs/testing';
import { RolesGuard } from './roles.guard';
import { Reflector } from '@nestjs/core';
import { ExecutionContext, ForbiddenException } from '@nestjs/common';

describe('RolesGuard', () => {
  let guard: RolesGuard;

  const mockReflector = {
    getAllAndOverride: jest.fn(),
  };

  interface MockUser {
    sub: number;
    email?: string;
    roles: string[];
    permissions: string[];
  }

  const mockExecutionContext = (user: MockUser | null) =>
    ({
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({ user }),
      }),
    }) as unknown as ExecutionContext;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesGuard,
        {
          provide: Reflector,
          useValue: mockReflector,
        },
      ],
    }).compile();

    guard = module.get<RolesGuard>(RolesGuard);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('canActivate', () => {
    it('should return true if no roles or permissions are required', () => {
      mockReflector.getAllAndOverride.mockReturnValueOnce(undefined);
      mockReflector.getAllAndOverride.mockReturnValueOnce(undefined);

      const context = mockExecutionContext({
        sub: 1,
        roles: [],
        permissions: [],
      });

      expect(guard.canActivate(context)).toBe(true);
    });

    it('should return true if user has required role', () => {
      mockReflector.getAllAndOverride.mockReturnValueOnce(['admin']);
      mockReflector.getAllAndOverride.mockReturnValueOnce(undefined);

      const user = {
        sub: 1,
        email: 'test@ejemplo.com',
        roles: ['admin'],
        permissions: [],
      };

      const context = mockExecutionContext(user);

      expect(guard.canActivate(context)).toBe(true);
    });

    it('should throw ForbiddenException if user does not have required role', () => {
      mockReflector.getAllAndOverride.mockReturnValueOnce(['admin']);
      mockReflector.getAllAndOverride.mockReturnValueOnce(undefined);

      const user = {
        sub: 1,
        email: 'test@ejemplo.com',
        roles: ['user'],
        permissions: [],
      };

      const context = mockExecutionContext(user);

      expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    });

    it('should return true if user has all required permissions', () => {
      mockReflector.getAllAndOverride.mockReturnValueOnce(undefined);
      mockReflector.getAllAndOverride.mockReturnValueOnce(['read', 'write']);

      const user = {
        sub: 1,
        email: 'test@ejemplo.com',
        roles: ['user'],
        permissions: ['read', 'write', 'delete'],
      };

      const context = mockExecutionContext(user);

      expect(guard.canActivate(context)).toBe(true);
    });

    it('should throw ForbiddenException if user does not have all required permissions', () => {
      mockReflector.getAllAndOverride.mockReturnValueOnce(undefined);
      mockReflector.getAllAndOverride.mockReturnValueOnce(['read', 'write']);

      const user = {
        sub: 1,
        email: 'test@ejemplo.com',
        roles: ['user'],
        permissions: ['read'],
      };

      const context = mockExecutionContext(user);

      expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    });

    it('should throw ForbiddenException if user is not found in request', () => {
      mockReflector.getAllAndOverride.mockReturnValueOnce(['admin']);
      mockReflector.getAllAndOverride.mockReturnValueOnce(undefined);

      const context = mockExecutionContext(null);

      expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    });

    it('should validate both roles and permissions when both are required', () => {
      mockReflector.getAllAndOverride.mockReturnValueOnce(['admin']);
      mockReflector.getAllAndOverride.mockReturnValueOnce(['manage_users']);

      const user = {
        sub: 1,
        email: 'test@ejemplo.com',
        roles: ['admin'],
        permissions: ['manage_users', 'delete_users'],
      };

      const context = mockExecutionContext(user);

      expect(guard.canActivate(context)).toBe(true);
    });
  });
});
