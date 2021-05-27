import { renderHook } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import { AuthProvider, useAuth } from '../../hooks/Auth';
import { api } from '../../services/api';

const apiMock = new MockAdapter(api);
const mockedHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockedHistoryPush,
  }),
}));

describe('Auth hook', () => {
  it('should be able to sign in', async () => {
    apiMock.onPost('sessions').reply(200, {
      user: { id: 'user-123', name: 'John Doe', email: 'johndoe@example.com' },
      token: 'token-123',
    });

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await result.current.signIn({
      email: 'johndoe@example.com',
      password: '123456',
    });

    await waitForNextUpdate();

    expect(result.current.user.email).toEqual('johndoe@example.com');
    expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
  });
});
