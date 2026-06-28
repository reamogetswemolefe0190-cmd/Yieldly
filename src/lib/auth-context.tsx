"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import type { User } from "./types";
import { MOCK_USER } from "./mock-data";

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

  useEffect(() => {
    const stored = localStorage.getItem("yieldly_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("yieldly_user");
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("yieldly_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("yieldly_user");
    }
  }, [user]);

  const login = useCallback(
    async (email: string, _password: string): Promise<boolean> => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (email.toLowerCase() === "demo@yieldly.co.za") {
        setUser({ ...MOCK_USER, email: "demo@yieldly.co.za" });
        return true;
      }
      // For demo, any email works with a generated user
      const demoUser: User = {
        id: "demo",
        email: email.toLowerCase(),
        name: email.split("@")[0].replace(/\./g, " "),
        kycStatus: "pending",
        onboardingComplete: false,
      };
      setUser(demoUser);
      return true;
    },
    []
  );

  const register = useCallback(
    async (name: string, email: string, _password: string): Promise<boolean> => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const newUser: User = {
        id: "new-" + Date.now(),
        email: email.toLowerCase(),
        name,
        kycStatus: "pending",
        onboardingComplete: false,
      };
      setUser(newUser);
      return true;
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  }, []);

  const completeOnboarding = useCallback((updates: Partial<User>) => {
    setUser((prev) =>
      prev ? { ...prev, ...updates, onboardingComplete: true, kycStatus: "verified" } : null
    );
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
