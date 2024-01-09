import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: { // Light theme
          "primary": "#2e046d", // Purple
          "secondary": "#e7ac3b", // Yellow
          "accent": "#6c703e", // Green
          "neutral": "#444444", // Gray
          "base-100": "#ffffff", // White
          "info": "#C8E1E7",
          "success": "#DEF29F",
          "warning": "#F7E589",
          "error": "#F2B6B5",
        },
      },
      {
        mydark: {
          "primary": "#e7ac3b", 
          "secondary": "#e7ac3b", 
          "accent": "#37cdbe", 
          "neutral": "#444444", 
          "base-100": "#1f2937", 
          "info": "#3b82f6", 
          "success": "#10b981", 
          "warning": "#fbbf24", 
          "error": "#ef4444", 
        },
      },
    ],
  },
} satisfies Config;
