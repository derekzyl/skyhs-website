'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export default function ThemeToggle({ className = '', showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className={`p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 bg-white/50 dark:bg-slate-900/50 ${className}`}
      >
        <span className="material-symbols-outlined text-lg opacity-0">dark_mode</span>
      </button>
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`p-2 rounded-xl border transition-all duration-200 flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-primary/20 ${
        isDark
          ? 'bg-slate-900 border-slate-800 text-amber-400 hover:text-amber-300 hover:bg-slate-800 shadow-xs'
          : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 shadow-xs'
      } ${className}`}
    >
      <span className="material-symbols-outlined text-lg transition-transform duration-300 transform rotate-0 hover:rotate-45">
        {isDark ? 'light_mode' : 'dark_mode'}
      </span>
      {showLabel && (
        <span className="text-xs font-semibold">
          {isDark ? 'Light' : 'Dark'}
        </span>
      )}
    </button>
  );
}
