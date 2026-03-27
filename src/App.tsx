import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { SubjectList } from './components/SubjectList';
import { Quiz } from './components/Quiz';
import { AITutor } from './components/AITutor';
import { History } from './components/History';
import { SettingsModal } from './components/SettingsModal';
import { PracticeMode } from './components/PracticeMode';
import { Achievements } from './components/Achievements';
import { Admin } from './components/Admin';
import { LearningSection } from './components/LearningSection';
import { useSettings} from './store';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
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
    if (selectedSubject) {
      return <Quiz subjectId={selectedSubject} onBack={() => setSelectedSubject(null)} />;
    }

    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'learning':
        return <LearningSection />;
      case 'subjects':
        return <SubjectList onSelectSubject={setSelectedSubject} />;
      case 'tutor':
        return <AITutor />;
      case 'history':
        return <History />;
      case 'practice':
        return <PracticeMode onBack={() => setCurrentView('dashboard')} />;
      case 'achievements':
        return <Achievements />;
      case 'admin':
        return <Admin />;
      case 'settings':
        return <Dashboard />;
      default:
        return <Dashboard />;
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
        <SettingsModal onClose={() => setCurrentView('dashboard')} />
      )}
    </div>
  );
}
