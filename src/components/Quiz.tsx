import React, { useState, useEffect } from 'react';
import { DEMO_QUESTIONS } from '../data/demo';
import { useProgress, useSessions, useSettings, useGamification, useWrongAnswers, useCustomQuestions, useSavedQuiz, useSelectedGrade, useAllSubjects } from '../store';
import { callGeminiAI } from '../lib/gemini';
import { Question } from '../types';
import { ArrowLeft, Clock, CheckCircle2, XCircle, BrainCircuit, Loader2, Zap } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Swal from 'sweetalert2';
import { cn } from '../lib/utils';

interface QuizProps {
  subjectId: string;
  onBack: () => void;
}

export function Quiz({ subjectId, onBack }: QuizProps) {
  const [settings] = useSettings();
  const [progress, setProgress] = useProgress();
  const [sessions, setSessions] = useSessions();
  const [gamification, setGamification] = useGamification();
  const [wrongAnswers, setWrongAnswers] = useWrongAnswers();
  const [customQuestions] = useCustomQuestions();
  const [savedQuiz, setSavedQuiz] = useSavedQuiz();
  const [selectedGrade] = useSelectedGrade();
  const { allSubjects } = useAllSubjects();
  
  const subject = allSubjects.find(s => s.id === subjectId);
  const allQuestions = [...DEMO_QUESTIONS, ...customQuestions]
    .filter(q => q.subjectId === subjectId)
    .filter(q => !selectedGrade || q.grade === selectedGrade);
  const questions = allQuestions.length > 0 ? allQuestions : DEMO_QUESTIONS.filter(q => q.subjectId === subjectId);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [xpEarnedThisQuiz, setXpEarnedThisQuiz] = useState(0);
  
  const currentQuestion = questions[currentIndex];

  // Restore saved quiz
  useEffect(() => {
    if (savedQuiz && savedQuiz.subjectId === subjectId) {
      Swal.fire({
        title: 'Khôi phục bài làm?',
        text: `Bạn có bài quiz chưa hoàn thành (câu ${savedQuiz.currentIndex + 1}, ${Math.floor(savedQuiz.timeLeft / 60)} phút còn lại)`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Khôi phục',
        cancelButtonText: 'Làm mới',
        confirmButtonColor: '#4f46e5',
      }).then(result => {
        if (result.isConfirmed) {
          setCurrentIndex(savedQuiz.currentIndex);
          setScore(savedQuiz.score);
          setTimeLeft(savedQuiz.timeLeft);
        }
        setSavedQuiz(null);
      });
    }
  }, []);

  // Auto-save every 5s
  useEffect(() => {
    if (isSubmitted) return;
    const interval = setInterval(() => {
      setSavedQuiz({
        subjectId,
        currentIndex,
        score,
        answers: {},
        timeLeft,
        mode: 'standard',
        savedAt: new Date().toISOString(),
        questionIds: questions.map(q => q.id),
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, score, timeLeft]);

  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleFinish();
    }
  }, [timeLeft, isSubmitted]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleSubmit = () => {
    if (!selectedAnswer && currentQuestion.type === 'multiple_choice') {
      Swal.fire('Lỗi', 'Vui lòng chọn một đáp án!', 'warning');
      return;
    }
    
    setIsSubmitted(true);
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
      const xp = currentQuestion.difficulty === 'hard' ? 20 : currentQuestion.difficulty === 'medium' ? 15 : 10;
      setXpEarnedThisQuiz(prev => prev + xp);
    } else {
      // Track wrong answer
      setWrongAnswers([...wrongAnswers, {
        questionId: currentQuestion.id,
        question: currentQuestion,
        userAnswer: selectedAnswer || '',
        isCorrect: false,
        date: new Date().toISOString(),
      }]);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
      setAiExplanation(null);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    const finalScore = Math.round((score / questions.length) * 100);
    
    const newSession = {
      id: Date.now().toString(),
      subjectId,
      score: finalScore,
      totalQuestions: questions.length,
      correctAnswers: score,
      timeSpent: 600 - timeLeft,
      date: new Date().toISOString(),
      mode: 'standard' as const,
      xpEarned: xpEarnedThisQuiz,
    };
    
    setSessions([newSession, ...sessions]);
    setSavedQuiz(null);
    
    // Update progress
    const newTotalAttempts = progress.totalAttempts + 1;
    setProgress({
      ...progress,
      totalAttempts: newTotalAttempts,
      averageScore: Math.round(((progress.averageScore * progress.totalAttempts) + finalScore) / newTotalAttempts),
      lastStudyDate: new Date().toISOString(),
    });

    // Update gamification
    const newXp = gamification.xp + xpEarnedThisQuiz;
    setGamification({
      ...gamification,
      xp: newXp,
      level: Math.floor(newXp / 100) + 1,
      totalAnswered: gamification.totalAnswered + questions.length,
      totalCorrect: gamification.totalCorrect + score,
    });

    Swal.fire({
      title: finalScore >= 80 ? '🎉 Xuất sắc!' : '✅ Hoàn thành!',
      html: `
        <p style="font-size:18px;margin:10px 0">Bạn đạt <strong>${finalScore} điểm</strong> (${score}/${questions.length} câu đúng)</p>
        <p style="color:#6366f1;font-weight:bold;font-size:16px">+${xpEarnedThisQuiz} XP</p>
      `,
      icon: finalScore >= 80 ? 'success' : 'info',
      confirmButtonText: 'Quay lại',
      confirmButtonColor: '#4f46e5',
    }).then(() => {
      onBack();
    });
  };

  const askAITutor = async () => {
    if (!settings.apiKey) {
      Swal.fire('Lỗi', 'Vui lòng cấu hình API Key trong Cài đặt', 'error');
      return;
    }
    
    setIsAiLoading(true);
    const prompt = `Giải thích chi tiết câu hỏi sau: "${currentQuestion.content}". 
    ${currentQuestion.type === 'multiple_choice' ? `Các lựa chọn: ${currentQuestion.options?.join(', ')}. Đáp án đúng là: ${currentQuestion.correctAnswer}.` : ''}
    Hãy giải thích tại sao đáp án đó đúng và các đáp án khác sai (nếu có). Nếu là bài tập lập trình, hãy cung cấp code mẫu và phân tích độ phức tạp.`;
    
    const response = await callGeminiAI(prompt, settings.apiKey, settings.selectedModel, [], settings.apiKeys);
    if (response) {
      setAiExplanation(response);
    }
    setIsAiLoading(false);
  };

  if (!currentQuestion) {
    return (
      <div className="p-8 text-center animate-fade-in">
        <div className="text-6xl mb-4">📭</div>
        <h2 className="text-xl font-bold text-slate-700">Chưa có câu hỏi cho môn học này.</h2>
        <p className="text-slate-500 mt-2">Hãy dùng AI để tạo câu hỏi mới!</p>
        <button onClick={onBack} className="mt-4 px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium">Quay lại</button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-medium transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Quay lại</span>
        </button>
        
        <div className="text-lg font-bold text-slate-900 dark:text-white">{subject?.name}</div>
        
        <div className={cn(
          "flex items-center gap-2 font-mono font-bold px-3 py-1.5 rounded-lg border",
          timeLeft <= 60 ? "text-rose-600 bg-rose-50 border-rose-100" : "text-indigo-600 bg-indigo-50 border-indigo-100"
        )}>
          <Clock className="w-5 h-5" />
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
          <span>Câu hỏi {currentIndex + 1} / {questions.length}</span>
          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-amber-600">+{xpEarnedThisQuiz} XP</span>
          </div>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <span className={cn(
              "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
              currentQuestion.difficulty === 'easy' ? "bg-emerald-100 text-emerald-700" :
              currentQuestion.difficulty === 'medium' ? "bg-amber-100 text-amber-700" :
              "bg-rose-100 text-rose-700"
            )}>
              {currentQuestion.difficulty === 'easy' ? 'Dễ' : currentQuestion.difficulty === 'medium' ? 'Trung bình' : 'Khó'}
            </span>
            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-wider">
              {currentQuestion.type === 'multiple_choice' ? 'Trắc nghiệm' : 'Tự luận / Code'}
            </span>
            {currentQuestion.isCustom && (
              <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-bold uppercase tracking-wider">
                AI Generated
              </span>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-relaxed">
            {currentQuestion.content}
          </h2>
        </div>

        <div className="p-6 sm:p-8 bg-slate-50 dark:bg-slate-900">
          {currentQuestion.type === 'multiple_choice' ? (
            <div className="space-y-3">
              {currentQuestion.options?.map((option, idx) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = option === currentQuestion.correctAnswer;
                
                let optionClass = "border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 bg-white dark:bg-slate-800 dark:border-slate-700";
                if (isSubmitted) {
                  if (isCorrect) optionClass = "border-emerald-500 bg-emerald-50 text-emerald-900";
                  else if (isSelected && !isCorrect) optionClass = "border-rose-500 bg-rose-50 text-rose-900";
                  else optionClass = "border-slate-200 bg-white dark:bg-slate-800 opacity-50";
                } else if (isSelected) {
                  optionClass = "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200";
                }

                return (
                  <button
                    key={idx}
                    disabled={isSubmitted}
                    onClick={() => setSelectedAnswer(option)}
                    className={cn(
                      "w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group",
                      optionClass
                    )}
                  >
                    <span className="font-medium text-[15px]">{option}</span>
                    {isSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                    {isSubmitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-500" />}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              <textarea
                placeholder="Nhập câu trả lời hoặc code của bạn vào đây..."
                className="w-full h-48 p-4 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none font-mono text-sm bg-white resize-none"
                disabled={isSubmitted}
              />
            </div>
          )}
        </div>
      </div>

      {/* Actions & Explanations */}
      {isSubmitted && (
        <div className="space-y-6 animate-slide-up">
          {currentQuestion.explanation && (
            <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl">
              <h3 className="font-bold text-emerald-900 flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5" />
                Giải thích ngắn gọn
              </h3>
              <p className="text-emerald-800 leading-relaxed">{currentQuestion.explanation}</p>
            </div>
          )}

          <div className="bg-white dark:bg-slate-800 border border-indigo-100 dark:border-slate-700 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-indigo-900 dark:text-indigo-400 flex items-center gap-2">
                <BrainCircuit className="w-6 h-6 text-indigo-600" />
                Gia sư AI giải thích chi tiết
              </h3>
              {!aiExplanation && !isAiLoading && (
                <button 
                  onClick={askAITutor}
                  className="px-4 py-2 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 rounded-lg font-medium text-sm transition-colors"
                >
                  Hỏi AI ngay
                </button>
              )}
            </div>
            
            {isAiLoading ? (
              <div className="flex items-center justify-center py-8 text-indigo-500">
                <Loader2 className="w-8 h-8 animate-spin" />
                <span className="ml-3 font-medium">AI đang phân tích câu hỏi...</span>
              </div>
            ) : aiExplanation ? (
              <div className="prose prose-slate max-w-none prose-pre:bg-slate-800 prose-pre:text-slate-100 prose-code:text-indigo-600 prose-a:text-indigo-600">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {aiExplanation}
                </ReactMarkdown>
              </div>
            ) : (
              <p className="text-slate-500 text-sm">Nhấn nút "Hỏi AI ngay" để nhận lời giải chi tiết từ Gemini AI.</p>
            )}
          </div>
        </div>
      )}

      {/* Footer Actions */}
      <div className="flex justify-end pt-4">
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
          >
            Kiểm tra đáp án
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-sm"
          >
            {currentIndex < questions.length - 1 ? 'Câu tiếp theo' : 'Hoàn thành bài kiểm tra'}
          </button>
        )}
      </div>
    </div>
  );
}
