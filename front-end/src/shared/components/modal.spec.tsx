import { fireEvent, render, screen } from '@testing-library/react';

import { Modal } from './modal';

describe('Modal', () => {
  it('closes on escape', () => {
    const onClose = vi.fn();
    render(
      <Modal title="Teste" onClose={onClose}>
        <button>Primeiro</button>
      </Modal>,
    );

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('renders title', () => {
    render(
      <Modal title="Criar cliente:" onClose={vi.fn()}>
        <button>Primeiro</button>
      </Modal>,
    );

    expect(screen.getByText('Criar cliente:')).toBeInTheDocument();
  });
});

