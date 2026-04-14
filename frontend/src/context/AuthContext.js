import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('trippy_token'));

  useEffect(() => {
    const stored = localStorage.getItem('trippy_user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (userData, tokenValue) => {
    setUser(userData);
    setToken(tokenValue);
    localStorage.setItem('trippy_token', tokenValue);
    localStorage.setItem('trippy_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('trippy_token');
    localStorage.removeItem('trippy_user');
  };

  const isAdmin = () => user?.role === 'admin';
  const isLoggedIn = () => !!token;

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAdmin, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
