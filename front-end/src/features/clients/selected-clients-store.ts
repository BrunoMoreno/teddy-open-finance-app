import { create } from 'zustand';

import type { Client } from './types';

type SelectedClientsState = {
  items: Client[];
  add: (client: Client) => void;
  remove: (id: string) => void;
  clear: () => void;
  isSelected: (id: string) => boolean;
};

export const useSelectedClientsStore = create<SelectedClientsState>((set, get) => ({
  items: [],
  add: (client) =>
    set((state) =>
      state.items.some((item) => item.id === client.id)
        ? state
        : { items: [...state.items, client] },
    ),
  remove: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  clear: () => set({ items: [] }),
  isSelected: (id) => get().items.some((item) => item.id === id),
}));

