import { MetricsService } from '../common/metrics/metrics.service';

import { MetricsController } from './metrics.controller';

describe('MetricsController', () => {
  it('serializes prometheus metrics', async () => {
    const controller = new MetricsController({
      serialize: jest.fn().mockResolvedValue('http_requests_total 1'),
    } as unknown as MetricsService);

    await expect(controller.metrics()).resolves.toContain('http_requests_total');
  });
});

