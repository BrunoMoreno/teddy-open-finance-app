import { useAuthStore } from './auth-store';

describe('auth-store', () => {
  beforeEach(() => {
    localStorage.clear();
    useAuthStore.setState({ accessToken: null, user: null });
  });

  it('stores authenticated user data', () => {
    useAuthStore.getState().setAuth({
      accessToken: 'token-123',
      user: {
        id: '1',
        name: 'Bruno',
        email: 'bruno@example.com',
      },
    });

    expect(useAuthStore.getState().accessToken).toBe('token-123');
    expect(useAuthStore.getState().user).toEqual({
      id: '1',
      name: 'Bruno',
      email: 'bruno@example.com',
    });
  });

  it('clears auth state on logout', () => {
    useAuthStore.setState({
      accessToken: 'token-123',
      user: {
        id: '1',
        name: 'Bruno',
        email: 'bruno@example.com',
      },
    });

    useAuthStore.getState().logout();

    expect(useAuthStore.getState().accessToken).toBeNull();
    expect(useAuthStore.getState().user).toBeNull();
  });
});
