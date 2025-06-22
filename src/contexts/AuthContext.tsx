
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Placeholder for actual API call
      console.log('Login API call:', { email, password });
      
      // Mock user data based on email for demo
      const mockUser: User = {
        id: '1',
        email,
        name: email.includes('admin') ? 'Admin User' : 'Regular User',
        role: email.includes('admin') ? 'admin' : 'user'
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      // Placeholder for actual API call
      console.log('Register API call:', { name, email, password });
      
      const mockUser: User = {
        id: '2',
        email,
        name,
        role: 'user'
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Registration failed');
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
