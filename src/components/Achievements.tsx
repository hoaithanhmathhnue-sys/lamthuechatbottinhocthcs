import React from 'react';
import { useGamification, useSessions } from '../store';
import { ALL_BADGES, ALL_ACHIEVEMENTS, XP_PER_LEVEL } from '../data/demo';
import { Trophy, Star, Flame, Target, Zap, Medal, Lock, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

export function Achievements() {
  const [gamification] = useGamification();
  const [sessions] = useSessions();

  const xpForNextLevel = gamification.level * XP_PER_LEVEL;
  const xpProgress = gamification.xp % XP_PER_LEVEL;
  const xpPercent = Math.min((xpProgress / XP_PER_LEVEL) * 100, 100);

  // Check unlocked badges
  const unlockedBadgeIds = new Set<string>();
  if (sessions.length >= 1) unlockedBadgeIds.add('first_quiz');
  if (sessions.some(s => s.score >= 100)) unlockedBadgeIds.add('perfect_score');
  if (gamification.longestStreak >= 7) unlockedBadgeIds.add('streak_7');
  if (gamification.longestStreak >= 30) unlockedBadgeIds.add('streak_30');
  if (gamification.totalAnswered >= 50) unlockedBadgeIds.add('questions_50');
  if (gamification.totalAnswered >= 200) unlockedBadgeIds.add('questions_200');
  const subjectsAttempted = new Set(sessions.map(s => s.subjectId));
  if (subjectsAttempted.size >= 4) unlockedBadgeIds.add('all_subjects');
  if (sessions.some(s => s.mode === 'exam' && s.score >= 80)) unlockedBadgeIds.add('exam_pass');

  // Update achievements progress
  const achievementsWithProgress = gamification.achievements.map(a => {
    let current = a.current;
    if (a.id === 'ach_answer_10' || a.id === 'ach_answer_50' || a.id === 'ach_answer_200') current = gamification.totalAnswered;
    if (a.id === 'ach_correct_10' || a.id === 'ach_correct_100') current = gamification.totalCorrect;
    if (a.id === 'ach_streak_3' || a.id === 'ach_streak_7') current = gamification.longestStreak;
    if (a.id === 'ach_level_5' || a.id === 'ach_level_10') current = gamification.level;
    return { ...a, current, completed: current >= a.target };
  });

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* XP & Level Card */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-indigo-200 text-sm font-medium">Level</p>
            <p className="text-5xl font-black">{gamification.level}</p>
          </div>
          <div className="text-right">
            <p className="text-indigo-200 text-sm font-medium">Tổng XP</p>
            <p className="text-3xl font-bold">{gamification.xp} <span className="text-lg text-indigo-200">XP</span></p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-indigo-200">
            <span>{xpProgress} / {XP_PER_LEVEL} XP</span>
            <span>Level {gamification.level + 1}</span>
          </div>
          <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${xpPercent}%` }} />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Câu đã trả lời', value: gamification.totalAnswered, icon: Target, color: 'text-blue-600', bg: 'bg-blue-100' },
          { label: 'Câu đúng', value: gamification.totalCorrect, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-100' },
          { label: 'Streak dài nhất', value: `${gamification.longestStreak} ngày`, icon: Flame, color: 'text-orange-600', bg: 'bg-orange-100' },
          { label: 'Tỉ lệ đúng', value: gamification.totalAnswered > 0 ? `${Math.round((gamification.totalCorrect / gamification.totalAnswered) * 100)}%` : '0%', icon: Zap, color: 'text-purple-600', bg: 'bg-purple-100' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Badges */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Medal className="w-6 h-6 text-amber-500" />
          Huy hiệu ({unlockedBadgeIds.size}/{ALL_BADGES.length})
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {ALL_BADGES.map(badge => {
            const unlocked = unlockedBadgeIds.has(badge.id);
            return (
              <div
                key={badge.id}
                className={cn(
                  "rounded-2xl p-4 text-center border-2 transition-all",
                  unlocked
                    ? "bg-white border-amber-200 shadow-sm"
                    : "bg-slate-50 border-slate-200 opacity-50 grayscale"
                )}
              >
                <div className="text-3xl mb-2">{badge.icon}</div>
                <p className="text-sm font-bold text-slate-900">{badge.name}</p>
                <p className="text-xs text-slate-500 mt-1">{badge.description}</p>
                {unlocked ? (
                  <span className="inline-block mt-2 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                    ✓ Đã mở
                  </span>
                ) : (
                  <Lock className="w-3 h-3 text-slate-400 mx-auto mt-2" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Star className="w-6 h-6 text-yellow-500" />
          Thành tích ({achievementsWithProgress.filter(a => a.completed).length}/{achievementsWithProgress.length})
        </h3>
        <div className="space-y-3">
          {achievementsWithProgress.map(ach => {
            const pct = Math.min((ach.current / ach.target) * 100, 100);
            return (
              <div key={ach.id} className={cn(
                "bg-white rounded-xl p-4 border flex items-center gap-4",
                ach.completed ? "border-emerald-200" : "border-slate-200"
              )}>
                <div className="text-2xl">{ach.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-slate-900 text-sm">{ach.name}</p>
                    {ach.completed && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                  </div>
                  <p className="text-xs text-slate-500">{ach.description}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={cn("h-full rounded-full transition-all", ach.completed ? "bg-emerald-500" : "bg-indigo-500")}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-500">{ach.current}/{ach.target}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
