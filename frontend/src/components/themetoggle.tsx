import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('huntrify-theme');
    const root = document.documentElement;
    if (savedTheme === 'light') {
      setIsDark(false);
      root.classList.remove('dark');
    } else {
      setIsDark(true);
      root.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove('dark');
      localStorage.setItem('huntrify-theme', 'light');
      setIsDark(false);
    } else {
      root.classList.add('dark');
      localStorage.setItem('huntrify-theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <motion.button 
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      className="relative w-9 h-9 flex items-center justify-center rounded-full bg-surface border border-border-main text-text-sec hover:text-text-main hover:border-primary/50 transition-colors focus:outline-none overflow-hidden shadow-sm"
      aria-label="Toggle Theme"
    >
      <motion.div
        animate={{ rotate: isDark ? 0 : 180, scale: isDark ? 1 : 0.5, opacity: isDark ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
        className="absolute flex items-center justify-center"
      >
        <i className="ri-moon-line text-[18px] text-white font-normal" />
      </motion.div>

      <motion.div
        animate={{ rotate: !isDark ? 0 : -180, scale: !isDark ? 1 : 0.5, opacity: !isDark ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
        className="absolute flex items-center justify-center"
      >
        <i className="ri-sun-line text-[18px] text-text-main font-normal" />
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
