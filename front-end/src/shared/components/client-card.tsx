import { Link } from 'react-router-dom';

import { formatCurrency } from '../utils/currency';
import type { Client } from '../../features/clients/types';

type ClientCardProps = {
  client: Client;
  selected?: boolean;
  onSelect?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onRemoveSelected?: () => void;
};

export function ClientCard({
  client,
  selected,
  onSelect,
  onEdit,
  onDelete,
  onRemoveSelected,
}: ClientCardProps) {
  return (
    <article className="client-card">
      <Link className="client-card-link" to={`/clients/${client.id}`}>
        <h3>{client.name}</h3>
      </Link>
      <p>Salário: {formatCurrency(client.salary)}</p>
      <p>Empresa: {formatCurrency(client.companyValue)}</p>
      <div className="card-actions">
        {onSelect ? (
          <button className={`action-icon ${selected ? 'selected' : ''}`} onClick={onSelect} disabled={selected}>
            +
          </button>
        ) : null}
        {onEdit ? <button className="action-icon" onClick={onEdit}>✏️</button> : null}
        {onDelete ? <button className="action-icon danger" onClick={onDelete}>🗑️</button> : null}
        {onRemoveSelected ? (
          <button className="action-icon danger" onClick={onRemoveSelected}>
            —
          </button>
        ) : null}
      </div>
    </article>
  );
}

