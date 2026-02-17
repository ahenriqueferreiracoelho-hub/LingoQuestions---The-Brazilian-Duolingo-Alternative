// Comentário: Contexto de autenticação para compartilhar token e usuário no app inteiro.
import React, { createContext, useContext, useState } from 'react';
import { apiRequest } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  async function login(email, password) {
    const data = await apiRequest('/auth/login', 'POST', { email, password });
    setToken(data.token);
    setUser(data.user);
  }

  async function register(name, email, password) {
    const data = await apiRequest('/auth/register', 'POST', { name, email, password });
    setToken(data.token);
    setUser(data.user);
  }

  function logout() {
    setToken(null);
    setUser(null);
  }

  return <AuthContext.Provider value={{ token, user, login, register, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
