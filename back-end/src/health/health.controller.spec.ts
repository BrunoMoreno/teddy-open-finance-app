import { DataSource } from 'typeorm';

import { HealthController } from './health.controller';

describe('HealthController', () => {
  it('returns ok when db is reachable', async () => {
    const controller = new HealthController({
      query: jest.fn().mockResolvedValue([{ '?column?': 1 }]),
    } as unknown as DataSource);

    const result = await controller.healthz();
    expect(result.status).toBe('ok');
    expect(result.db).toBe('connected');
  });
});

