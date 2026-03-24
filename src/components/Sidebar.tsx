import React from 'react';
import { BrainCircuit, LayoutDashboard, History, Settings, Gamepad2, ClipboardList, User } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export function Sidebar({ currentView, setCurrentView, isMobileOpen, setIsMobileOpen }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Tổng quan', icon: LayoutDashboard },
    { id: 'practice', label: 'Luyện tập', icon: Gamepad2 },
    { id: 'tutor', label: 'Gia sư AI', icon: BrainCircuit },
    { id: 'admin', label: 'Quản trị', icon: ClipboardList },
    { id: 'history', label: 'Lịch sử', icon: History },
    { id: 'author', label: 'Tác giả', icon: User },
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
