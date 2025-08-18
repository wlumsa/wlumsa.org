"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "lightTheme" | "darkTheme";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isLoaded: boolean; // Add loading state
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>("lightTheme");
  const [isLoaded, setIsLoaded] = useState(false); // Track if theme is loaded

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check localStorage first
      const savedTheme = localStorage.getItem("theme") as Theme | null;

      if (savedTheme) {
        setTheme(savedTheme);
        // Apply theme immediately to prevent flash
        document.documentElement.setAttribute("data-theme", savedTheme);
      } else {
        // If no saved preference, use system preference
        const systemPrefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        const defaultTheme = systemPrefersDark ? "darkTheme" : "lightTheme";
        setTheme(defaultTheme);
        // Apply theme immediately to prevent flash
        document.documentElement.setAttribute("data-theme", defaultTheme);
      }

      // Mark as loaded
      setIsLoaded(true);
    }
  }, []);

  // Apply theme whenever it changes (for user toggles)
  useEffect(() => {
    if (typeof window !== "undefined" && isLoaded) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme, isLoaded]);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === "lightTheme" ? "darkTheme" : "lightTheme"
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isLoaded }}>
      {children}
    </ThemeContext.Provider>
  );
}
