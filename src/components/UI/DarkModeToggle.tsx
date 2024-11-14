"use client";

import React, { useEffect, useState } from "react";

const DarkModeToggle: React.FC = () => {
  const [theme, setTheme] = useState<"lightTheme" | "darkTheme">("lightTheme"); // Default theme: lightTheme

  useEffect(() => {
    // Detect saved theme or system preference
    const savedTheme = localStorage.getItem("theme") as "lightTheme" | "darkTheme" | null;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (systemPrefersDark ? "darkTheme" : "lightTheme");

    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "darkTheme" ? "lightTheme" : "darkTheme";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      className="btn btn-secondary"
      onClick={toggleTheme}
      aria-label="Toggle Theme"
    >
      {theme === "darkTheme" ? "Switch to Light Theme" : "Switch to Dark Theme"}
    </button>
  );
};

export default DarkModeToggle;
