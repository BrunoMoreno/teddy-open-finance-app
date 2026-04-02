import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { DashboardPage } from './dashboard-page';

vi.mock('../clients/clients-api', () => ({
  getDashboardSummary: vi.fn().mockResolvedValue({
    totalClients: 8,
    recentClients: [
      {
        id: '1',
        name: 'Eduardo',
        salary: 3500,
        companyValue: 120000,
        accessCount: 0,
        createdAt: '',
        updatedAt: '',
      },
    ],
    creationSeries: [{ period: '2026-01', count: 3 }],
  }),
}));

describe('DashboardPage', () => {
  it('renders dashboard data', async () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <DashboardPage />
      </QueryClientProvider>,
    );

    expect(await screen.findByText('Total de clientes')).toBeInTheDocument();
    expect(await screen.findByText('Eduardo')).toBeInTheDocument();
  });
});

