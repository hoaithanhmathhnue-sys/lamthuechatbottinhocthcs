import React from 'react';
import { MapPin, School, Award, BookOpen, Star, Heart } from 'lucide-react';

export function AuthorProfile() {
  return (
    <div className="min-h-full bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900 p-6">
      {/* Hero Section */}
      <div className="max-w-2xl mx-auto">
        {/* Card chính */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 opacity-90" />

          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 backdrop-blur-sm bg-white/10" />

          {/* Content */}
          <div className="relative z-10 p-8 text-white">
            {/* Logo + Avatar */}
            <div className="flex flex-col items-center gap-4 mb-8">

              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-yellow-400 via-pink-400 to-indigo-400 shadow-2xl">
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/60">
                    <img
                      src="/avatar.jpg"
                      alt="Phạm Thị Bình"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const el = e.target as HTMLImageElement;
                        el.style.display = 'none';
                        el.parentElement!.classList.add('flex', 'items-center', 'justify-center');
                        el.parentElement!.innerHTML = '<span class="text-4xl">👩‍🏫</span>';
                      }}
                    />
                  </div>
                </div>
                {/* Badge */}
                <div className="absolute -bottom-1 -right-1 w-9 h-9 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                  <Star className="w-4 h-4 text-yellow-800 fill-yellow-800" />
                </div>
              </div>
            </div>

            {/* Tên & chức danh */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold tracking-wide mb-1">
                Phạm Thị Bình
              </h1>
              <p className="text-white/80 text-base font-medium">
                Giáo viên Tin học
              </p>
            </div>

            {/* Thông tin chi tiết */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-2xl px-5 py-3">
                <School className="w-5 h-5 text-yellow-300 flex-shrink-0" />
                <div>
                  <p className="text-xs text-white/60 font-medium uppercase tracking-wider">Đơn vị công tác</p>
                  <p className="text-white font-semibold">Trường THCS Lý Tự Trọng</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-2xl px-5 py-3">
                <MapPin className="w-5 h-5 text-pink-300 flex-shrink-0" />
                <div>
                  <p className="text-xs text-white/60 font-medium uppercase tracking-wider">Địa điểm</p>
                  <p className="text-white font-semibold">Xã Vị Xuyên</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-2xl px-5 py-3">
                <BookOpen className="w-5 h-5 text-green-300 flex-shrink-0" />
                <div>
                  <p className="text-xs text-white/60 font-medium uppercase tracking-wider">Chuyên môn</p>
                  <p className="text-white font-semibold">Tin học & Công nghệ thông tin</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[
            { icon: Award, label: 'Kinh nghiệm', value: '10+ năm', color: 'text-indigo-600' },
            { icon: BookOpen, label: 'Môn dạy', value: 'Tin học', color: 'text-purple-600' },
            { icon: Heart, label: 'Tâm huyết', value: '100%', color: 'text-pink-600' },
          ].map(({ icon: Icon, label, value, color }) => (
            <div
              key={label}
              className="bg-white dark:bg-slate-800 rounded-2xl p-4 text-center shadow-lg border border-slate-100 dark:border-slate-700"
            >
              <Icon className={`w-6 h-6 mx-auto mb-2 ${color}`} />
              <p className="text-lg font-bold text-slate-800 dark:text-white">{value}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500">{label}</p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="mt-6 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700 text-center">
          <p className="text-slate-600 dark:text-slate-300 italic text-base leading-relaxed">
            "Giáo dục không phải là đổ đầy một cái xô, mà là thắp sáng một ngọn lửa."
          </p>
          <p className="text-sm text-slate-400 mt-2">— William Butler Yeats</p>
        </div>
      </div>
    </div>
  );
}
