"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import secureLocalStorage from "react-secure-storage";
import { jwtDecode } from "jwt-decode";
import { getSession, removeSession } from "@/lib/utils";

interface TokenPayload {
  exp: number;
  userId: string;
  email: string;
}

export const useAuth = () => {
  const initialized = useRef(false);

  const [user, setUser] = useState<Partial<TokenPayload> | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  const checkAuthStatus = () => {
    try {
      if (typeof window === "undefined") {
        setLoading(false);
        return;
      }

      const token = getSession();

      if (!token || token === "undefined") {
        setIsAuth(false);
        setLoading(false);
        return;
      }
      
      try {
        const decoded = jwtDecode<TokenPayload>(token);
        const currentTime = Date.now() / 1000;
        
        if (decoded.exp < currentTime) {
          removeSession();
          setIsAuth(false);
        } else {
          setUser({
            userId: decoded.userId,
            email: decoded.email
          });
          setIsAuth(true);
        }
      } catch (err:any) {
        console.log('error:', err);
        removeSession();
        setIsAuth(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const login = useCallback((token: string) => {
    secureLocalStorage.setItem("token", token);
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      setUser({
        userId: decoded.userId,
        email: decoded.email
      });
      setIsAuth(true);
    } catch (err) {
      console.error("Invalid token during login:", err);
    }
  }, []);

  const logout = useCallback(() => {
    removeSession();
    setUser(null);
    setIsAuth(false);
  }, []);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    
    checkAuthStatus();
  }, []);

  return {
    isAuthenticated: isAuth,
    user,
    loading,
    login,
    logout,
  };
};