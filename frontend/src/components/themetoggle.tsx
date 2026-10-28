import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('huntrify-theme');
      if (savedTheme === 'light') return false;
      if (savedTheme === 'dark') return true;
      return document.documentElement.classList.contains('dark');
    }
    return true;
  });

  useEffect(() => {
    const handleThemeChange = () => {
      const savedTheme = localStorage.getItem('huntrify-theme');
      const root = document.documentElement;
      const isSystem = savedTheme === 'system';
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const darkActive = savedTheme === 'dark' || (isSystem && systemDark) || (!savedTheme && systemDark) || !savedTheme;
      
      setIsDark(darkActive);
      if (darkActive) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    window.addEventListener('huntrify-theme-change', handleThemeChange);
    window.addEventListener('storage', handleThemeChange);
    return () => {
      window.removeEventListener('huntrify-theme-change', handleThemeChange);
      window.removeEventListener('storage', handleThemeChange);
    };
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const nextDark = !isDark;
    const newTheme = nextDark ? 'dark' : 'light';
    
    setIsDark(nextDark);
    if (nextDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('huntrify-theme', newTheme);
    window.dispatchEvent(new CustomEvent('huntrify-theme-change', { detail: newTheme }));
  };

  return (
    <motion.button 
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      className="relative w-9 h-9 flex items-center justify-center rounded-full bg-surface border border-border-main text-text-sec hover:text-text-main hover:border-primary/50 transition-colors focus:outline-none overflow-hidden shadow-sm cursor-pointer"
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
