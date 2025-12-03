import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let userService: Partial<UserService>;
  let jwtService: Partial<JwtService>;

  beforeEach(async () => {
    userService = {
      findByEmail: jest.fn().mockResolvedValue({
        id: 1,
        email: "test@example.com",
        password: await bcrypt.hash("password", 10),
        role: {name: "analyst"}
      }),
      findOne: jest.fn().mockResolvedValue({
        id: 1,
        email: "test@example.com",
        role: {name: "analyst"}
      })
    };

    jwtService = {
      sign: jest.fn().mockResolvedValue("mockToken"),
      verify: jest.fn().mockResolvedValue({sub: 1, email: "test@example.com", role: "analyst"})
    };

    const module: TestingModule = await Test.createTestingModule({
      providers:[
        AuthService,
        {provide: UserService, useValue: userService},
        {provide: JwtService, useValue: jwtService},
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });



  it('debería validar usuario con credenciales correctas', async () => {
    const user = await service.validateUser('test@example.com', 'password');
    expect(user).toBeDefined();
    expect(user!.email).toBe('test@example.com');
  });

  it('debería retornar null si la contraseña es incorrecta', async () => {
    const user = await service.validateUser('test@example.com', 'wrongpassword');
    expect(user).toBeNull();
  });

  it('debería lanzar UnauthorizedException si login falla', async () => {
    (userService.findByEmail as jest.Mock).mockResolvedValue(null);
    await expect(service.login('test@example.com', 'password')).rejects.toThrow(UnauthorizedException);
  });

  it('debería retornar tokens en login exitoso', async () => {
    const result = await service.login('test@example.com', 'password');
    expect(result).toHaveProperty('accessToken');
    expect(result).toHaveProperty('refreshToken');
  });

  it('debería refrescar token correctamente', async () => {
    const result = await service.refresh('mockRefreshToken');
    expect(result).toHaveProperty('accessToken');
  });
});
