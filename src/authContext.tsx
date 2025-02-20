// src/context/AuthContext.tsx
import { createContext, useContext, useState } from 'react';
import { removeToken, isAuthenticated } from './services/auth';

export interface IUser {
  email: string;
  password: string;
  userName: string;
  phone: string;
}

interface AuthContextType {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState(isAuthenticated());

  // ✅ 로그인 함수
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('http://3.37.67.153:8081/api/v1/admin/members/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('로그인 실패');
      }

      await response.json();
      setAuth(true);
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  // ✅ 로그아웃 함수
  const logout = () => {
    removeToken();
    setAuth(false);
  };

  return <AuthContext.Provider value={{ login, logout, isAuthenticated: auth }}>{children}</AuthContext.Provider>;
};

// ✅ AuthContext 사용 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
