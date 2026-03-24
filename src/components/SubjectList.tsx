import React, { useState } from 'react';
import { DEMO_QUESTIONS } from '../data/demo';
import { useCustomQuestions, useSessions, useSelectedGrade, useAllSubjects } from '../store';
import { BookOpen, Code2, Database, Network, Cpu, Laptop, ChevronRight, PlayCircle, Sparkles } from 'lucide-react';
import { AIQuestionGenerator } from './AIQuestionGenerator';
import { GradeSelector } from './GradeSelector';

const iconMap: Record<string, any> = {
  Code2, Database, Network, Cpu, BookOpen, Laptop
};

interface SubjectListProps {
  onSelectSubject: (id: string) => void;
}

export function SubjectList({ onSelectSubject }: SubjectListProps) {
  const { allSubjects } = useAllSubjects();
  const [sessions] = useSessions();
  const [customQuestions] = useCustomQuestions();
  const [showAIGen, setShowAIGen] = useState(false);
  const [aiGenSubject, setAiGenSubject] = useState<string | undefined>();
  const [selectedGrade, setSelectedGrade] = useSelectedGrade();

  // Filter questions by grade
  const filterByGrade = (questions: typeof DEMO_QUESTIONS) => {
    if (!selectedGrade) return questions;
    return questions.filter(q => q.grade === selectedGrade);
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Kho học liệu</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Chọn môn học để bắt đầu ôn tập hoặc làm bài kiểm tra.</p>
        </div>
        <button
          onClick={() => { setAiGenSubject(undefined); setShowAIGen(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-sm text-sm"
        >
          <Sparkles className="w-4 h-4" />
          Tạo câu hỏi AI
        </button>
      </div>

      {/* Grade Selector */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5">
        <GradeSelector selectedGrade={selectedGrade} onSelectGrade={setSelectedGrade} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allSubjects.map((subject) => {
          const Icon = iconMap[subject.icon] || BookOpen;
          const subSessions = sessions.filter(s => s.subjectId === subject.id);
          const avgScore = subSessions.length > 0
            ? Math.round(subSessions.reduce((s, sess) => s + sess.score, 0) / subSessions.length)
            : 0;
          const gradeFilteredDemo = filterByGrade(DEMO_QUESTIONS.filter(q => q.subjectId === subject.id));
          const gradeFilteredCustom = filterByGrade(customQuestions.filter(q => q.subjectId === subject.id));
          const totalQs = gradeFilteredDemo.length + gradeFilteredCustom.length;
          const customCount = gradeFilteredCustom.length;
          
          return (
            <div 
              key={subject.id} 
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition-all group cursor-pointer"
              onClick={() => onSelectSubject(subject.id)}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedGrade && (
                      <span className="text-xs font-medium text-indigo-600 bg-indigo-50 dark:bg-indigo-950 px-2 py-1 rounded-full">
                        Lớp {selectedGrade}
                      </span>
                    )}
                    {customCount > 0 && (
                      <span className="text-xs font-medium text-purple-600 bg-purple-50 dark:bg-purple-950 px-2 py-1 rounded-full">
                        +{customCount} AI
                      </span>
                    )}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{subject.name}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">
                  {totalQs} câu hỏi • {subSessions.length} lần làm bài
                </p>
                {totalQs === 0 && selectedGrade && (
                  <p className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-3 py-1.5 rounded-lg">
                    ⚠️ Chưa có câu hỏi cho lớp {selectedGrade}. Hãy dùng AI để tạo!
                  </p>
                )}
                
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-slate-400">Điểm TB</span>
                    <span className="text-xs font-bold text-indigo-600">{avgScore}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all"
                      style={{ width: `${avgScore}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-emerald-600">
                    <PlayCircle className="w-4 h-4" />
                    Bắt đầu học
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setAiGenSubject(subject.id);
                      setShowAIGen(true);
                    }}
                    className="flex items-center gap-1 text-xs font-medium text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 dark:bg-purple-950 dark:hover:bg-purple-900 px-2 py-1 rounded-full transition-colors"
                  >
                    <Sparkles className="w-3 h-3" />
                    AI
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showAIGen && (
        <AIQuestionGenerator
          onClose={() => setShowAIGen(false)}
          preSelectedSubject={aiGenSubject}
          preSelectedGrade={selectedGrade}
        />
      )}
    </div>
  );
}
