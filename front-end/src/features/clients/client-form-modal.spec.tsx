import { fireEvent, render, screen } from '@testing-library/react';

import { ClientFormModal } from './client-form-modal';

describe('ClientFormModal', () => {
  it('validates required fields', async () => {
    render(
      <ClientFormModal
        title="Criar cliente:"
        submitLabel="Criar cliente"
        onClose={vi.fn()}
        onSubmit={vi.fn().mockResolvedValue(undefined)}
      />,
    );

    fireEvent.click(screen.getByText('Criar cliente'));
    expect(await screen.findByText('Nome é obrigatório.')).toBeInTheDocument();
  });
});

