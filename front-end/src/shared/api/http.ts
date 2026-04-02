import { useAuthStore } from '../../features/auth/auth-store';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';

export class ApiError extends Error {
  constructor(public readonly statusCode: number, message: string) {
    super(message);
  }
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = useAuthStore.getState().accessToken;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({ message: 'Erro inesperado' }));
    throw new ApiError(response.status, Array.isArray(data.message) ? data.message[0] : data.message);
  }

  if (response.headers.get('Content-Type')?.includes('application/json')) {
    return response.json() as Promise<T>;
  }

  return response.text() as T;
}

