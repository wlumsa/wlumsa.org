import { useEffect, useState } from "react";
import {FaMoon, FaSun} from 'react-icons/fa'

const ThemeToggleButton = () => {
  const [theme, setTheme] = useState('mytheme'); //Added Theme State

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'mytheme';
    setTheme(savedTheme); // Set theme from localStorage or default
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'mytheme' ? 'mydark' : 'mytheme';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-4 left-4 p-2 bg-primary text-white rounded-full shadow-lg"
      aria-label="Toggle Theme"
    >
      {theme === 'mytheme' ? <FaMoon /> : <FaSun />}
    </button>
  );
};

export default ThemeToggleButton;