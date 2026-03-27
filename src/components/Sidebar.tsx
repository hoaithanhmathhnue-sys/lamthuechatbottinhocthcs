import React from 'react';
import { BookOpen, BrainCircuit, LayoutDashboard, History, Settings, Gamepad2, Trophy, ClipboardList, BookMarked } from 'lucide-react';
import { cn } from '../lib/utils';
import { useGamification } from '../store';
import { XP_PER_LEVEL } from '../data/demo';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export function Sidebar({ currentView, setCurrentView, isMobileOpen, setIsMobileOpen }: SidebarProps) {
  const [gamification] = useGamification();

  const navItems = [
    { id: 'dashboard', label: 'Tổng quan', icon: LayoutDashboard },
    { id: 'learning', label: 'Kiến thức', icon: BookMarked },
    { id: 'subjects', label: 'Học tập', icon: BookOpen },
    { id: 'practice', label: 'Luyện tập', icon: Gamepad2 },
    { id: 'tutor', label: 'Gia sư AI', icon: BrainCircuit },
    { id: 'achievements', label: 'Thành tích', icon: Trophy },
    { id: 'admin', label: 'Quản trị', icon: ClipboardList },
    { id: 'history', label: 'Lịch sử', icon: History },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:block",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
            <BrainCircuit className="w-8 h-8" />
            <span>AI Edu</span>
          </div>
        </div>

        {/* XP Mini Bar */}
        <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-bold text-indigo-600">Lv.{gamification.level}</span>
            <span className="text-slate-400">{gamification.xp % XP_PER_LEVEL}/{XP_PER_LEVEL} XP</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all"
              style={{ width: `${((gamification.xp % XP_PER_LEVEL) / XP_PER_LEVEL) * 100}%` }}
            />
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  setIsMobileOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium",
                  isActive 
                    ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-600" 
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "text-indigo-600" : "text-slate-400")} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={() => {
              setCurrentView('settings');
              setIsMobileOpen(false);
            }}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-sm font-medium",
              currentView === 'settings'
                ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-600" 
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
            )}
          >
            <Settings className="w-5 h-5 text-slate-400" />
            Cài đặt
          </button>
        </div>
      </div>
    </>
  );
}
