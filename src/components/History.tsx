import React from 'react';
import { useSessions, useAllSubjects } from '../store';
import { format } from 'date-fns';
import { Clock, Target, Trophy, Zap, Gamepad2 } from 'lucide-react';

export function History() {
  const [sessions] = useSessions();
  const { allSubjects } = useAllSubjects();

  if (sessions.length === 0) {
    return (
      <div className="p-8 text-center max-w-2xl mx-auto mt-12 animate-fade-in">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Trophy className="w-12 h-12 text-slate-300" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Chưa có lịch sử học tập</h2>
        <p className="text-slate-500">Hãy bắt đầu làm bài tập để theo dõi tiến độ của bạn nhé!</p>
      </div>
    );
  }

  const modeLabels: Record<string, string> = {
    standard: 'Bài tập',
    speed: 'Speed Quiz',
    review: 'Ôn tập',
    exam: 'Thi thử',
    flashcard: 'Flashcard',
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Lịch sử học tập</h2>
        <p className="text-slate-500 mt-1">
          {sessions.length} bài đã hoàn thành • Tổng XP: {sessions.reduce((s, sess) => s + (sess.xpEarned || 0), 0)}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-600">
                <th className="p-4">Môn học</th>
                <th className="p-4">Chế độ</th>
                <th className="p-4">Ngày làm</th>
                <th className="p-4">Điểm số</th>
                <th className="p-4">Thời gian</th>
                <th className="p-4">Kết quả</th>
                <th className="p-4">XP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sessions.map((session) => {
                const subject = allSubjects.find(s => s.id === session.subjectId);
                return (
                  <tr key={session.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-slate-900">
                      {subject?.name || 'Không xác định'}
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                        <Gamepad2 className="w-3 h-3" />
                        {modeLabels[session.mode || 'standard'] || 'Bài tập'}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500">
                      {format(new Date(session.date), 'dd/MM/yyyy HH:mm')}
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        session.score >= 80 ? 'bg-emerald-100 text-emerald-800' :
                        session.score >= 50 ? 'bg-amber-100 text-amber-800' :
                        'bg-rose-100 text-rose-800'
                      }`}>
                        {session.score} điểm
                      </span>
                    </td>
                    <td className="p-4 text-slate-500 flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {Math.floor(session.timeSpent / 60)}p {session.timeSpent % 60}s
                    </td>
                    <td className="p-4 text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Target className="w-4 h-4" />
                        {session.correctAnswers}/{session.totalQuestions} đúng
                      </div>
                    </td>
                    <td className="p-4">
                      {(session.xpEarned || 0) > 0 && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600">
                          <Zap className="w-3 h-3" />
                          +{session.xpEarned}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
