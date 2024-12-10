"use client";

import React, { useEffect } from "react";

const DarkModePage: React.FC = () => {
  useEffect(() => {
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = systemPrefersDark ? "darkTheme" : "lightTheme";
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  return (
    <div className="bg-base-100 mt-40">
      <p className="text-primary">Primary</p>
      <p className="text-secondary">Secondary</p>
      <p className="text-accent">Accent</p>
      <p className="text-neutral">neutral</p>
      <p className="text-info">info</p>
      <p className="text-base-100">base-100</p>
      <p className="text-success">success</p>
      <p className="text-warning">warning</p>
      <p className="text-error">error</p>
    </div>
  );
};

export default DarkModePage;
