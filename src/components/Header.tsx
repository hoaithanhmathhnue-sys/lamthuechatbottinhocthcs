import React from 'react';
import { Menu, Moon, Sun, Zap } from 'lucide-react';
import { useSettings, useGamification, useTheme } from '../store';

interface HeaderProps {
  setIsMobileOpen: (open: boolean) => void;
}

export function Header({ setIsMobileOpen }: HeaderProps) {
  const [settings] = useSettings();
  const [gamification] = useGamification();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
        >
          <Menu className="w-6 h-6 text-slate-600 dark:text-slate-300" />
        </button>
        <h1 className="text-xl font-semibold text-slate-800 dark:text-white hidden sm:block">
          Nền tảng học tập Tin học AI
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {/* XP Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 rounded-full text-sm font-bold">
          <Zap className="w-3.5 h-3.5" />
          {gamification.xp} XP
        </div>

        {/* API Key warning */}
        {!settings.apiKey && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full text-sm font-medium border border-amber-200">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            Chưa có API Key
          </div>
        )}

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={theme === 'light' ? 'Chuyển Dark Mode' : 'Chuyển Light Mode'}
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5 text-slate-600" />
          ) : (
            <Sun className="w-5 h-5 text-amber-400" />
          )}
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white dark:border-slate-800 shadow-sm">
          {gamification.level}
        </div>
      </div>
    </header>
  );
}
