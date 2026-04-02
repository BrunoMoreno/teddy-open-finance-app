import { ExecutionContext } from '@nestjs/common';

import { JwtAuthGuard } from './jwt-auth.guard';

describe('JwtAuthGuard', () => {
  it('is defined', () => {
    expect(new JwtAuthGuard()).toBeDefined();
  });

  it('inherits passport auth guard contract', () => {
    const guard = new JwtAuthGuard();
    expect(typeof guard.canActivate).toBe('function');
    expect({} as ExecutionContext).toBeDefined();
  });
});

