import React, { useState } from 'react';
import { DEMO_QUESTIONS } from '../data/demo';
import { useCustomQuestions, useWrongAnswers, useGamification, useSelectedGrade } from '../store';
import { Question, GradeLevel } from '../types';
import {
  Zap, RotateCcw, FileText, Layers, ArrowLeft, ArrowRight,
  CheckCircle2, XCircle, Clock
} from 'lucide-react';
import { cn } from '../lib/utils';
import { GradeSelector } from './GradeSelector';

interface Props {
  onBack: () => void;
}

type PracticeView = 'hub' | 'flashcard' | 'speed' | 'review' | 'exam';

export function PracticeMode({ onBack }: Props) {
  const [view, setView] = useState<PracticeView>('hub');
  const [customQuestions] = useCustomQuestions();
  const [wrongAnswers] = useWrongAnswers();
  const [selectedGrade, setSelectedGrade] = useSelectedGrade();

  // Filter all questions by grade
  const allQuestions = [...DEMO_QUESTIONS, ...customQuestions]
    .filter(q => q.type === 'multiple_choice')
    .filter(q => !selectedGrade || q.grade === selectedGrade);

  if (view === 'hub') {
    return (
      <PracticeHub
        onBack={onBack}
        onSelect={setView}
        wrongCount={wrongAnswers.length}
        selectedGrade={selectedGrade}
        onSelectGrade={setSelectedGrade}
        questionCount={allQuestions.length}
      />
    );
  }
  if (view === 'flashcard') {
    return <FlashcardMode questions={allQuestions} onBack={() => setView('hub')} />;
  }
  if (view === 'speed') {
    return <SpeedQuiz questions={allQuestions} onBack={() => setView('hub')} />;
  }
  if (view === 'review') {
    const reviewQuestions = wrongAnswers
      .map(wa => wa.question)
      .filter(q => q.type === 'multiple_choice')
      .filter(q => !selectedGrade || q.grade === selectedGrade);
    return <FlashcardMode questions={reviewQuestions.length > 0 ? reviewQuestions : allQuestions.slice(0, 5)} onBack={() => setView('hub')} isReview />;
  }
  if (view === 'exam') {
    return <ExamMode questions={allQuestions} onBack={() => setView('hub')} />;
  }

  return null;
}

// === HUB ===
function PracticeHub({ onBack, onSelect, wrongCount, selectedGrade, onSelectGrade, questionCount }: {
  onBack: () => void;
  onSelect: (v: PracticeView) => void;
  wrongCount: number;
  selectedGrade: GradeLevel | null;
  onSelectGrade: (g: GradeLevel | null) => void;
  questionCount: number;
}) {
  const modes = [
    { id: 'flashcard' as PracticeView, name: 'Flashcard', desc: 'Lật thẻ ôn tập kiến thức', icon: Layers, color: 'bg-blue-500', gradient: 'from-blue-500 to-cyan-500' },
    { id: 'speed' as PracticeView, name: 'Speed Quiz', desc: 'Trả lời nhanh trong 10 giây', icon: Zap, color: 'bg-amber-500', gradient: 'from-amber-500 to-orange-500' },
    { id: 'review' as PracticeView, name: 'Ôn câu sai', desc: `${wrongCount} câu cần ôn lại`, icon: RotateCcw, color: 'bg-rose-500', gradient: 'from-rose-500 to-pink-500' },
    { id: 'exam' as PracticeView, name: 'Thi thử', desc: 'Mô phỏng đề thi thật', icon: FileText, color: 'bg-emerald-500', gradient: 'from-emerald-500 to-teal-500' },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-8 animate-fade-in">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Chế độ luyện tập</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Chọn cách luyện tập phù hợp với bạn</p>
        </div>
      </div>

      {/* Grade Selector */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5">
        <GradeSelector selectedGrade={selectedGrade} onSelectGrade={onSelectGrade} />
      </div>

      {/* Question count info */}
      {selectedGrade && (
        <div className={cn(
          "flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border",
          questionCount > 0
            ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800"
            : "bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800"
        )}>
          {questionCount > 0
            ? `📚 Lớp ${selectedGrade}: ${questionCount} câu hỏi trắc nghiệm`
            : `⚠️ Lớp ${selectedGrade}: Chưa có câu hỏi. Hãy thêm câu hỏi qua AI hoặc Admin!`
          }
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modes.map(mode => {
          const Icon = mode.icon;
          return (
            <button
              key={mode.id}
              onClick={() => onSelect(mode.id)}
              disabled={questionCount === 0}
              className={cn(
                "group bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 text-left hover:shadow-lg transition-all hover:-translate-y-1",
                questionCount === 0 && "opacity-50 cursor-not-allowed hover:shadow-sm hover:translate-y-0"
              )}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${mode.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{mode.name}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{mode.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// === FLASHCARD ===
function FlashcardMode({ questions, onBack, isReview }: { questions: Question[]; onBack: () => void; isReview?: boolean }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const shuffled = useState(() => [...questions].sort(() => Math.random() - 0.5))[0];
  const q = shuffled[index];

  if (!q) {
    return (
      <div className="p-8 text-center animate-fade-in">
        <div className="text-6xl mb-4">📭</div>
        <h2 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">
          {isReview ? 'Chưa có câu sai để ôn!' : 'Không có câu hỏi'}
        </h2>
        <button onClick={onBack} className="mt-4 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium">Quay lại</button>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 font-medium">
          <ArrowLeft className="w-5 h-5" />
          Quay lại
        </button>
        <span className="text-sm font-medium text-slate-500">
          {index + 1} / {shuffled.length}
        </span>
      </div>

      {/* Card */}
      <div
        className="flip-card cursor-pointer"
        onClick={() => setFlipped(!flipped)}
        style={{ minHeight: 280 }}
      >
        <div className={`flip-card-inner relative w-full ${flipped ? 'flipped' : ''}`} style={{ minHeight: 280 }}>
          {/* Front */}
          <div className="flip-card-front absolute inset-0 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border-2 border-indigo-100 dark:border-indigo-900 p-8 flex flex-col items-center justify-center text-center">
            <div className="text-xs uppercase tracking-wider text-indigo-500 font-bold mb-4">Câu hỏi</div>
            <p className="text-lg font-semibold text-slate-900 dark:text-white leading-relaxed">{q.content}</p>
            <p className="text-xs text-slate-400 mt-6">Nhấn để xem đáp án</p>
          </div>
          {/* Back */}
          <div className="flip-card-back absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center text-center text-white">
            <div className="text-xs uppercase tracking-wider text-indigo-200 font-bold mb-4">Đáp án</div>
            <p className="text-xl font-bold mb-3">{q.correctAnswer}</p>
            {q.explanation && <p className="text-sm text-indigo-100 leading-relaxed">{q.explanation}</p>}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => { setIndex(Math.max(0, index - 1)); setFlipped(false); }}
          disabled={index === 0}
          className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium disabled:opacity-30"
        >
          <ArrowLeft className="w-4 h-4" /> Trước
        </button>
        <button
          onClick={() => { setIndex(Math.min(shuffled.length - 1, index + 1)); setFlipped(false); }}
          disabled={index === shuffled.length - 1}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-medium disabled:opacity-30"
        >
          Tiếp <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// === SPEED QUIZ ===
function SpeedQuiz({ questions, onBack }: { questions: Question[]; onBack: () => void }) {
  const shuffled = useState(() => [...questions].sort(() => Math.random() - 0.5).slice(0, 10))[0];
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [selected, setSelected] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const [gamification, setGamification] = useGamification();

  const q = shuffled[index];

  React.useEffect(() => {
    if (finished || selected) return;
    if (timeLeft <= 0) {
      handleNext();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, finished, selected]);

  const handleSelect = (option: string) => {
    if (selected) return;
    setSelected(option);
    if (option === q?.correctAnswer) {
      setScore(s => s + 1);
    }
    setTimeout(() => handleNext(), 800);
  };

  const handleNext = () => {
    if (index >= shuffled.length - 1) {
      // Award XP
      const xpEarned = score * 15;
      setGamification({
        ...gamification,
        xp: gamification.xp + xpEarned,
        level: Math.floor((gamification.xp + xpEarned) / 100) + 1,
        totalAnswered: gamification.totalAnswered + shuffled.length,
        totalCorrect: gamification.totalCorrect + score,
      });
      setFinished(true);
    } else {
      setIndex(i => i + 1);
      setSelected(null);
      setTimeLeft(10);
    }
  };

  if (finished) {
    const pct = Math.round((score / shuffled.length) * 100);
    return (
      <div className="p-8 max-w-md mx-auto text-center animate-slide-up space-y-6">
        <div className="text-6xl">{pct >= 80 ? '🎉' : pct >= 50 ? '👍' : '💪'}</div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{pct}%</h2>
        <p className="text-slate-500 dark:text-slate-400">{score}/{shuffled.length} câu đúng • +{score * 15} XP</p>
        <button onClick={onBack} className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold">
          Quay lại
        </button>
      </div>
    );
  }

  if (!q) return null;

  return (
    <div className="p-6 max-w-2xl mx-auto animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-medium">
          <ArrowLeft className="w-5 h-5" /> Thoát
        </button>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-500">{index + 1}/{shuffled.length}</span>
          <div className={cn(
            "flex items-center gap-1 px-3 py-1.5 rounded-lg font-mono font-bold text-lg",
            timeLeft <= 3 ? "bg-rose-100 text-rose-600" : "bg-indigo-100 text-indigo-600"
          )}>
            <Clock className="w-4 h-4" />
            {timeLeft}s
          </div>
        </div>
      </div>

      {/* Timer bar */}
      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-1000", timeLeft <= 3 ? "bg-rose-500" : "bg-indigo-500")}
          style={{ width: `${(timeLeft / 10) * 100}%` }}
        />
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 text-center">
        <p className="text-xl font-bold text-slate-900 dark:text-white leading-relaxed">{q.content}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {q.options?.map((opt, i) => {
          const isSelected = selected === opt;
          const isCorrect = opt === q.correctAnswer;
          let cls = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-950';
          if (selected) {
            if (isCorrect) cls = 'bg-emerald-50 dark:bg-emerald-950 border-emerald-500 text-emerald-900 dark:text-emerald-200';
            else if (isSelected) cls = 'bg-rose-50 dark:bg-rose-950 border-rose-500 text-rose-900 dark:text-rose-200';
            else cls = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-50';
          }
          return (
            <button
              key={i}
              onClick={() => handleSelect(opt)}
              disabled={!!selected}
              className={`p-4 rounded-xl border-2 font-medium text-left transition-all ${cls}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// === EXAM MODE ===
function ExamMode({ questions, onBack }: { questions: Question[]; onBack: () => void }) {
  const examQs = useState(() => [...questions].sort(() => Math.random() - 0.5).slice(0, 20))[0];
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes
  const [gamification, setGamification] = useGamification();

  React.useEffect(() => {
    if (submitted || timeLeft <= 0) {
      if (!submitted) handleSubmit();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, submitted]);

  const handleSubmit = () => {
    setSubmitted(true);
    const correct = examQs.filter((q, i) => answers[i] === q.correctAnswer).length;
    const xpEarned = correct * 10;
    setGamification({
      ...gamification,
      xp: gamification.xp + xpEarned,
      level: Math.floor((gamification.xp + xpEarned) / 100) + 1,
      totalAnswered: gamification.totalAnswered + examQs.length,
      totalCorrect: gamification.totalCorrect + correct,
    });
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  if (submitted) {
    const correct = examQs.filter((q, i) => answers[i] === q.correctAnswer).length;
    const pct = Math.round((correct / examQs.length) * 100);
    return (
      <div className="p-6 max-w-3xl mx-auto animate-slide-up space-y-6">
        <div className="text-center space-y-4 bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="text-5xl">{pct >= 80 ? '🎓' : pct >= 50 ? '📝' : '📖'}</div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Kết quả thi thử</h2>
          <p className="text-4xl font-bold text-indigo-600">{pct} điểm</p>
          <p className="text-slate-500 dark:text-slate-400">{correct}/{examQs.length} câu đúng • +{correct * 10} XP</p>
          <p className={pct >= 80 ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>
            {pct >= 80 ? '✅ ĐẠT — Tuyệt vời!' : '⚠️ Cần cố gắng thêm'}
          </p>
        </div>

        {/* Review */}
        <div className="space-y-3">
          {examQs.map((q, i) => {
            const isCorrect = answers[i] === q.correctAnswer;
            return (
              <div key={i} className={`p-4 rounded-xl border-2 ${isCorrect ? 'border-emerald-200 bg-emerald-50 dark:bg-emerald-950 dark:border-emerald-800' : 'border-rose-200 bg-rose-50 dark:bg-rose-950 dark:border-rose-800'}`}>
                <p className="font-medium text-sm mb-1">
                  {isCorrect ? <CheckCircle2 className="w-4 h-4 inline text-emerald-600 mr-1" /> : <XCircle className="w-4 h-4 inline text-rose-600 mr-1" />}
                  Câu {i + 1}: {q.content}
                </p>
                {!isCorrect && (
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Bạn chọn: <strong>{answers[i] || '(chưa trả lời)'}</strong> • Đáp án: <strong className="text-emerald-700 dark:text-emerald-400">{q.correctAnswer}</strong>
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <button onClick={onBack} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold">Quay lại</button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-medium">
          <ArrowLeft className="w-5 h-5" /> Thoát
        </button>
        <h3 className="font-bold text-slate-900 dark:text-white">Thi thử ({examQs.length} câu)</h3>
        <div className={cn(
          "flex items-center gap-1 px-3 py-1.5 rounded-lg font-mono font-bold",
          timeLeft <= 60 ? "bg-rose-100 text-rose-600" : "bg-indigo-100 text-indigo-600"
        )}>
          <Clock className="w-4 h-4" />
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="space-y-6">
        {examQs.map((q, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <p className="font-bold text-slate-900 dark:text-white mb-4">Câu {i + 1}: {q.content}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {q.options?.map((opt, j) => (
                <button
                  key={j}
                  onClick={() => setAnswers({ ...answers, [i]: opt })}
                  className={cn(
                    "p-3 rounded-xl border-2 text-left text-sm font-medium transition-all",
                    answers[i] === opt
                      ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-200"
                      : "border-slate-200 dark:border-slate-700 hover:border-indigo-300"
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-lg"
      >
        Nộp bài ({Object.keys(answers).length}/{examQs.length} đã trả lời)
      </button>
    </div>
  );
}
