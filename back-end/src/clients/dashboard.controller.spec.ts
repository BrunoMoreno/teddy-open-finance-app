import { DashboardController } from './dashboard.controller';
import { ClientsService } from './clients.service';

describe('DashboardController', () => {
  it('delegates summary calls using the recent limit from the query', async () => {
    const clientsService = {
      getDashboardSummary: jest.fn(),
    } as unknown as ClientsService;
    const controller = new DashboardController(clientsService);

    await controller.summary({ page: 1, pageSize: 16, recentLimit: 7 });

    expect(clientsService.getDashboardSummary).toHaveBeenCalledWith(7);
  });
});
