import React, { useState, useRef } from 'react';
import { useCustomQuestions, useSettings, useAllSubjects } from '../store';
import { DEMO_QUESTIONS } from '../data/demo';
import { extractTextFromFile, parseQuestionsFromText } from '../lib/fileParser';
import { generateQuestionsAI } from '../lib/gemini';
import { Question } from '../types';
import { MathText } from './MathText';
import {
  Plus, Trash2, Upload, FileText, Sparkles, Save, Edit3, Pencil,
  CheckCircle2, XCircle, Loader2, ChevronDown, ChevronUp,
  BookOpen, AlertCircle, Download, X
} from 'lucide-react';
import Swal from 'sweetalert2';
import { cn } from '../lib/utils';

export function Admin() {
  const [settings] = useSettings();
  const [customQuestions, setCustomQuestions] = useCustomQuestions();
  const { allSubjects, customSubjects, addSubject, updateSubject, deleteSubject } = useAllSubjects();
  const [activeTab, setActiveTab] = useState<'list' | 'add' | 'import' | 'ai' | 'subjects'>('list');

  const allCustom = customQuestions;
  const totalBySubject = allSubjects.map(s => ({
    ...s,
    demoCount: DEMO_QUESTIONS.filter(q => q.subjectId === s.id).length,
    customCount: allCustom.filter(q => q.subjectId === s.id).length,
  }));

  // Edit modal state
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  const handleSaveEdit = (updated: Question) => {
    setCustomQuestions(allCustom.map(q => q.id === updated.id ? updated : q));
    setEditingQuestion(null);
  };

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Quản trị câu hỏi</h2>
          <p className="text-slate-500 mt-1">
            {DEMO_QUESTIONS.length} câu mặc định + {allCustom.length} câu tùy chỉnh
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {totalBySubject.map(s => (
          <div key={s.id} className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 truncate">{s.name}</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              {s.demoCount + s.customCount}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              {s.demoCount} mặc định + {s.customCount} tùy chỉnh
            </p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl overflow-x-auto">
        {[
          { id: 'list' as const, label: 'Câu hỏi', icon: BookOpen },
          { id: 'add' as const, label: 'Thêm thủ công', icon: Plus },
          { id: 'import' as const, label: 'Nhập từ file', icon: Upload },
          { id: 'ai' as const, label: 'Tạo bằng AI', icon: Sparkles },
          { id: 'subjects' as const, label: 'Quản lý Môn', icon: Edit3 },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg font-medium text-sm transition-all",
                activeTab === tab.id
                  ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'list' && <QuestionList questions={allCustom} subjects={allSubjects} onDelete={(id) => {
        setCustomQuestions(allCustom.filter(q => q.id !== id));
      }} onEdit={(q) => setEditingQuestion(q)} onClearAll={() => {
        Swal.fire({
          title: 'Xóa tất cả câu hỏi tùy chỉnh?',
          text: 'Thao tác này không thể hoàn tác!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#ef4444',
          confirmButtonText: 'Xóa tất cả',
          cancelButtonText: 'Hủy',
        }).then(result => {
          if (result.isConfirmed) {
            setCustomQuestions([]);
            Swal.fire('Đã xóa', 'Tất cả câu hỏi tùy chỉnh đã được xóa.', 'success');
          }
        });
      }} />}

      {activeTab === 'add' && <ManualQuestionForm subjects={allSubjects} onSave={(q) => {
        setCustomQuestions([...allCustom, q]);
        Swal.fire({ icon: 'success', title: 'Đã thêm câu hỏi!', toast: true, position: 'top-end', timer: 2000, showConfirmButton: false });
      }} />}

      {activeTab === 'import' && <FileImport
        apiKey={settings.apiKey}
        subjects={allSubjects}
        onImport={(questions) => {
          setCustomQuestions([...allCustom, ...questions]);
        }}
      />}

      {activeTab === 'ai' && <AIGenerator
        apiKey={settings.apiKey}
        modelId={settings.selectedModel}
        apiKeys={settings.apiKeys}
        subjects={allSubjects}
        onImport={(questions) => {
          setCustomQuestions([...allCustom, ...questions]);
        }}
      />}

      {/* Subject Management Tab */}
      {activeTab === 'subjects' && (
        <SubjectManager
          allSubjects={allSubjects}
          customSubjects={customSubjects}
          onAdd={addSubject}
          onUpdate={updateSubject}
          onDelete={deleteSubject}
        />
      )}

      {/* Edit Modal */}
      {editingQuestion && (
        <EditQuestionModal
          question={editingQuestion}
          subjects={allSubjects}
          onSave={handleSaveEdit}
          onClose={() => setEditingQuestion(null)}
        />
      )}
    </div>
  );
}

// ===== EDIT QUESTION MODAL (giống rungchuongvang) =====
function EditQuestionModal({ question, subjects, onSave, onClose }: {
  question: Question;
  subjects: any[];
  onSave: (q: Question) => void;
  onClose: () => void;
}) {
  const [content, setContent] = useState(question.content);
  const [options, setOptions] = useState([...(question.options || ['', '', '', ''])]);
  const [correctIdx, setCorrectIdx] = useState(question.options?.indexOf(question.correctAnswer) ?? 0);
  const [explanation, setExplanation] = useState(question.explanation || '');
  const [subjectId, setSubjectId] = useState(question.subjectId);
  const [difficulty, setDifficulty] = useState(question.difficulty || 'medium');

  const handleSave = () => {
    if (!content.trim()) return Swal.fire('Lỗi', 'Vui lòng nhập câu hỏi!', 'error');
    onSave({
      ...question,
      content,
      options,
      correctAnswer: options[correctIdx] || options[0],
      explanation,
      subjectId,
      difficulty: difficulty as 'easy' | 'medium' | 'hard',
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5 text-white flex items-center justify-between rounded-t-2xl">
          <h2 className="text-lg font-bold flex items-center gap-2"><Pencil className="w-5 h-5" /> Sửa câu hỏi</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1 uppercase">Môn</label>
              <select value={subjectId} onChange={e => setSubjectId(e.target.value)}
                className="w-full p-2.5 border border-slate-300 dark:border-slate-600 rounded-xl text-sm bg-white dark:bg-slate-900">
                {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1 uppercase">Độ khó</label>
              <select value={difficulty} onChange={e => setDifficulty(e.target.value)}
                className="w-full p-2.5 border border-slate-300 dark:border-slate-600 rounded-xl text-sm bg-white dark:bg-slate-900">
                <option value="easy">Dễ</option>
                <option value="medium">Trung bình</option>
                <option value="hard">Khó</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1 uppercase">Câu hỏi (hỗ trợ $công thức$)</label>
            <textarea value={content} onChange={e => setContent(e.target.value)} rows={3}
              className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none bg-white dark:bg-slate-900" />
            {content.includes('$') && (
              <div className="mt-1 p-2 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-sm">
                <span className="text-xs text-slate-400 block mb-1">Xem trước:</span>
                <MathText content={content} className="text-slate-800 dark:text-slate-200" />
              </div>
            )}
          </div>

          {options.map((opt, i) => (
            <div key={i} className="flex items-center gap-2">
              <button type="button" onClick={() => setCorrectIdx(i)}
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition ${
                  i === correctIdx ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 hover:bg-emerald-100'
                }`}>
                {String.fromCharCode(65 + i)}
              </button>
              <input value={opt} onChange={e => { const newOpts = [...options]; newOpts[i] = e.target.value; setOptions(newOpts); }}
                className="flex-1 p-2.5 border border-slate-300 dark:border-slate-600 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white dark:bg-slate-900"
                placeholder={`Đáp án ${String.fromCharCode(65 + i)}`} />
            </div>
          ))}
          <p className="text-xs text-emerald-600 font-medium">✅ Nhấn vào chữ cái (A/B/C/D) để chọn đáp án đúng</p>

          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1 uppercase">Giải thích</label>
            <textarea value={explanation} onChange={e => setExplanation(e.target.value)} rows={2}
              className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none bg-white dark:bg-slate-900" />
          </div>

          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 py-3 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold">Hủy</button>
            <button onClick={handleSave} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition">Lưu</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// === QUESTION LIST ===
function QuestionList({ questions, subjects, onDelete, onEdit, onClearAll }: {
  questions: Question[];
  subjects: any[];
  onDelete: (id: string) => void;
  onEdit: (q: Question) => void;
  onClearAll: () => void;
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterSubject, setFilterSubject] = useState('all');

  const filtered = filterSubject === 'all' ? questions : questions.filter(q => q.subjectId === filterSubject);

  if (questions.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">📭</div>
        <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-2">Chưa có câu hỏi tùy chỉnh</h3>
        <p className="text-slate-500 text-sm">Thêm câu hỏi thủ công, nhập từ file DOCX/PDF, hoặc tạo bằng AI</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <select value={filterSubject} onChange={e => setFilterSubject(e.target.value)}
          className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm bg-white dark:bg-slate-800 outline-none focus:border-indigo-500">
          <option value="all">Tất cả môn ({questions.length})</option>
          {subjects.map(s => {
            const count = questions.filter(q => q.subjectId === s.id).length;
            return count > 0 ? <option key={s.id} value={s.id}>{s.name} ({count})</option> : null;
          })}
        </select>
        <div className="flex items-center gap-2">
          <button onClick={() => {
            const blob = new Blob([JSON.stringify(questions, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url; a.download = `questions_export_${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
          }} className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
            <Download className="w-3.5 h-3.5" /> Xuất JSON
          </button>
          <button onClick={onClearAll}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors">
            <Trash2 className="w-3.5 h-3.5" /> Xóa tất cả
          </button>
        </div>
      </div>

      <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
        {filtered.map((q, i) => {
          const subject = subjects.find(s => s.id === q.subjectId);
          const isExpanded = expandedId === q.id;
          return (
            <div key={q.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden group">
              <div className="flex items-center gap-3 p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors"
                onClick={() => setExpandedId(isExpanded ? null : q.id)}>
                <span className="text-xs font-mono text-slate-400 w-6">{i + 1}</span>
                <span className={cn("px-2 py-0.5 rounded text-xs font-bold uppercase",
                  q.difficulty === 'easy' ? "bg-emerald-100 text-emerald-700" :
                  q.difficulty === 'medium' ? "bg-amber-100 text-amber-700" : "bg-rose-100 text-rose-700"
                )}>
                  {q.difficulty === 'easy' ? 'Dễ' : q.difficulty === 'medium' ? 'TB' : 'Khó'}
                </span>
                <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{subject?.name || q.subjectId}</span>
                <p className="flex-1 text-sm font-medium text-slate-900 dark:text-white truncate">
                  <MathText content={q.content} className="inline" />
                </p>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                  <button onClick={(e) => { e.stopPropagation(); onEdit(q); }}
                    className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition" title="Sửa">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); onDelete(q.id); }}
                    className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition" title="Xóa">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>
              {isExpanded && (
                <div className="px-4 pb-4 pt-0 border-t border-slate-100 dark:border-slate-700 space-y-3 animate-fade-in">
                  {q.options && (
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      {q.options.map((opt, j) => (
                        <div key={j} className={cn("flex items-center gap-2 px-3 py-2 rounded-lg text-sm",
                          opt === q.correctAnswer ? "bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium" : "bg-slate-50 dark:bg-slate-750 text-slate-600 border border-slate-200")}>
                          <span className={cn("w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0",
                            opt === q.correctAnswer ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500")}>
                            {String.fromCharCode(65 + j)}
                          </span>
                          <MathText content={opt} />
                        </div>
                      ))}
                    </div>
                  )}
                  {q.explanation && (
                    <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg text-sm text-blue-800 dark:text-blue-300">
                      <strong>Giải thích:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// === MANUAL QUESTION FORM ===
function ManualQuestionForm({ onSave, subjects }: { onSave: (q: Question) => void, subjects: any[] }) {
  const [subjectId, setSubjectId] = useState('algo');
  const [content, setContent] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctIdx, setCorrectIdx] = useState(0);
  const [explanation, setExplanation] = useState('');

  const handleSave = () => {
    if (!content.trim()) return Swal.fire('Lỗi', 'Vui lòng nhập nội dung câu hỏi!', 'error');
    const filledOptions = options.filter(o => o.trim());
    if (filledOptions.length < 2) return Swal.fire('Lỗi', 'Cần ít nhất 2 đáp án!', 'error');

    onSave({
      id: `manual_${Date.now()}`,
      subjectId,
      content: content.trim(),
      type: 'multiple_choice',
      options: filledOptions,
      correctAnswer: options[correctIdx]?.trim() || filledOptions[0],
      explanation: explanation.trim(),
      difficulty,
      isCustom: true,
    });
    setContent(''); setOptions(['', '', '', '']); setCorrectIdx(0); setExplanation('');
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-5">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
        <Edit3 className="w-5 h-5 text-indigo-600" /> Thêm câu hỏi thủ công
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Môn học</label>
          <select value={subjectId} onChange={e => setSubjectId(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:border-indigo-500 text-sm">
            {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Độ khó</label>
          <div className="flex gap-2">
            {([{ v: 'easy' as const, l: '🟢 Dễ' }, { v: 'medium' as const, l: '🟡 TB' }, { v: 'hard' as const, l: '🔴 Khó' }]).map(d => (
              <button key={d.v} onClick={() => setDifficulty(d.v)} className={cn(
                "flex-1 py-2.5 rounded-xl font-medium text-sm transition-all",
                difficulty === d.v ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}>{d.l}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Câu hỏi (hỗ trợ $công thức LaTeX$)</label>
        <textarea value={content} onChange={e => setContent(e.target.value)} rows={3}
          placeholder="Nhập câu hỏi ở đây... VD: Độ phức tạp của thuật toán QuickSort trung bình là $O(n \log n)$"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:border-indigo-500 text-sm resize-none" />
        {content.includes('$') && (
          <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-sm">
            <span className="text-xs text-slate-400 block mb-1">Xem trước:</span>
            <MathText content={content} className="text-slate-800 dark:text-slate-200" />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Đáp án (nhấn A/B/C/D = chọn đúng)</label>
        {options.map((opt, i) => (
          <div key={i} className="flex items-center gap-2">
            <button type="button" onClick={() => setCorrectIdx(i)}
              className={cn("w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition",
                correctIdx === i ? "bg-emerald-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-500 hover:bg-emerald-100")}>
              {String.fromCharCode(65 + i)}
            </button>
            <input value={opt} onChange={e => { const o = [...options]; o[i] = e.target.value; setOptions(o); }}
              placeholder={`Đáp án ${String.fromCharCode(65 + i)}`}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:border-indigo-500 text-sm" />
          </div>
        ))}
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Giải thích (tùy chọn)</label>
        <textarea value={explanation} onChange={e => setExplanation(e.target.value)} rows={2}
          placeholder="Giải thích tại sao đáp án đúng..."
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:border-indigo-500 text-sm resize-none" />
      </div>

      <button onClick={handleSave}
        className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-sm hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 shadow-sm">
        <Save className="w-4 h-4" /> Lưu câu hỏi
      </button>
    </div>
  );
}

// === FILE IMPORT (giống rungchuongvang) ===
function FileImport({ apiKey, subjects, onImport }: {
  apiKey: string;
  subjects: any[];
  onImport: (questions: Question[]) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [subjectId, setSubjectId] = useState('algo');
  const [count, setCount] = useState(10);
  const [difficulty, setDifficulty] = useState('mixed');
  const [parsedQuestions, setParsedQuestions] = useState<Question[]>([]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!apiKey) {
      Swal.fire('Lỗi', 'Vui lòng cấu hình API Key trong Cài đặt trước!', 'error');
      return;
    }

    setIsUploading(true);
    setUploadStatus(`Đang đọc file "${file.name}"...`);
    setParsedQuestions([]);

    try {
      // Bước 1: Đọc text từ file
      const text = await extractTextFromFile(file);
      if (!text.trim()) {
        throw new Error('File không có nội dung hoặc không đọc được.');
      }

      setUploadStatus(`Đang phân tích ${text.length} ký tự bằng AI...`);

      // Bước 2: Dùng Gemini phân tích (giống rungchuongvang)
      const questions = await parseQuestionsFromText(apiKey, text, subjectId, count, difficulty);

      if (questions.length === 0) {
        throw new Error('Không tìm thấy câu hỏi trắc nghiệm trong file.');
      }

      setParsedQuestions(questions);
      setUploadStatus(`AI đã trích xuất ${questions.length} câu hỏi!`);
    } catch (err: any) {
      Swal.fire('Lỗi', err.message || 'Không thể xử lý file', 'error');
      setUploadStatus('');
    }
    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleConfirmImport = () => {
    if (parsedQuestions.length === 0) return;
    onImport(parsedQuestions);
    Swal.fire({ icon: 'success', title: `Đã nhập ${parsedQuestions.length} câu hỏi!`, timer: 2000, showConfirmButton: false });
    setParsedQuestions([]);
    setUploadStatus('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-5">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Upload className="w-5 h-5 text-purple-600" /> Tải file đề thi
        </h3>
        <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-xl text-blue-800 dark:text-blue-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p>Tải lên file <strong>.docx</strong>, <strong>.pdf</strong>, <strong>.txt</strong> chứa đề và đáp án. AI sẽ tự động trích xuất câu hỏi.</p>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Phân loại vào môn</label>
          <select value={subjectId} onChange={e => setSubjectId(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:border-indigo-500 text-sm">
            {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Số câu</label>
            <input type="number" value={count} onChange={e => setCount(Number(e.target.value))} min={1} max={50}
              className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Độ khó</label>
            <select value={difficulty} onChange={e => setDifficulty(e.target.value)}
              className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-sm">
              <option value="mixed">🎲 Hỗn hợp</option>
              <option value="easy">🟢 Dễ</option>
              <option value="medium">🟡 Trung bình</option>
              <option value="hard">🔴 Khó</option>
            </select>
          </div>
        </div>

        <input ref={fileInputRef} type="file" accept=".docx,.pdf,.txt,.doc" onChange={handleFileUpload} className="hidden" />
        <button onClick={() => fileInputRef.current?.click()} disabled={isUploading}
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50 transition shadow-sm">
          {isUploading ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> {uploadStatus}</>
          ) : (
            <><FileText className="w-5 h-5" /> Chọn file & Nạp câu hỏi</>
          )}
        </button>
      </div>

      {/* Preview parsed questions */}
      {parsedQuestions.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" /> AI đã trích xuất {parsedQuestions.length} câu hỏi
            </h3>
            <button onClick={handleConfirmImport}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-bold text-sm hover:from-emerald-600 hover:to-teal-600 transition-all shadow-sm">
              <CheckCircle2 className="w-4 h-4" /> Xác nhận nhập
            </button>
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {parsedQuestions.map((q, i) => (
              <div key={q.id} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                <p className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                  <MathText content={`Câu ${i + 1}: ${q.content}`} />
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {q.options?.map((opt, j) => (
                    <div key={j} className={cn("text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1",
                      opt === q.correctAnswer ? "bg-emerald-100 text-emerald-800 font-bold" : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400")}>
                      <span className="font-bold">{String.fromCharCode(65 + j)}.</span>
                      <MathText content={opt} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// === AI GENERATOR (giống rungchuongvang) ===
function AIGenerator({ apiKey, modelId, apiKeys, subjects, onImport }: {
  apiKey: string;
  modelId: string;
  apiKeys: any[];
  subjects: any[];
  onImport: (questions: Question[]) => void;
}) {
  const [topic, setTopic] = useState('');
  const [subjectId, setSubjectId] = useState('algo');
  const [count, setCount] = useState(5);
  const [difficulty, setDifficulty] = useState('medium');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);

  const handleGenerate = async () => {
    if (!topic.trim()) return Swal.fire('Lỗi', 'Vui lòng nhập chủ đề!', 'error');
    if (!apiKey) return Swal.fire('Lỗi', 'Vui lòng cấu hình API Key trong Cài đặt!', 'error');

    setIsGenerating(true);
    setGeneratedQuestions([]);
    try {
      const questions = await generateQuestionsAI(apiKey, modelId, subjectId, topic, count, difficulty, apiKeys);
      if (questions.length > 0) {
        setGeneratedQuestions(questions);
      }
    } catch (err: any) {
      Swal.fire('Lỗi', err.message, 'error');
    }
    setIsGenerating(false);
  };

  const handleConfirmImport = () => {
    onImport(generatedQuestions);
    Swal.fire({ icon: 'success', title: `Đã nhập ${generatedQuestions.length} câu hỏi!`, timer: 2000, showConfirmButton: false });
    setGeneratedQuestions([]);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-5">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600" /> Tạo câu hỏi bằng AI
        </h3>
        <p className="text-sm text-slate-500">Nhập chủ đề để AI tự tạo câu hỏi trắc nghiệm mới.</p>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Chủ đề / Tên môn</label>
          <input type="text" value={topic} onChange={e => setTopic(e.target.value)}
            placeholder="VD: Thuật toán sắp xếp, Cơ sở dữ liệu quan hệ, Mạng máy tính..."
            className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-white dark:bg-slate-900 text-sm" />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Phân loại vào môn</label>
          <select value={subjectId} onChange={e => setSubjectId(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:border-indigo-500 text-sm">
            {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Số câu</label>
            <input type="number" value={count} onChange={e => setCount(Number(e.target.value))} min={1} max={30}
              className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Độ khó</label>
            <select value={difficulty} onChange={e => setDifficulty(e.target.value)}
              className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-sm">
              <option value="mixed">🎲 Hỗn hợp</option>
              <option value="easy">🟢 Dễ</option>
              <option value="medium">🟡 Trung bình</option>
              <option value="hard">🔴 Khó</option>
            </select>
          </div>
        </div>

        <button onClick={handleGenerate} disabled={isGenerating || !topic.trim()}
          className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50 transition shadow-sm">
          {isGenerating ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Đang tạo câu hỏi...</>
          ) : (
            <><Sparkles className="w-5 h-5" /> Tạo {count} câu hỏi bằng AI</>
          )}
        </button>

        {!apiKey && (
          <p className="text-xs text-amber-600 bg-amber-50 dark:bg-amber-950 p-2 rounded-lg">
            ⚡ Vui lòng cấu hình API Key trong Cài đặt trước
          </p>
        )}
      </div>

      {/* Preview generated questions */}
      {generatedQuestions.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" /> AI đã tạo {generatedQuestions.length} câu hỏi
            </h3>
            <button onClick={handleConfirmImport}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" /> Xác nhận nhập
            </button>
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {generatedQuestions.map((q, i) => (
              <div key={q.id} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                <p className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                  <MathText content={`Câu ${i + 1}: ${q.content}`} />
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {q.options?.map((opt, j) => (
                    <div key={j} className={cn("text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1",
                      opt === q.correctAnswer ? "bg-emerald-100 text-emerald-800 font-bold" : "bg-white dark:bg-slate-800 text-slate-600")}>
                      <span className="font-bold">{String.fromCharCode(65 + j)}.</span>
                      <MathText content={opt} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// === SUBJECT MANAGER ===
function SubjectManager({ allSubjects, customSubjects, onAdd, onUpdate, onDelete }: {
  allSubjects: any[];
  customSubjects: any[];
  onAdd: (subject: any) => void;
  onUpdate: (id: string, updates: any) => void;
  onDelete: (id: string) => void;
}) {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editGrade, setEditGrade] = useState<number>(1);
  const [newName, setNewName] = useState('');
  const [newGrade, setNewGrade] = useState<number>(1);
  const [filterGrade, setFilterGrade] = useState<number | 'all'>('all');

  const handleAdd = () => {
    if (!newName.trim()) return Swal.fire('Lỗi', 'Vui lòng nhập tên môn học!', 'error');
    onAdd({ name: newName.trim(), icon: 'BookOpen', questionsCount: 0, color: 'indigo', grade: newGrade });
    setNewName('');
    Swal.fire({ icon: 'success', title: 'Đã thêm môn học!', toast: true, position: 'top-end', timer: 2000, showConfirmButton: false });
  };

  const handleSaveEdit = (id: string) => {
    if (!editName.trim()) return Swal.fire('Lỗi', 'Tên môn không được để trống!', 'error');
    onUpdate(id, { name: editName.trim(), grade: editGrade });
    setIsEditing(null);
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: 'Xóa môn học này?',
      text: 'Các câu hỏi thuộc môn này vẫn còn nhưng sẽ không thuộc môn nào hợp lệ.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy'
    }).then(result => {
      if (result.isConfirmed) {
        onDelete(id);
        Swal.fire('Đã xóa', 'Môn học đã bị xóa.', 'success');
      }
    });
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Edit3 className="w-5 h-5 text-indigo-600" /> Quản lý Môn học
        </h3>
        <select
          value={filterGrade}
          onChange={e => setFilterGrade(e.target.value === 'all' ? 'all' : Number(e.target.value))}
          className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:border-indigo-500 text-sm"
        >
          <option value="all">Tất cả lớp</option>
          {Array.from({ length: 12 }, (_, i) => i + 1).map(g => (
            <option key={g} value={g}>Lớp {g}</option>
          ))}
        </select>
      </div>

      {/* Add new subject */}
      <div className="flex items-center gap-3">
        <select
          value={newGrade}
          onChange={e => setNewGrade(Number(e.target.value))}
          className="w-28 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:border-indigo-500 text-sm"
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map(g => (
            <option key={g} value={g}>Lớp {g}</option>
          ))}
        </select>
        <input
          type="text"
          value={newName}
          onChange={e => setNewName(e.target.value)}
          placeholder="Nhập tên môn học mới..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:border-indigo-500 text-sm"
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors shadow-sm whitespace-nowrap"
        >
          <Plus className="w-4 h-4" /> Thêm môn
        </button>
      </div>

      {/* List subjects */}
      <div className="space-y-3 mt-6">
        {allSubjects.filter(s => filterGrade === 'all' ? true : s.grade === filterGrade).map(subject => {
          const isCustom = customSubjects.some(s => s.id === subject.id);
          const isCurrentlyEditing = isEditing === subject.id;

          return (
            <div key={subject.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 transition-all hover:border-indigo-200 dark:hover:border-indigo-800">
              <div className="flex-1 flex flex-wrap gap-2">
                {isCurrentlyEditing ? (
                  <>
                    <select
                      value={editGrade}
                      onChange={e => setEditGrade(Number(e.target.value))}
                      className="w-24 px-3 py-1.5 rounded-lg border border-indigo-300 dark:border-indigo-600 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(g => (
                        <option key={g} value={g}>Lớp {g}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      className="flex-1 min-w-[150px] px-3 py-1.5 rounded-lg border border-indigo-300 dark:border-indigo-600 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                      autoFocus
                      onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(subject.id)}
                    />
                  </>
                ) : (
                  <div className="flex items-center gap-2 flex-wrap">
                    {subject.grade && (
                      <span className="px-2 py-0.5 rounded text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                        Lớp {subject.grade}
                      </span>
                    )}
                    <span className="font-bold text-slate-900 dark:text-white text-base">{subject.name}</span>
                    {isCustom && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-2.5 py-0.5 rounded-full">
                        Tùy chỉnh
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1.5 ml-4">
                {isCurrentlyEditing ? (
                  <>
                    <button onClick={() => isEditing === subject.id && handleSaveEdit(subject.id)} className="p-2 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition" title="Lưu">
                      <Save className="w-4 h-4" />
                    </button>
                    <button onClick={() => setIsEditing(null)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition" title="Hủy">
                      <XCircle className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => { setIsEditing(subject.id); setEditName(subject.name); setEditGrade(subject.grade || 1); }}
                      className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition" title="Sửa môn"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    {isCustom && (
                      <button
                        onClick={() => handleDelete(subject.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-lg transition" title="Xóa môn"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
