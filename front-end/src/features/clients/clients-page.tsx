import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { ClientCard } from '../../shared/components/client-card';
import { Pagination } from '../../shared/components/pagination';
import { createClient, deleteClient, getClients, updateClient } from './clients-api';
import { ClientFormModal } from './client-form-modal';
import { DeleteClientModal } from './delete-client-modal';
import { useSelectedClientsStore } from './selected-clients-store';
import type { Client } from './types';

export function ClientsPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(16);
  const [creating, setCreating] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [deletingClient, setDeletingClient] = useState<Client | null>(null);
  const addSelected = useSelectedClientsStore((state) => state.add);
  const isSelected = useSelectedClientsStore((state) => state.isSelected);

  const { data, isLoading } = useQuery({
    queryKey: ['clients', page, pageSize],
    queryFn: () => getClients(page, pageSize),
  });

  const createMutation = useMutation({
    mutationFn: createClient,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['clients'] });
      await queryClient.invalidateQueries({ queryKey: ['dashboard-summary'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: { name: string; salary: number; companyValue: number } }) =>
      updateClient(id, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteClient,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['clients'] });
      await queryClient.invalidateQueries({ queryKey: ['dashboard-summary'] });
      setDeletingClient(null);
    },
  });

  if (isLoading || !data) {
    return <p>Carregando clientes...</p>;
  }

  return (
    <section className="page-section">
      <div className="page-header">
        <h1>{data.total} clientes encontrados:</h1>
        <label className="page-size-control">
          <span>Clientes por página:</span>
          <select
            value={pageSize}
            onChange={(event) => {
              setPageSize(Number(event.target.value));
              setPage(1);
            }}
          >
            <option value={8}>8</option>
            <option value={16}>16</option>
            <option value={32}>32</option>
          </select>
        </label>
      </div>
      <div className="clients-grid">
        {data.items.map((client) => (
          <ClientCard
            key={client.id}
            client={client}
            selected={isSelected(client.id)}
            onSelect={() => addSelected(client)}
            onEdit={() => setEditingClient(client)}
            onDelete={() => setDeletingClient(client)}
          />
        ))}
      </div>
      <div className="clients-bottom-actions">
        <button className="outline-button" onClick={() => setCreating(true)}>
          Criar cliente
        </button>
        <Pagination currentPage={data.page} totalPages={data.totalPages} onPageChange={setPage} />
      </div>
      {creating ? (
        <ClientFormModal
          title="Criar cliente:"
          submitLabel="Criar cliente"
          onClose={() => setCreating(false)}
          onSubmit={async (payload) => {
            await createMutation.mutateAsync(payload);
          }}
        />
      ) : null}
      {editingClient ? (
        <ClientFormModal
          title="Editar cliente:"
          submitLabel="Editar cliente"
          initialValue={editingClient}
          onClose={() => setEditingClient(null)}
          onSubmit={async (payload) => {
            await updateMutation.mutateAsync({ id: editingClient.id, payload });
          }}
        />
      ) : null}
      {deletingClient ? (
        <DeleteClientModal
          clientName={deletingClient.name}
          onClose={() => setDeletingClient(null)}
          onConfirm={() => deleteMutation.mutateAsync(deletingClient.id).then(() => undefined)}
        />
      ) : null}
    </section>
  );
}
