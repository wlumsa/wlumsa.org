"use client";

import React, { useEffect } from "react";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const applyTheme = () => {
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const theme = systemPrefersDark ? "darkTheme" : "lightTheme";
        document.documentElement.setAttribute("data-theme", theme);
      };

      // Apply theme on mount
      applyTheme();

      // Listen for OS changes
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", applyTheme);

      // Cleanup
      return () => mediaQuery.removeEventListener("change", applyTheme);
    }
  }, []);

  return <>{children}</>;
}
