import { apiFetch } from '../../shared/api/http';
import {
  createClient,
  deleteClient,
  getClient,
  getClients,
  getDashboardSummary,
  loginRequest,
  updateClient,
} from './clients-api';

vi.mock('../../shared/api/http', () => ({
  apiFetch: vi.fn(),
}));

describe('clients-api', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('posts login payloads to the auth endpoint', async () => {
    await loginRequest({ email: 'user@example.com', password: 'secret123' });

    expect(apiFetch).toHaveBeenCalledWith('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: 'user@example.com', password: 'secret123' }),
    });
  });

  it('builds the clients listing query string', async () => {
    await getClients(2, 16);

    expect(apiFetch).toHaveBeenCalledWith('/clients?page=2&pageSize=16');
  });

  it('sends create, update, delete and detail requests to the correct endpoints', async () => {
    const payload = { name: 'Client One', salary: 3500, companyValue: 100000 };

    await createClient(payload);
    await updateClient('123', payload);
    await deleteClient('123');
    await getClient('123');
    await getDashboardSummary();

    expect(apiFetch).toHaveBeenNthCalledWith(1, '/clients', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    expect(apiFetch).toHaveBeenNthCalledWith(2, '/clients/123', {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    expect(apiFetch).toHaveBeenNthCalledWith(3, '/clients/123', {
      method: 'DELETE',
    });
    expect(apiFetch).toHaveBeenNthCalledWith(4, '/clients/123');
    expect(apiFetch).toHaveBeenNthCalledWith(5, '/dashboard/summary?recentLimit=5');
  });
});
