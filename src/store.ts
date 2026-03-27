import { useState, useEffect, useCallback, useMemo } from 'react';
import { Settings, Progress, Session, ChatMessage, GamificationState, QuestionAnswer, CostRecord, SavedQuizState, ThemeMode, Question, GradeLevel, Subject } from './types';
import { ALL_ACHIEVEMENTS, DEMO_SUBJECTS } from './data/demo';

const defaultSettings: Settings = {
  theme: 'light',
  soundEnabled: true,
  autoSave: true,
  apiKey: '',
  apiKeys: [],
  selectedModel: 'gemini-2.5-flash',
  autoModelSelect: true,
};

const defaultProgress: Progress = {
  totalAttempts: 0,
  averageScore: 0,
  streakDays: 0,
  weakTopics: [],
  lastStudyDate: undefined,
};

const defaultGamification: GamificationState = {
  xp: 0,
  level: 1,
  badges: [],
  achievements: ALL_ACHIEVEMENTS.map(a => ({ ...a })),
  totalCorrect: 0,
  totalAnswered: 0,
  longestStreak: 0,
};

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}

export function useSettings() {
  return useLocalStorage<Settings>('ai_edu_settings', defaultSettings);
}

export function useProgress() {
  return useLocalStorage<Progress>('ai_edu_progress', defaultProgress);
}

export function useSessions() {
  return useLocalStorage<Session[]>('ai_edu_sessions', []);
}

export function useChatHistory() {
  return useLocalStorage<ChatMessage[]>('ai_edu_chat_history', []);
}

export function useGamification() {
  return useLocalStorage<GamificationState>('ai_edu_gamification', defaultGamification);
}

export function useWrongAnswers() {
  return useLocalStorage<QuestionAnswer[]>('ai_edu_wrong_answers', []);
}

export function useCostTracker() {
  return useLocalStorage<CostRecord[]>('ai_edu_costs', []);
}

export function useSavedQuiz() {
  return useLocalStorage<SavedQuizState | null>('ai_edu_saved_quiz', null);
}

export function useCustomQuestions() {
  return useLocalStorage<Question[]>('ai_edu_custom_questions', []);
}

export function useReadLessons() {
  return useLocalStorage<string[]>('ai_edu_read_lessons', []);
}

// Theme hook
export function useTheme() {
  const [settings, setSettings] = useSettings();

  const toggleTheme = useCallback(() => {
    const newTheme: ThemeMode = settings.theme === 'light' ? 'dark' : 'light';
    setSettings({ ...settings, theme: newTheme });
  }, [settings, setSettings]);

  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [settings.theme]);

  return { theme: settings.theme, toggleTheme };
}

export function useSelectedGrade() {
  return useLocalStorage<GradeLevel | null>('ai_edu_selected_grade', null);
}

export function useCustomSubjects() {
  return useLocalStorage<Subject[]>('ai_edu_custom_subjects', []);
}

// Merge DEMO_SUBJECTS + custom subjects
export function useAllSubjects() {
  const [customSubjects, setCustomSubjects] = useCustomSubjects();

  const allSubjects = useMemo(() => {
    // Custom subjects override demo subjects with same id
    const demoIds = new Set(customSubjects.map((s: Subject) => s.id));
    const filteredDemo = (DEMO_SUBJECTS as Subject[]).filter(s => !demoIds.has(s.id));
    return [...filteredDemo, ...customSubjects];
  }, [customSubjects, DEMO_SUBJECTS]);

  const addSubject = useCallback((subject: Omit<Subject, 'id'>) => {
    const newSubject: Subject = {
      ...subject,
      id: `custom_subj_${Date.now()}`,
    };
    setCustomSubjects([...customSubjects, newSubject]);
    return newSubject;
  }, [customSubjects, setCustomSubjects]);

  const updateSubject = useCallback((id: string, updates: Partial<Subject>) => {
    // If it's a demo subject being edited, copy it to custom
    const isDemo = (DEMO_SUBJECTS as Subject[]).some(s => s.id === id) && !customSubjects.some(s => s.id === id);
    if (isDemo) {
      const original = (DEMO_SUBJECTS as Subject[]).find(s => s.id === id)!;
      setCustomSubjects([...customSubjects, { ...original, ...updates }]);
    } else {
      setCustomSubjects(customSubjects.map(s => s.id === id ? { ...s, ...updates } : s));
    }
  }, [customSubjects, setCustomSubjects, DEMO_SUBJECTS]);

  const deleteSubject = useCallback((id: string) => {
    setCustomSubjects(customSubjects.filter(s => s.id !== id));
  }, [customSubjects, setCustomSubjects]);

  return { allSubjects, customSubjects, addSubject, updateSubject, deleteSubject };
}
