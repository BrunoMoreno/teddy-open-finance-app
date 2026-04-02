import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  const authService = {
    register: jest.fn(),
    login: jest.fn(),
  } as unknown as AuthService;
  const controller = new AuthController(authService);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('delegates registration to the auth service', async () => {
    (authService.register as jest.Mock).mockResolvedValue({ id: '1' });

    const dto = { name: 'Bruno', email: 'bruno@example.com', password: 'secret123' };
    await controller.register(dto);

    expect(authService.register).toHaveBeenCalledWith(dto);
  });

  it('delegates login to the auth service', async () => {
    (authService.login as jest.Mock).mockResolvedValue({ access_token: 'token-123' });

    const dto = { email: 'bruno@example.com', password: 'secret123' };
    await controller.login(dto);

    expect(authService.login).toHaveBeenCalledWith(dto);
  });
});
