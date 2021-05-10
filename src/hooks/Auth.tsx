import React, { createContext, useCallback, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { api } from '../services/api';

interface User {
  id: string;
  avatar_url: string;
  name: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const history = useHistory();

  const [data, setData] = useState(() => {
    const token = localStorage.getItem('GoBarber:token');
    const user = localStorage.getItem('GoBarber:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(
    async ({ email, password }) => {
      const response = await api.post('/sessions', {
        email,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem('GoBarber:token', token);
      localStorage.setItem('GoBarber:user', JSON.stringify(user));

      api.defaults.headers.authorization = `Bearer ${token}`;

      setData({ token, user });

      history.push('/dashboard');
    },
    [history],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('GoBarber:token');
    localStorage.removeItem('GoBarber:user');
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={
        {
          signIn,
          user: data.user,
          signOut,
        } as AuthContextData
      }
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
};
