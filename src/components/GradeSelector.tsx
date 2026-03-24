import React from 'react';
import { GradeLevel } from '../types';
import { GRADES, GRADE_LEVELS } from '../data/demo';
import { GraduationCap, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface GradeSelectorProps {
  selectedGrade: GradeLevel | null;
  onSelectGrade: (grade: GradeLevel | null) => void;
  compact?: boolean;
}

const levelStyles = {
  primary: {
    bg: 'bg-emerald-50 dark:bg-emerald-950',
    border: 'border-emerald-200 dark:border-emerald-800',
    text: 'text-emerald-700 dark:text-emerald-300',
    activeBg: 'bg-emerald-600',
    hoverBg: 'hover:bg-emerald-100 dark:hover:bg-emerald-900',
    gradient: 'from-emerald-500 to-teal-500',
  },
  secondary: {
    bg: 'bg-blue-50 dark:bg-blue-950',
    border: 'border-blue-200 dark:border-blue-800',
    text: 'text-blue-700 dark:text-blue-300',
    activeBg: 'bg-blue-600',
    hoverBg: 'hover:bg-blue-100 dark:hover:bg-blue-900',
    gradient: 'from-blue-500 to-indigo-500',
  },
  highschool: {
    bg: 'bg-purple-50 dark:bg-purple-950',
    border: 'border-purple-200 dark:border-purple-800',
    text: 'text-purple-700 dark:text-purple-300',
    activeBg: 'bg-purple-600',
    hoverBg: 'hover:bg-purple-100 dark:hover:bg-purple-900',
    gradient: 'from-purple-500 to-pink-500',
  },
};

export function GradeSelector({ selectedGrade, onSelectGrade, compact }: GradeSelectorProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => onSelectGrade(null)}
          className={cn(
            "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
            !selectedGrade
              ? "bg-indigo-600 text-white shadow-sm"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
          )}
        >
          Tất cả
        </button>
        {GRADES.map(g => (
          <button
            key={g.value}
            onClick={() => onSelectGrade(g.value)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
              selectedGrade === g.value
                ? `bg-gradient-to-r ${levelStyles[g.level].gradient} text-white shadow-sm`
                : `bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700`
            )}
          >
            {g.value}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with selected grade display */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-sm">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Chọn lớp học</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {selectedGrade ? `Đang xem: Lớp ${selectedGrade}` : 'Xem tất cả các lớp'}
            </p>
          </div>
        </div>
        {selectedGrade && (
          <button
            onClick={() => onSelectGrade(null)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-3 h-3" />
            Bỏ lọc
          </button>
        )}
      </div>

      {/* Grade level groups */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {(['primary', 'secondary', 'highschool'] as const).map(key => {
          const level = GRADE_LEVELS[key];
          const style = levelStyles[key];
          return (
            <div
              key={key}
              className={cn(
                "rounded-xl border p-3 transition-all",
                style.bg, style.border
              )}
            >
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-base">{level.emoji}</span>
                <span className={cn("text-xs font-bold uppercase tracking-wider", style.text)}>
                  {level.label}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {level.grades.map(grade => {
                  const isActive = selectedGrade === grade;
                  return (
                    <button
                      key={grade}
                      onClick={() => onSelectGrade(isActive ? null : grade as GradeLevel)}
                      className={cn(
                        "min-w-[2.5rem] px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200",
                        isActive
                          ? `bg-gradient-to-r ${style.gradient} text-white shadow-md scale-105`
                          : `bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 ${style.hoverBg} border border-slate-200 dark:border-slate-700 hover:shadow-sm hover:scale-105`
                      )}
                    >
                      {grade}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
