import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { ClientCard } from './client-card';

describe('ClientCard', () => {
  it('renders client data', () => {
    render(
      <MemoryRouter>
        <ClientCard
          client={{
            id: '1',
            name: 'Eduardo',
            salary: 3500,
            companyValue: 120000,
            accessCount: 0,
            createdAt: '',
            updatedAt: '',
          }}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText('Eduardo')).toBeInTheDocument();
    expect(screen.getByText(/Salário:/)).toBeInTheDocument();
  });
});

