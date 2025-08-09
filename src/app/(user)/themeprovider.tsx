"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "lightTheme" | "darkTheme";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check localStorage first
      const savedTheme = localStorage.getItem("theme") as Theme | null;

      if (savedTheme) {
        setTheme(savedTheme);
      } else {
        // If no saved preference, use system preference
        const systemPrefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        setTheme(systemPrefersDark ? "darkTheme" : "lightTheme");
      }
    }
  }, []);

  // Apply theme whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === "lightTheme" ? "darkTheme" : "lightTheme"
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
