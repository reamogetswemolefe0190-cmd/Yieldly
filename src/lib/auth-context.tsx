"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import type { User } from "./types";
import { api } from "./api";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  completeOnboarding: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for token on mount
  useEffect(() => {
    const token = localStorage.getItem("yieldly_token");
    if (token) {
      api.getMe()
        .then((data) => setUser(data))
        .catch(() => {
          localStorage.removeItem("yieldly_token");
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      try {
        const data = await api.login(email, password);
        localStorage.setItem("yieldly_token", data.token);
        setUser(data.user);
        return true;
      } catch (error) {
        console.error("Login failed:", error);
        return false;
      }
    },
    []
  );

  const register = useCallback(
    async (name: string, email: string, password: string): Promise<boolean> => {
      try {
        const data = await api.register(name, email, password);
        localStorage.setItem("yieldly_token", data.token);
        setUser(data.user);
        return true;
      } catch (error) {
        console.error("Registration failed:", error);
        return false;
      }
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem("yieldly_token");
    setUser(null);
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  }, []);

  const completeOnboarding = useCallback(async (updates: Partial<User>) => {
    try {
      await api.updateMe({
        ...updates,
        onboardingComplete: true,
        kycStatus: "verified",
      });
      setUser((prev) =>
        prev ? { ...prev, ...updates, onboardingComplete: true, kycStatus: "verified" } : null
      );
    } catch (error) {
      console.error("Onboarding update failed:", error);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateUser,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
