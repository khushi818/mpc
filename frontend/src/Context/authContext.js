import React, { createContext, useState, useContext } from 'react';

// Create AuthContext
const AuthContext = createContext();

// Custom hook for using the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component that provides the authentication state
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
