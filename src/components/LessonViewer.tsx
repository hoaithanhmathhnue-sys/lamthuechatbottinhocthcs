import React from 'react';
import { ArrowLeft, CheckCircle2, BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { TextbookLesson } from '../types';
import { useReadLessons } from '../store';
import { cn } from '../lib/utils';

interface LessonViewerProps {
  lesson: TextbookLesson;
  onBack: () => void;
}

export function LessonViewer({ lesson, onBack }: LessonViewerProps) {
  const [readLessons, setReadLessons] = useReadLessons();
  const isRead = readLessons.includes(lesson.id);

  const toggleRead = () => {
    if (isRead) {
      setReadLessons(readLessons.filter(id => id !== lesson.id));
    } else {
      setReadLessons([...readLessons, lesson.id]);
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại
        </button>

        <button
          onClick={toggleRead}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all",
            isRead
              ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/60"
              : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
          )}
        >
          {isRead ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Đã đọc xong
            </>
          ) : (
            <>
              <BookOpen className="w-4 h-4" />
              Đánh dấu đã đọc
            </>
          )}
        </button>
      </div>

      {/* Lesson Title */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-900/50">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">
          <span>Lớp {lesson.grade}</span>
          <span>•</span>
          <span>Sách Kết nối tri thức</span>
        </div>
        <h1 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white">
          {lesson.title}
        </h1>
        {/* Key Concepts */}
        <div className="flex flex-wrap gap-2 mt-4">
          {lesson.keyConcepts.map((concept) => (
            <span
              key={concept}
              className="text-xs font-medium px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 shadow-sm"
            >
              {concept}
            </span>
          ))}
        </div>
      </div>

      {/* Lesson Content */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 lg:p-8">
        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3 prose-p:leading-relaxed prose-li:leading-relaxed prose-table:text-sm prose-th:bg-slate-50 dark:prose-th:bg-slate-700 prose-th:px-3 prose-th:py-2 prose-td:px-3 prose-td:py-2 prose-code:text-indigo-600 dark:prose-code:text-indigo-400 prose-code:bg-indigo-50 dark:prose-code:bg-indigo-950 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-blockquote:border-indigo-400 prose-blockquote:bg-indigo-50/50 dark:prose-blockquote:bg-indigo-950/30 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-xl">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {lesson.content}
          </ReactMarkdown>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="flex justify-center pb-8">
        <button
          onClick={() => { if (!isRead) toggleRead(); onBack(); }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-sm"
        >
          <CheckCircle2 className="w-5 h-5" />
          {isRead ? 'Quay lại danh sách' : 'Hoàn thành & Tiếp tục'}
        </button>
      </div>
    </div>
  );
}
