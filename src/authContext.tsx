// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { setToken, getToken, removeToken, isAuthenticated } from './services/auth';

export interface IUser {
  email: string;
  password: string;
  userName: string;
  phone: string;
}

interface AuthContextType {
  user: IUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [auth, setAuth] = useState(isAuthenticated());

  useEffect(() => {
    const token = getToken();
    if (token) {
      fetch('https://api.example.com/user/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setAuth(true);
        })
        .catch(() => {
          removeToken();
          setAuth(false);
        });
    }
  }, []);

  // ✅ 로그인 함수
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('https://api.example.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('로그인 실패');
      }

      const data = await response.json();
      setToken(data.accessToken);
      setUser(data.user);
      setAuth(true);
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  // ✅ 로그아웃 함수
  const logout = () => {
    removeToken();
    setUser(null);
    setAuth(false);
  };

  return <AuthContext.Provider value={{ user, login, logout, isAuthenticated: auth }}>{children}</AuthContext.Provider>;
};

// ✅ AuthContext 사용 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
