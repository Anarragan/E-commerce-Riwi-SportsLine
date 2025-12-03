import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    login: jest.fn().mockResolvedValue({
      accessToken: 'mockAccessToken',
      refreshToken: 'mockRefreshToken',
    }),
    refresh: jest.fn().mockResolvedValue({
      accessToken: 'newMockAccessToken',
    }),
    logout: jest.fn().mockResolvedValue({
      success: true,
      message: 'Logout exitoso',
    }),
    loginWithGoogle: jest.fn().mockResolvedValue({
      accessToken: 'googleAccessToken',
      refreshToken: 'googleRefreshToken',
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('login debería devolver accessToken y setear refreshToken en cookie', async () => {
  const dto = { email: 'test@example.com', password: '123456' };
  const res = { cookie: jest.fn(), json: jest.fn() } as any;

  const result = await controller.login(dto as any, res);

  expect(result).toEqual({ accessToken: 'mockAccessToken' }); // 👈 solo accessToken
  expect(service.login).toHaveBeenCalledWith(dto.email, dto.password);
  expect(res.cookie).toHaveBeenCalledWith(
    'refreshToken',
    'mockRefreshToken',
    expect.any(Object)
  );
});

  it('refresh debería devolver nuevo access token', async () => {
    const req = { cookies: { refreshToken: 'mockRefreshToken' } } as any;
    const result = await controller.refresh(req);
    expect(result).toEqual({ accessToken: 'newMockAccessToken' });
    expect(service.refresh).toHaveBeenCalledWith('mockRefreshToken');
  });

  it('logout debería limpiar cookie y devolver confirmación', async () => {
  const res = {
    clearCookie: jest.fn(),
  } as any;

  const result = await controller.logout(res);

  expect(result).toEqual({ success: true, message: 'Logout exitoso' });
  expect(res.clearCookie).toHaveBeenCalledWith(
    'refreshToken',
    expect.objectContaining({
      httpOnly: true,
      path: '/auth',
      sameSite: 'strict',
      secure: true,
    })
  );
});


  it('googleCallback debería devolver accessToken y setear refreshToken en cookie', async () => {
  const req = { user: { email: 'test@example.com', name: 'Test User' } } as any;
  const res = { cookie: jest.fn(), json: jest.fn() } as any;

  const result = await controller.googleCallback(req, res);

  expect(result).toEqual({ accessToken: 'googleAccessToken' }); // 👈 solo accessToken
  expect(service.loginWithGoogle).toHaveBeenCalledWith(req.user);
  expect(res.cookie).toHaveBeenCalledWith(
    'refreshToken',
    'googleRefreshToken',
    expect.any(Object)
  );
});

});
