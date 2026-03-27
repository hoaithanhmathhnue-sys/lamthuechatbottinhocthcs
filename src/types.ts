export type GradeLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface Subject {
  id: string;
  name: string;
  icon: string;
  questionsCount: number;
  color?: string;
  grade?: GradeLevel;
}

export interface Question {
  id: string;
  subjectId: string;
  content: string;
  type: 'multiple_choice' | 'programming' | 'theory';
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  isCustom?: boolean; // AI-generated
  grade?: GradeLevel;
}

export interface Session {
  id: string;
  subjectId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  date: string;
  mode?: QuizMode;
  xpEarned?: number;
}

export interface Progress {
  totalAttempts: number;
  averageScore: number;
  streakDays: number;
  weakTopics: string[];
  lastStudyDate?: string;
}

export type ThemeMode = 'light' | 'dark';

export interface ApiKeyEntry {
  key: string;
  label: string;
  usageCount: number;
  lastUsed?: string;
  isExhausted?: boolean;
}

export interface Settings {
  theme: ThemeMode;
  soundEnabled: boolean;
  autoSave: boolean;
  apiKey: string;
  apiKeys: ApiKeyEntry[];
  selectedModel: string;
  autoModelSelect: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  images?: string[]; // base64
}

export type QuizMode = 'standard' | 'speed' | 'review' | 'exam' | 'flashcard';

export interface QuestionAnswer {
  questionId: string;
  question: Question;
  userAnswer: string;
  isCorrect: boolean;
  date: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  unlockedAt?: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  target: number;
  current: number;
  completed: boolean;
  completedAt?: string;
}

export interface GamificationState {
  xp: number;
  level: number;
  badges: Badge[];
  achievements: Achievement[];
  totalCorrect: number;
  totalAnswered: number;
  longestStreak: number;
}

export interface CostRecord {
  date: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  cost: number;
}

export interface SavedQuizState {
  subjectId: string;
  currentIndex: number;
  score: number;
  answers: Record<string, string>;
  timeLeft: number;
  mode: QuizMode;
  savedAt: string;
  questionIds: string[];
}

export interface TextbookLesson {
  id: string;
  title: string;
  content: string; // Markdown content
  keyConcepts: string[];
  grade: GradeLevel;
  chapterIndex: number;
  lessonIndex: number;
  icon?: string;
}

export interface TextbookChapter {
  id: string;
  title: string;
  description: string;
  lessons: TextbookLesson[];
  grade: GradeLevel;
  icon: string;
}
