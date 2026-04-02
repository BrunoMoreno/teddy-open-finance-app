import { MetricsService } from './metrics.service';

describe('MetricsService', () => {
  it('serializes the registered metrics', async () => {
    const service = new MetricsService();

    service.httpRequestsTotal.inc({
      method: 'GET',
      path: '/clients',
      status_code: '200',
    });

    const output = await service.serialize();

    expect(output).toContain('http_requests_total');
    expect(output).toContain('clients_total');
  });
});
