"use client"

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('dark'); // Default theme set to dark

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const currentTheme = savedTheme || 'dark'; // Default to dark if no saved theme
    setTheme(currentTheme);
    document.documentElement.classList.add(currentTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <button 
      onClick={toggleTheme} 
      className="flex items-center justify-center w-12 h-6 rounded-full bg-blue-100 dark:bg-gray-700 relative border border-gray-400 dark:border-gray-600 focus:outline-none transition-colors duration-300"
      aria-label="Toggle theme"
    >
      <div
        className={`absolute left-0 w-6 h-6 bg-black dark:bg-white rounded-full transform transition-transform duration-300 ${theme === 'dark' ? 'translate-x-6' : ''}`}
      >
        {theme === 'light' ? (
          <Moon className="w-4 h-4 text-white dark: m-auto mt-1" />
        ) : (
          <Sun className="w-4 h-4 text-black m-auto mt-1" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
