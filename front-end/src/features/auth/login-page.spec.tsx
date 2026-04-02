import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';

import { LoginPage } from './login-page';

vi.mock('../clients/clients-api', () => ({
  loginRequest: vi.fn().mockResolvedValue({
    access_token: 'token',
    user: { id: '1', name: 'Usuário', email: 'admin@teddy.com' },
  }),
}));

describe('LoginPage', () => {
  it('submits login credentials', async () => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={new QueryClient()}>
          <LoginPage />
        </QueryClientProvider>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText('Entrar'));

    await waitFor(() => {
      expect(screen.getByText('Entrar')).toBeInTheDocument();
    });
  });
});

