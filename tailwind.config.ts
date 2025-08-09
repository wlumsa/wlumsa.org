import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      // --- Light (your community-approved set, unchanged hues) ---
      {
        lightTheme: {
          primary: "#2e046d",               // Purple
          "primary-content": "#ffffff",
          secondary: "#e7ac3b",             // Yellow/Gold
          "secondary-content": "#1a1200",
          accent: "#6c703e",                // Olive green
          "accent-content": "#ffffff",
          neutral: "#444444",               // Gray for chips/badges
          "neutral-content": "#ffffff",

          "base-100": "#ffffff",            // Page bg
          "base-200": "#f7f7f7",
          "base-300": "#eeeeee",
          "base-content": "#1f1f1f",        // Default text

          info: "#C8E1E7",
          "info-content": "#0f2630",
          success: "#DEF29F",
          "success-content": "#14230a",
          warning: "#F7E589",
          "warning-content": "#241b00",
          error: "#F2B6B5",
          "error-content": "#2a0b09",

          // Optional: nicer button hovers
          "--btn-primary-hover": "#250359",
          "--btn-secondary-hover": "#d49a2f",
          "--btn-accent-hover": "#5b6336",
        },
      },

      // --- IIA (kept as-is, with content/base tokens added) ---
      {
        IIA: {
          primary: "#3EB169",               // Green
          "primary-content": "#092114",
          secondary: "#F3FAF6",             // Very light green
          "secondary-content": "#0f2619",
          accent: "#6c703e",                // Olive
          "accent-content": "#ffffff",
          neutral: "#444444",
          "neutral-content": "#ffffff",

          "base-100": "#ffffff",
          "base-200": "#f6fbf8",
          "base-300": "#e9f4ee",
          "base-content": "#132018",

          info: "#C8E1E7",
          "info-content": "#0f2630",
          success: "#DEF29F",
          "success-content": "#14230a",
          warning: "#F7E589",
          "warning-content": "#241b00",
          error: "#F2B6B5",
          "error-content": "#2a0b09",

          "--btn-primary-hover": "#38a160",
          "--btn-secondary-hover": "#e7f5ee",
          "--btn-accent-hover": "#5b6336",
        },
      },

      // --- Dark (tone-shifted for readability on dark surfaces) ---
      {
        darkTheme: {
          "base-100": "#121318",            // Main bg (not pure black)
          "base-200": "#171922",
          "base-300": "#1f2230",
          "base-content": "#f2f3f7",

          primary: "#5f3c8d",               // Your purple, works well on dark
          "primary-content": "#ffffff",
          secondary: "#ecb553",             // Your gold/yellow
          "secondary-content": "#201700",
          accent: "#a0a86c",                // Lightened olive so it pops
          "accent-content": "#14180c",

          // Neutral tuned for dark
          neutral: "#cfd2d6",
          "neutral-content": "#141414",

          info: "#9fd6ea",
          "info-content": "#0c2230",
          success: "#b8e99e",
          "success-content": "#0e2112",
          warning: "#f5e08d",
          "warning-content": "#201800",
          error: "#f4a2a0",
          "error-content": "#2a0b09",

          "--btn-primary-hover": "#533082",
          "--btn-secondary-hover": "#dfaa45",
          "--btn-accent-hover": "#949d61",
        },
      },
    ],
  },
} satisfies Config;
