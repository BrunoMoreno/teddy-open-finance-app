import { ClientCard } from '../../shared/components/client-card';
import { useSelectedClientsStore } from './selected-clients-store';

export function SelectedClientsPage() {
  const items = useSelectedClientsStore((state) => state.items);
  const remove = useSelectedClientsStore((state) => state.remove);
  const clear = useSelectedClientsStore((state) => state.clear);

  return (
    <section className="page-section">
      <div className="page-header">
        <h1>Clientes selecionados:</h1>
      </div>
      <div className="clients-grid">
        {items.map((client) => (
          <ClientCard
            key={client.id}
            client={client}
            onRemoveSelected={() => remove(client.id)}
          />
        ))}
      </div>
      <div className="clients-bottom-actions">
        <button className="outline-button" onClick={clear}>
          Limpar clientes selecionados
        </button>
      </div>
    </section>
  );
}

