"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { SUPPORTED_LANGUAGES, getTranslation, LanguageOption } from "@/lib/translations";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  avatar?: string;
  country?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string, country?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  favorites: string[];
  toggleFavorite: (destinationId: string, destinationSlug: string) => Promise<boolean>;
  isFavorite: (idOrSlug: string) => boolean;
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string, fallback?: string) => string;
  languages: LanguageOption[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [language, setLanguageState] = useState<string>("en");

  // Load active session from /api/auth/me
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setUser(data.user);
            fetchFavorites();
          }
        }
      } catch (err) {
        console.error("Auth check failed:", err);
      } finally {
        setIsLoading(false);
      }
    }

    // Load saved favorites from local storage if guest
    const localFavs = localStorage.getItem("lanka_favorites");
    if (localFavs) {
      try {
        setFavorites(JSON.parse(localFavs));
      } catch (e) {}
    }

    const savedLang = localStorage.getItem("lanka_lang");
    if (savedLang) {
      setLanguageState(savedLang);
    }

    checkAuth();
  }, []);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem("lanka_lang", lang);
  };

  const t = (key: string, fallback?: string): string => {
    return getTranslation(language, key, fallback);
  };

  const fetchFavorites = async () => {
    try {
      const res = await fetch("/api/favorites");
      if (res.ok) {
        const data = await res.json();
        if (data.favorites) {
          const slugs = data.favorites.map((f: any) => f.destinationSlug || f.destination?._id || f._id);
          setFavorites(slugs);
          localStorage.setItem("lanka_favorites", JSON.stringify(slugs));
        }
      }
    } catch (err) {
      console.error("Failed to fetch favorites:", err);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || "Login failed" };
      }
      setUser(data.user);
      fetchFavorites();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "Network error" };
    }
  };

  const register = async (name: string, email: string, password: string, country?: string) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, country }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || "Registration failed" };
      }
      setUser(data.user);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "Network error" };
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      setFavorites([]);
      localStorage.removeItem("lanka_favorites");
    }
  };

  const toggleFavorite = async (destinationId: string, destinationSlug: string): Promise<boolean> => {
    const isCurrentlyFav = favorites.includes(destinationSlug) || favorites.includes(destinationId);
    let newFavs: string[];

    if (isCurrentlyFav) {
      newFavs = favorites.filter((item) => item !== destinationSlug && item !== destinationId);
    } else {
      newFavs = [...favorites, destinationSlug];
    }

    setFavorites(newFavs);
    localStorage.setItem("lanka_favorites", JSON.stringify(newFavs));

    if (user) {
      try {
        await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ destinationId, destinationSlug }),
        });
      } catch (err) {
        console.error("Failed to sync favorite with server:", err);
      }
    }
    return !isCurrentlyFav;
  };

  const isFavorite = (idOrSlug: string): boolean => {
    return favorites.includes(idOrSlug);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        favorites,
        toggleFavorite,
        isFavorite,
        language,
        setLanguage,
        t,
        languages: SUPPORTED_LANGUAGES,
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
