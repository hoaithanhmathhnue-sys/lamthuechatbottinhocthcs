import React, { useState } from 'react';
import { useSettings, useCustomQuestions } from '../store';
import { generateQuestionsAI } from '../lib/gemini';
import { GRADES } from '../data/demo';
import { useAllSubjects } from '../store';
import { GradeLevel } from '../types';
import { X, Sparkles, Loader2, Plus, Check } from 'lucide-react';
import Swal from 'sweetalert2';

interface Props {
  onClose: () => void;
  preSelectedSubject?: string;
  preSelectedGrade?: GradeLevel | null;
}

export function AIQuestionGenerator({ onClose, preSelectedSubject, preSelectedGrade }: Props) {
  const [settings] = useSettings();
  const [customQuestions, setCustomQuestions] = useCustomQuestions();
  const { allSubjects } = useAllSubjects();
  const [subjectId, setSubjectId] = useState(preSelectedSubject || 'algo');
  const [count, setCount] = useState(5);
  const [difficulty, setDifficulty] = useState('medium');
  const [grade, setGrade] = useState<GradeLevel>(preSelectedGrade || 11);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedCount, setGeneratedCount] = useState(0);

  const handleGenerate = async () => {
    if (!settings.apiKey) {
      Swal.fire('Lỗi', 'Vui lòng cấu hình API Key trong Cài đặt!', 'error');
      return;
    }

    setIsLoading(true);
    const subject = allSubjects.find(s => s.id === subjectId);
    const questions = await generateQuestionsAI(
      settings.apiKey,
      settings.selectedModel,
      subjectId,
      subject?.name || '',
      count,
      difficulty,
      settings.apiKeys,
      grade,
    );

    if (questions.length > 0) {
      // Attach grade to generated questions
      const questionsWithGrade = questions.map(q => ({ ...q, grade }));
      setCustomQuestions([...customQuestions, ...questionsWithGrade]);
      setGeneratedCount(questionsWithGrade.length);
      Swal.fire({
        icon: 'success',
        title: `Đã tạo ${questionsWithGrade.length} câu hỏi!`,
        text: `Câu hỏi Lớp ${grade} đã được thêm vào kho học liệu.`,
        timer: 2000,
        showConfirmButton: false,
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-500" />
            Tạo câu hỏi bằng AI
          </h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Grade */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Lớp</label>
            <div className="flex gap-1.5 flex-wrap">
              {GRADES.map(g => (
                <button
                  key={g.value}
                  onClick={() => setGrade(g.value)}
                  className={`px-3 py-2 rounded-xl font-medium text-xs transition-all ${
                    grade === g.value
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Môn học</label>
            <select
              value={subjectId}
              onChange={e => setSubjectId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none bg-white dark:bg-slate-700 dark:text-white"
            >
              {DEMO_SUBJECTS.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          {/* Count */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Số lượng câu hỏi</label>
            <div className="flex gap-2">
              {[3, 5, 10, 15].map(n => (
                <button
                  key={n}
                  onClick={() => setCount(n)}
                  className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    count === n
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {n} câu
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Độ khó</label>
            <div className="flex gap-2">
              {[
                { value: 'easy', label: 'Dễ', emoji: '🟢' },
                { value: 'medium', label: 'TB', emoji: '🟡' },
                { value: 'hard', label: 'Khó', emoji: '🔴' },
              ].map(d => (
                <button
                  key={d.value}
                  onClick={() => setDifficulty(d.value)}
                  className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    difficulty === d.value
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {d.emoji} {d.label}
                </button>
              ))}
            </div>
          </div>

          {generatedCount > 0 && (
            <div className="flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-xl text-sm font-medium">
              <Check className="w-4 h-4" />
              Đã tạo thành công {generatedCount} câu hỏi mới cho Lớp {grade}
            </div>
          )}
        </div>

        <div className="p-6 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Đóng
          </button>
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="px-5 py-2.5 rounded-xl font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center gap-2 shadow-sm disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Đang tạo câu hỏi...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Tạo câu hỏi
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
