import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { DeleteClientModal } from './delete-client-modal';

describe('DeleteClientModal', () => {
  it('renders client name and confirm action', async () => {
    const onConfirm = vi.fn().mockResolvedValue(undefined);
    render(
      <DeleteClientModal clientName="Eduardo" onClose={vi.fn()} onConfirm={onConfirm} />,
    );

    fireEvent.click(screen.getByText('Excluir cliente'));
    await waitFor(() => expect(onConfirm).toHaveBeenCalled());
    expect(screen.getByText('Eduardo')).toBeInTheDocument();
  });
});
