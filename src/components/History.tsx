import React from 'react';
import { useChatHistory } from '../store';
import { format } from 'date-fns';
import { MessageSquare, Bot, User, Trash2, Image as ImageIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '../lib/utils';
import Swal from 'sweetalert2';

export function History() {
  const [history, setHistory] = useChatHistory();

  const clearHistory = () => {
    Swal.fire({
      title: 'Xóa lịch sử?',
      text: 'Bạn có chắc chắn muốn xóa toàn bộ lịch sử trò chuyện?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        setHistory([]);
        Swal.fire('Đã xóa!', 'Lịch sử trò chuyện đã được xóa.', 'success');
      }
    });
  };

  if (history.length === 0) {
    return (
      <div className="p-8 text-center max-w-2xl mx-auto mt-12 animate-fade-in">
        <div className="w-24 h-24 bg-teal-50 dark:bg-teal-950 rounded-full flex items-center justify-center mx-auto mb-6">
          <MessageSquare className="w-12 h-12 text-teal-300" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Chưa có lịch sử trò chuyện</h2>
        <p className="text-slate-500 dark:text-slate-400">Hãy bắt đầu trò chuyện với Gia sư AI để xem lịch sử tại đây!</p>
      </div>
    );
  }

  // Group messages into conversations by date
  const messagesByDate = new Map<string, typeof history>();
  history.forEach(msg => {
    const dateKey = format(new Date(msg.timestamp), 'dd/MM/yyyy');
    if (!messagesByDate.has(dateKey)) {
      messagesByDate.set(dateKey, []);
    }
    messagesByDate.get(dateKey)!.push(msg);
  });

  const totalUserMessages = history.filter(m => m.role === 'user').length;
  const totalAIMessages = history.filter(m => m.role === 'model').length;

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Lịch sử trò chuyện</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            {totalUserMessages} câu hỏi • {totalAIMessages} câu trả lời
          </p>
        </div>
        <button
          onClick={clearHistory}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-rose-600 bg-rose-50 dark:bg-rose-950 hover:bg-rose-100 dark:hover:bg-rose-900 rounded-xl border border-rose-200 dark:border-rose-800 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Xóa lịch sử
        </button>
      </div>

      {/* Chat history grouped by date */}
      {Array.from(messagesByDate.entries()).reverse().map(([dateKey, messages]) => (
        <div key={dateKey} className="space-y-4">
          {/* Date header */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2">
              {dateKey}
            </span>
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
          </div>

          {/* Messages */}
          <div className="space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-3",
                  msg.role === 'user' ? "flex-row-reverse" : ""
                )}
              >
                {/* Avatar */}
                <div className={cn(
                  "w-8 h-8 shrink-0 rounded-full flex items-center justify-center mt-1 shadow-sm",
                  msg.role === 'user'
                    ? "bg-teal-600 text-white"
                    : "bg-gradient-to-br from-emerald-400 to-teal-500 text-white"
                )}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Content */}
                <div className={cn(
                  "flex flex-col gap-1.5 max-w-[80%]",
                  msg.role === 'user' ? "items-end" : "items-start"
                )}>
                  {/* Images */}
                  {msg.images && msg.images.map((img: string, idx: number) => (
                    <div key={idx} className="relative">
                      <img src={img} alt="Ảnh đính kèm" className="max-w-xs rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm" />
                      <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 bg-black/50 rounded-full text-white text-xs">
                        <ImageIcon className="w-3 h-3" />
                        Ảnh
                      </div>
                    </div>
                  ))}

                  {/* Message bubble */}
                  {msg.content && (
                    <div className={cn(
                      "px-4 py-3 rounded-2xl text-sm leading-relaxed",
                      msg.role === 'user'
                        ? "bg-teal-600 text-white rounded-tr-sm"
                        : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-tl-sm prose prose-sm prose-slate dark:prose-invert max-w-none"
                    )}>
                      {msg.role === 'user' ? (
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      ) : (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {msg.content}
                        </ReactMarkdown>
                      )}
                    </div>
                  )}

                  {/* Timestamp */}
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 px-1">
                    {format(new Date(msg.timestamp), 'HH:mm')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
