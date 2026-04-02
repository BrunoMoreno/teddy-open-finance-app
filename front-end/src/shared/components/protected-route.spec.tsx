import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { useAuthStore } from '../../features/auth/auth-store';
import { ProtectedRoute } from './protected-route';

describe('ProtectedRoute', () => {
  it('renders children when authenticated', () => {
    useAuthStore.setState({
      accessToken: 'token',
      user: { id: '1', name: 'User', email: 'user@test.com' },
    });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Private</div>
        </ProtectedRoute>
      </MemoryRouter>,
    );

    expect(screen.getByText('Private')).toBeInTheDocument();
  });
});

