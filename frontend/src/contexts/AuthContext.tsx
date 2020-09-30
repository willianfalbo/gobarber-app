import React, { createContext, useCallback, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import apiClient from '../utils/apiClient';

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
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

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

  // this callback will be used on SignIn Page
  const signIn = useCallback(async ({ email, password }) => {
    try {
      const response = await apiClient.post<SignInResult>('/auth/login', {
        email,
        password,
      });

      const { user, token } = response.data;
      localStorage.setItem('@barbershop:token', token);
      localStorage.setItem('@barbershop:user', JSON.stringify(user));

      setData({ token, user });
      toast.success(`Welcome, ${user.name}.`);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'An error occurred');
    }
  }, []);

  // this callback will be used to sign user out
  const signOut = useCallback(() => {
    localStorage.removeItem('@barbershop:token');
    localStorage.removeItem('@barbershop:user');

    setData({} as SignInResult);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('AuthProvider must be placed as component before useAuth');
  }
  return context;
}
