import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { ClientDetailPage } from './client-detail-page';

vi.mock('./clients-api', () => ({
  getClient: vi.fn().mockResolvedValue({
    id: '1',
    name: 'Eduardo',
    salary: 3500,
    companyValue: 120000,
    accessCount: 7,
    createdAt: '',
    updatedAt: '',
  }),
}));

describe('ClientDetailPage', () => {
  it('renders access count', async () => {
    render(
      <MemoryRouter initialEntries={['/clients/1']}>
        <QueryClientProvider client={new QueryClient()}>
          <Routes>
            <Route path="/clients/:id" element={<ClientDetailPage />} />
          </Routes>
        </QueryClientProvider>
      </MemoryRouter>,
    );

    expect(await screen.findByText('Access count: 7')).toBeInTheDocument();
  });
});

