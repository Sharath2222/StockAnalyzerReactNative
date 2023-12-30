// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  const register = (email, password) => {
    const newUser = { email, password };
    setUsers([...users, newUser]);
    return true; // Return true for successful registration
  };

  const login = (email, password) => {
    const foundUser = users.find((user) => user.email === email && user.password === password);

    if (foundUser) {
      setUser({ email });
      return true; // Return true for successful login
    } else {
      console.log('Login failed');
      return false; // Return false for failed login
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
