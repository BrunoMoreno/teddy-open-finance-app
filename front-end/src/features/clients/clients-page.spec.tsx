import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';

import { ClientsPage } from './clients-page';

vi.mock('./clients-api', () => ({
  getClients: vi.fn().mockResolvedValue({
    items: [
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
    total: 1,
    page: 1,
    pageSize: 16,
    totalPages: 1,
  }),
  createClient: vi.fn(),
  updateClient: vi.fn(),
  deleteClient: vi.fn(),
}));

describe('ClientsPage', () => {
  it('renders list header and client card', async () => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={new QueryClient()}>
          <ClientsPage />
        </QueryClientProvider>
      </MemoryRouter>,
    );

    expect(await screen.findByText('1 clientes encontrados:')).toBeInTheDocument();
    expect(await screen.findByText('Eduardo')).toBeInTheDocument();
  });
});

