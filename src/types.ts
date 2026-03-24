export type GradeLevel = 6 | 7 | 8 | 9;

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
