import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: { register: jest.Mock; login: jest.Mock };

  beforeEach(async () => {
    authService = { register: jest.fn(), login: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('register should call authService.register with tenantId default', async () => {
    authService.register.mockResolvedValue({
      accessToken: 'jwt',
      user: { id: '1' },
    });

    const result = await controller.register({
      email: 'a@b.com',
      password: 'pass',
      displayName: 'User',
    });

    expect(authService.register).toHaveBeenCalledWith('a@b.com', 'pass', 'User', 'default');
    expect(result.accessToken).toBe('jwt');
  });

  it('register should use provided tenantId', async () => {
    authService.register.mockResolvedValue({
      accessToken: 'jwt',
      user: { id: '1' },
    });

    await controller.register({
      email: 'a@b.com',
      password: 'pass',
      displayName: 'User',
      tenantId: 'custom',
    });

    expect(authService.register).toHaveBeenCalledWith('a@b.com', 'pass', 'User', 'custom');
  });

  it('login should call authService.login', async () => {
    authService.login.mockResolvedValue({
      accessToken: 'jwt',
      user: { id: '1' },
    });

    const result = await controller.login({
      email: 'a@b.com',
      password: 'pass',
    });

    expect(authService.login).toHaveBeenCalledWith('a@b.com', 'pass');
    expect(result.accessToken).toBe('jwt');
  });
});
