import React, { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(true); // Default theme from theme.md

  useEffect(() => {
    // Read from localStorage or apply default
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
    <button 
      onClick={toggleTheme}
      className="group relative block w-[64px] h-[32px] rounded-full bg-surface border border-border-main cursor-pointer transition-all duration-300 hover:border-primary/50 focus:outline-none"
      aria-label="Toggle Theme"
    >
      {/* Sliding Indicator (Spring Animation) */}
      <div 
        className={`absolute left-[3px] top-[3px] w-[24px] h-[24px] rounded-full bg-primary shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isDark ? "translate-x-[32px]" : "translate-x-0"
        }`}
      />
      
      {/* Sun Icon (Left Side) */}
      <div className="absolute left-[3px] top-[3px] w-[24px] h-[24px] flex items-center justify-center z-10 pointer-events-none">
        <FiSun 
          size={14} 
          strokeWidth={2.5}
          className={`transition-colors duration-300 ${!isDark ? 'text-white' : 'text-text-sec group-hover:text-text-main'}`} 
        />
      </div>

      {/* Moon Icon (Right Side) */}
      <div className="absolute right-[3px] top-[3px] w-[24px] h-[24px] flex items-center justify-center z-10 pointer-events-none">
        <FiMoon 
          size={14} 
          strokeWidth={2.5}
          className={`transition-colors duration-300 ${isDark ? 'text-white' : 'text-text-sec group-hover:text-text-main'}`} 
        />
      </div>
    </button>
  );
};

export default ThemeToggle;
