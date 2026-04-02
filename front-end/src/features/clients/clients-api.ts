import { apiFetch } from '../../shared/api/http';

import type { Client, ClientsResponse, DashboardSummary } from './types';

export function loginRequest(payload: { email: string; password: string }) {
  return apiFetch<{ access_token: string; user: { id: string; name: string; email: string } }>(
    '/auth/login',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
  );
}

export function getClients(page: number, pageSize: number) {
  return apiFetch<ClientsResponse>(`/clients?page=${page}&pageSize=${pageSize}`);
}

export function createClient(payload: {
  name: string;
  salary: number;
  companyValue: number;
}) {
  return apiFetch<Client>('/clients', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateClient(id: string, payload: {
  name: string;
  salary: number;
  companyValue: number;
}) {
  return apiFetch<Client>(`/clients/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function deleteClient(id: string) {
  return apiFetch<{ success: boolean }>(`/clients/${id}`, {
    method: 'DELETE',
  });
}

export function getClient(id: string) {
  return apiFetch<Client>(`/clients/${id}`);
}

export function getDashboardSummary() {
  return apiFetch<DashboardSummary>('/dashboard/summary?recentLimit=5');
}

