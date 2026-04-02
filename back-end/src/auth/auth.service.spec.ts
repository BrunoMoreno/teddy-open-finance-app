import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { JsonLogger } from '../common/logging/json-logger.service';

import { AuthService } from './auth.service';
import { User } from './entities/user.entity';

describe('AuthService', () => {
  const usersRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn((value) => value),
  } as unknown as Repository<User>;
  const jwtService = { signAsync: jest.fn().mockResolvedValue('token') } as unknown as JwtService;
  const configService = { get: jest.fn(), getOrThrow: jest.fn() };
  const logger = { log: jest.fn(), warn: jest.fn() } as unknown as JsonLogger;
  const service = new AuthService(usersRepository, jwtService, configService as never, logger);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns a token for valid credentials', async () => {
    const passwordHash = await bcrypt.hash('secret123', 1);
    usersRepository.findOne = jest.fn().mockResolvedValue({
      id: '1',
      email: 'admin@teddy.com',
      name: 'Admin',
      passwordHash,
    });

    const result = await service.login({
      email: 'admin@teddy.com',
      password: 'secret123',
    });

    expect(result.access_token).toBe('token');
  });

  it('throws for invalid credentials', async () => {
    usersRepository.findOne = jest.fn().mockResolvedValue(null);

    await expect(
      service.login({ email: 'x@x.com', password: 'invalid' }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('throws when registering an existing email', async () => {
    usersRepository.findOne = jest.fn().mockResolvedValue({ id: '1' });

    await expect(
      service.register({ email: 'admin@teddy.com', name: 'Admin', password: 'secret123' }),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});

