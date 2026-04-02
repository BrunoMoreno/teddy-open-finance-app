import { ApiError, apiFetch } from './http';
import { useAuthStore } from '../../features/auth/auth-store';

describe('apiFetch', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    useAuthStore.setState({ accessToken: null, user: null });
  });

  it('sends the auth token and returns json payloads', async () => {
    useAuthStore.setState({ accessToken: 'token-123', user: null });
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      headers: new Headers({ 'Content-Type': 'application/json; charset=utf-8' }),
      json: vi.fn().mockResolvedValue({ success: true }),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await apiFetch<{ success: boolean }>('/clients');

    expect(result).toEqual({ success: true });
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/clients', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer token-123',
      },
    });
  });

  it('returns text payloads when response is not json', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        headers: new Headers({ 'Content-Type': 'text/plain' }),
        text: vi.fn().mockResolvedValue('plain response'),
      }),
    );

    await expect(apiFetch<string>('/metrics')).resolves.toBe('plain response');
  });

  it('throws ApiError with the first validation message', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        headers: new Headers({ 'Content-Type': 'application/json' }),
        json: vi.fn().mockResolvedValue({ message: ['first error', 'second error'] }),
      }),
    );

    await expect(apiFetch('/clients')).rejects.toEqual(new ApiError(400, 'first error'));
  });
});
