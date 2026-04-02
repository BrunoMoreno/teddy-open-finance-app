import type { Client } from './types';
import { useSelectedClientsStore } from './selected-clients-store';

const client = {
  id: '1',
  name: 'Client One',
  salary: 3500,
  companyValue: 100000,
  accessCount: 0,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
} satisfies Client;

describe('selected-clients-store', () => {
  beforeEach(() => {
    useSelectedClientsStore.setState({ items: [] });
  });

  it('adds a client only once', () => {
    const store = useSelectedClientsStore.getState();

    store.add(client);
    store.add(client);

    expect(useSelectedClientsStore.getState().items).toEqual([client]);
  });

  it('removes and clears selected clients', () => {
    useSelectedClientsStore.getState().add(client);

    useSelectedClientsStore.getState().remove(client.id);
    expect(useSelectedClientsStore.getState().items).toEqual([]);

    useSelectedClientsStore.getState().add(client);
    useSelectedClientsStore.getState().clear();
    expect(useSelectedClientsStore.getState().items).toEqual([]);
  });

  it('reports whether a client is selected', () => {
    expect(useSelectedClientsStore.getState().isSelected(client.id)).toBe(false);

    useSelectedClientsStore.getState().add(client);

    expect(useSelectedClientsStore.getState().isSelected(client.id)).toBe(true);
  });
});
