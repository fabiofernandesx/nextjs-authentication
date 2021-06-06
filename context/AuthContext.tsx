import Router from 'next/router';
import { createContext, useEffect, useState } from 'react';
import { setCookie, parseCookies } from 'nookies';
import { getUserInfo, loginRequest, LoginRequestData } from '../services/auth';
import { api } from '../services/api';

type User = {
  name: string;
  email: string;
  avatar: string;
};

type AuthContextType = {
  user: User;
  isAuthenticated: boolean;
  login: (data: LoginRequestData) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'nextjs.token': token } = parseCookies();
    if (token) getUserInfo(token).then((response) => setUser(response.user));
  }, []);

  async function login({ email, password }: LoginRequestData) {
    //Call backend API
    const { token, user } = await loginRequest({ email, password });
    setCookie(undefined, 'nextjs.token', token, {
      maxAge: 60 * 60 * 8, // 8 hours
    });

    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    setUser(user);
    Router.push('/dashboard');
  }
  return <AuthContext.Provider value={{ user, isAuthenticated, login }}>{children}</AuthContext.Provider>;
}
