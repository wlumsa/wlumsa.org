import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    
    themes: 
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
          "primary": "#4b0271", 
          "secondary": "#b17b03", 
          "accent": "#3b3d20", 
          "neutral": "#777777", 
          "base-100": "#333333", 
          "info": "#447c8f", 
          "success": "#5b7846", 
          "warning": "#72623c", 
          "error": "#7f4040", 
        },
      },
    ],
    darkTheme:"mytheme",
  },
} satisfies Config;
