import React, { useState } from 'react';
import { BookOpen, ChevronRight, CheckCircle2, BookMarked } from 'lucide-react';
import { GradeSelector } from './GradeSelector';
import { LessonViewer } from './LessonViewer';
import { useSelectedGrade, useReadLessons } from '../store';
import { getChaptersByGrade } from '../data/textbookContent';
import { TextbookLesson } from '../types';
import { cn } from '../lib/utils';

export function LearningSection() {
  const [selectedGrade, setSelectedGrade] = useSelectedGrade();
  const [readLessons] = useReadLessons();
  const [selectedLesson, setSelectedLesson] = useState<TextbookLesson | null>(null);

  const effectiveGrade = selectedGrade || 3;
  const chapters = getChaptersByGrade(effectiveGrade);

  if (selectedLesson) {
    return (
      <LessonViewer
        lesson={selectedLesson}
        onBack={() => setSelectedLesson(null)}
      />
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-sm">
            <BookMarked className="w-5 h-5 text-white" />
          </div>
          Kiến thức Tin học
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Nội dung theo sách <strong>Kết nối tri thức</strong> — Chọn lớp để xem bài học.
        </p>
      </div>

      {/* Grade Selector */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5">
        <GradeSelector selectedGrade={selectedGrade} onSelectGrade={setSelectedGrade} />
      </div>

      {/* Chapter & Lessons */}
      {chapters.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
          <BookOpen className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
            Chưa có nội dung cho lớp này
          </p>
          <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">
            Vui lòng chọn lớp khác (3-12)
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {chapters.map((chapter) => {
            const readCount = chapter.lessons.filter(l => readLessons.includes(l.id)).length;
            const totalCount = chapter.lessons.length;
            const progress = totalCount > 0 ? Math.round((readCount / totalCount) * 100) : 0;

            return (
              <div
                key={chapter.id}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden"
              >
                {/* Chapter Header */}
                <div className="p-5 border-b border-slate-100 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{chapter.icon}</span>
                      <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                          {chapter.title}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                          {chapter.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-600">
                        {readCount}/{totalCount} bài
                      </span>
                    </div>
                  </div>
                  {/* Progress Bar */}
                  <div className="mt-3 w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Lessons List */}
                <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
                  {chapter.lessons.map((lesson) => {
                    const isRead = readLessons.includes(lesson.id);
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setSelectedLesson(lesson)}
                        className="w-full flex items-center gap-4 px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors text-left group"
                      >
                        <div className={cn(
                          "w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0 transition-transform group-hover:scale-110",
                          isRead
                            ? "bg-emerald-100 dark:bg-emerald-900/40"
                            : "bg-slate-100 dark:bg-slate-700"
                        )}>
                          {isRead ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                          ) : (
                            <span>{lesson.icon || '📖'}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className={cn(
                            "text-sm font-semibold truncate",
                            isRead
                              ? "text-emerald-700 dark:text-emerald-400"
                              : "text-slate-800 dark:text-slate-200"
                          )}>
                            {lesson.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            {lesson.keyConcepts.slice(0, 3).map((concept) => (
                              <span
                                key={concept}
                                className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400"
                              >
                                {concept}
                              </span>
                            ))}
                            {lesson.keyConcepts.length > 3 && (
                              <span className="text-[10px] text-slate-400">
                                +{lesson.keyConcepts.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors shrink-0" />
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
