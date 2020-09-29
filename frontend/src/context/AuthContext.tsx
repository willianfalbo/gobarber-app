import React, { createContext, useCallback, useState } from 'react';
import api from '../utils/apiClient';

interface SignInCredentials {
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatarFilename: string;
}

interface SignInResult {
  token: string;
  user: User;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
  // this state will be execute every time the page loads
  // if the data exists in the local storage we are going to use it
  const [data, setData] = useState<SignInResult>(() => {
    const token = localStorage.getItem('@barbershop:token');
    const user = localStorage.getItem('@barbershop:user');

    if (token && user) {
      return {
        token,
        user: JSON.parse(user),
      };
    }

    return {} as SignInResult;
  });

  // this callback will be used in the signin page
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post<SignInResult>('/auth/login', {
      email,
      password,
    });

    const { user, token } = response.data;
    localStorage.setItem('@barbershop:token', token);
    localStorage.setItem('@barbershop:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
