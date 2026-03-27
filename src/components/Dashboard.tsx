import React from 'react';
import { useProgress, useSessions, useGamification, useCostTracker, useAllSubjects, useSelectedGrade } from '../store';
import { XP_PER_LEVEL } from '../data/demo';
import { Target, Flame, Trophy, BookOpen, TrendingUp, Zap, DollarSign } from 'lucide-react';

export function Dashboard() {
  const [progress] = useProgress();
  const [sessions] = useSessions();
  const [gamification] = useGamification();
  const [costs] = useCostTracker();
  const { allSubjects } = useAllSubjects();
  const [selectedGrade] = useSelectedGrade();

  // Real stats from sessions
  const totalAttempts = sessions.length;
  const avgScore = sessions.length > 0
    ? Math.round(sessions.reduce((s, sess) => s + sess.score, 0) / sessions.length)
    : 0;

  // Calculate streak
  const today = new Date().toDateString();
  const studyDays = new Set(sessions.map(s => new Date(s.date).toDateString()));
  let streak = 0;
  const d = new Date();
  while (studyDays.has(d.toDateString())) {
    streak++;
    d.setDate(d.getDate() - 1);
  }

  // Total cost
  const totalCost = costs.reduce((s, c) => s + c.cost, 0);

  const stats = [
    { label: 'Tổng bài làm', value: totalAttempts, icon: Target, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Điểm TB', value: `${avgScore}%`, icon: Trophy, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { label: 'Streak', value: `${streak} ngày`, icon: Flame, color: 'text-orange-600', bg: 'bg-orange-100' },
    { label: 'Level', value: gamification.level, icon: Zap, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  // Subject progress (real data)
  const filteredSubjects = selectedGrade 
    ? allSubjects.filter(sub => sub.grade === selectedGrade)
    : allSubjects;

  const subjectStats = filteredSubjects.map(sub => {
    const subSessions = sessions.filter(s => s.subjectId === sub.id);
    const progress = subSessions.length > 0
      ? Math.round(subSessions.reduce((s, sess) => s + sess.score, 0) / subSessions.length)
      : 0;
    return { ...sub, progress, attempts: subSessions.length };
  });

  // Score history for chart (last 7 sessions)
  const recentSessions = sessions.slice(0, 10).reverse();

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Chào mừng trở lại! 👋</h2>
          <p className="text-slate-500 mt-1">
            Level {gamification.level} • {gamification.xp} XP • Tiếp tục chinh phục Tin học!
          </p>
        </div>
        {totalCost > 0 && (
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-xl text-sm font-medium border border-amber-200">
            <DollarSign className="w-4 h-4" />
            Chi phí API: ${totalCost.toFixed(4)}
          </div>
        )}
      </div>

      {/* XP Progress Bar */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-5 text-white shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl font-black">
              {gamification.level}
            </div>
            <div>
              <p className="font-bold text-lg">Level {gamification.level}</p>
              <p className="text-indigo-200 text-sm">{gamification.xp} XP tổng cộng</p>
            </div>
          </div>
          <p className="text-indigo-200 text-sm">
            {gamification.xp % XP_PER_LEVEL}/{XP_PER_LEVEL} XP → Level {gamification.level + 1}
          </p>
        </div>
        <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-700"
            style={{ width: `${((gamification.xp % XP_PER_LEVEL) / XP_PER_LEVEL) * 100}%` }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Score Chart */}
      {recentSessions.length > 1 && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            Biểu đồ điểm số gần đây
          </h3>
          <div className="relative h-48">
            <svg viewBox="0 0 400 150" className="w-full h-full" preserveAspectRatio="none">
              {/* Grid lines */}
              {[0, 25, 50, 75, 100].map(v => (
                <line key={v} x1="40" y1={140 - v * 1.3} x2="390" y2={140 - v * 1.3} stroke="#f1f5f9" strokeWidth="1" />
              ))}
              {/* Y-axis labels */}
              {[0, 50, 100].map(v => (
                <text key={v} x="30" y={144 - v * 1.3} textAnchor="end" className="text-[10px] fill-slate-400">{v}</text>
              ))}
              {/* Line */}
              <polyline
                fill="none"
                stroke="#6366f1"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={recentSessions.map((s, i) => {
                  const x = 50 + (i / (recentSessions.length - 1)) * 340;
                  const y = 140 - (s.score * 1.3);
                  return `${x},${y}`;
                }).join(' ')}
              />
              {/* Area fill */}
              <polygon
                fill="url(#gradient)"
                opacity="0.15"
                points={`50,140 ${recentSessions.map((s, i) => {
                  const x = 50 + (i / (recentSessions.length - 1)) * 340;
                  const y = 140 - (s.score * 1.3);
                  return `${x},${y}`;
                }).join(' ')} ${50 + ((recentSessions.length - 1) / (recentSessions.length - 1)) * 340},140`}
              />
              {/* Dots */}
              {recentSessions.map((s, i) => {
                const x = 50 + (i / (recentSessions.length - 1)) * 340;
                const y = 140 - (s.score * 1.3);
                return <circle key={i} cx={x} cy={y} r="4" fill="#6366f1" stroke="white" strokeWidth="2" />;
              })}
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      )}

      {/* Subjects Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-slate-900">Tiến độ môn học</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {subjectStats.map((subject) => (
            <div key={subject.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center mb-4">
                <BookOpen className="w-5 h-5 text-indigo-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-1">{subject.name}</h4>
              <p className="text-sm text-slate-500">{subject.attempts} lần làm bài</p>
              
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-slate-400">Điểm TB</span>
                  <span className="text-xs font-bold text-indigo-600">{subject.progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${subject.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
