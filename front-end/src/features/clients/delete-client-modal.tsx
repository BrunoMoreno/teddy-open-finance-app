import { Modal } from '../../shared/components/modal';
import { useState } from 'react';

type DeleteClientModalProps = {
  clientName: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
};

export function DeleteClientModal({ clientName, onClose, onConfirm }: DeleteClientModalProps) {
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal title="Excluir cliente:" onClose={onClose}>
      <div className="modal-form">
        <p>
          Você está prestes a excluir o cliente: <strong>{clientName}</strong>
        </p>
        <button className="primary-button" onClick={() => void handleConfirm()} disabled={loading}>
          {loading ? 'Carregando...' : 'Excluir cliente'}
        </button>
      </div>
    </Modal>
  );
}
