import React, { createContext, useCallback } from 'react';
import api from '../utils/apiClient';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthData {
  name: string;
  signIn(credentials: SignInCredentials): Promise<void>;
}

export const AuthContext = createContext<AuthData>({} as AuthData);

export const AuthProvider: React.FC = ({ children }) => {
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/auth/login', {
      email,
      password,
    });

    console.log(response);
  }, []);

  return (
    <AuthContext.Provider value={{ name: 'Test', signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
