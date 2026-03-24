import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { AITutor } from './components/AITutor';
import { History } from './components/History';
import { SettingsModal } from './components/SettingsModal';
import { AuthorProfile } from './components/AuthorProfile';
import { useSettings} from './store';

export default function App() {
  const [currentView, setCurrentView] = useState('tutor');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [settings] = useSettings();

  // Apply theme on mount
  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  const renderContent = () => {
    switch (currentView) {
      case 'tutor':
        return <AITutor />;
      case 'history':
        return <History />;
      case 'author':
        return <AuthorProfile />;
      case 'settings':
        return <AITutor />;
      default:
        return <AITutor />;
    }
  };



  return (
    <div className={`flex h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-300`}>
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header setIsMobileOpen={setIsMobileOpen} />
        
        <main className="flex-1 overflow-y-auto relative">
          {renderContent()}
        </main>
      </div>

      {currentView === 'settings' && (
        <SettingsModal onClose={() => setCurrentView('tutor')} />
      )}
    </div>
  );
}
