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
        light: {
          "color-scheme": "light",
          "primary": "#2e046d", // purple
          "secondary": "#e7ac3b", // yellow
          "accent": "#6c703e", // green
          "neutral": "#444444", // gray
          "base-100": "#ffffff", // white
          "info": "#C8E1E7",
          "success": "#DEF29F",
          "warning": "#F7E589",
          "error": "#F2B6B5",
        },
      },
      "dark",
    ],
  },
} satisfies Config;