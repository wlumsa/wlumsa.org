import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes:[ 
      {
        lightTheme: { // Light theme
          "primary": "#2e046d",   // Purple
          "secondary": "#e7ac3b", // Yellow
          "accent": "#6c703e",    // Green
          "neutral": "#444444",   // Gray
          "base-100": "#ffffff",  // White
          "info": "#C8E1E7",
          "success": "#DEF29F",
          "warning": "#F7E589",
          "error": "#F2B6B5",
        }, 
        IIA: { 
          "primary": "#3EB169",   // Green
          "secondary": "#F3FAF6", // light green
          "accent": "#6c703e",    // Green
          "neutral": "#444444",   // Gray
          "base-100": "#ffffff",  // White
          "info": "#C8E1E7",
          "success": "#DEF29F",
          "warning": "#F7E589",
          "error": "#F2B6B5",
        }, 
        darkTheme: {
          "primary": "#2e046d",   // Purple
          "secondary": "#e7ac3b", // Yellow
          "accent": "#6c703e",    // Green
          "neutral": "#444444",   // Gray
          "info": "#C8E1E7",      
          "base-100": "#2A2929",  // Dark background
          "success": "#DEF29F",   
          "warning": "#F7E589",   
          "error": "#F2B6B5",     
        },
        
      },
    ],
    base: true,
    styled: true,
    utils: true, 
  },
} satisfies Config;
