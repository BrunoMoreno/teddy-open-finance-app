import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { useSelectedClientsStore } from './selected-clients-store';
import { SelectedClientsPage } from './selected-clients-page';

describe('SelectedClientsPage', () => {
  it('renders selected clients', () => {
    useSelectedClientsStore.setState({
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
    });

    render(
      <MemoryRouter>
        <SelectedClientsPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('Clientes selecionados:')).toBeInTheDocument();
    expect(screen.getByText('Eduardo')).toBeInTheDocument();
  });
});

