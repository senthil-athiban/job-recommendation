import { useEffect, useState, useCallback } from 'react';
import {jwtDecode} from 'jwt-decode';
import secureLocalStorage from 'react-secure-storage';

interface TokenPayload {
  exp: number;
  userId: string;
  email: string;
}

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<Partial<TokenPayload> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const validateToken = useCallback(() => {
    try {
      const token = secureLocalStorage.getItem("token") as string;
      console.log('token:', token);
      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        return false;
      }
      
      // Decode and validate token
      const decoded = jwtDecode<TokenPayload>(token);
      console.log('decoded:', decoded);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        // Token expired
        secureLocalStorage.removeItem("token");
        setIsAuthenticated(false);
        setUser(null);
        return false;
      }
      
      setIsAuthenticated(true);
      setUser({
        userId: decoded.userId,
        email: decoded.email
      });
      return true;
    } catch (error) {
      console.error('Token validation error:', error);
      secureLocalStorage.removeItem("token");
      setIsAuthenticated(false);
      setUser(null);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);
  
  const login = useCallback((token: string) => {
    secureLocalStorage.setItem("token", token);
    validateToken();
  }, [validateToken]);
  
  const logout = useCallback(() => {
    secureLocalStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  useEffect(() => {
    validateToken();
  }, [validateToken]);

  return {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    validateToken
  };
};
