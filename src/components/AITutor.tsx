import React, { useState, useRef, useEffect } from 'react';
import { useChatHistory, useSettings, useCostTracker } from '../store';
import { callGeminiAI } from '../lib/gemini';
import { CostRecord } from '../types';
import { Send, Bot, User, Image as ImageIcon, Loader2, Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '../lib/utils';
import Swal from 'sweetalert2';

export function AITutor() {
  const [history, setHistory] = useChatHistory();
  const [settings] = useSettings();
  const [costs, setCosts] = useCostTracker();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history, isLoading]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      Swal.fire('Lỗi', 'Vui lòng chọn file hình ảnh!', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSend = async () => {
    if (!input.trim() && !selectedImage) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: input,
      timestamp: new Date().toISOString(),
      images: selectedImage ? [selectedImage] : undefined,
    };

    setHistory([...history, userMessage]);
    setInput('');
    setSelectedImage(null);
    setIsLoading(true);

    const recentHistory = history.slice(-5).map(msg => `${msg.role === 'user' ? 'Học sinh' : 'Gia sư'}: ${msg.content}`).join('\n');
    const prompt = `Lịch sử hội thoại:\n${recentHistory}\n\nHọc sinh: ${input}`;

    const onCostUpdate = (record: CostRecord) => {
      setCosts([...costs, record]);
    };

    const response = await callGeminiAI(
      prompt,
      settings.apiKey,
      settings.selectedModel,
      userMessage.images,
      settings.apiKeys,
      onCostUpdate
    );

    if (response) {
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model' as const,
        content: response,
        timestamp: new Date().toISOString(),
      };
      setHistory(prev => [...prev, aiMessage]);
    }

    setIsLoading(false);
  };

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
      }
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950">
      {/* Chat Header */}
      <div className="bg-white dark:bg-slate-900 px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-sm">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Gia sư AI</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Sẵn sàng giải đáp mọi thắc mắc Tin học</p>
          </div>
        </div>
        <button 
          onClick={clearHistory}
          className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 rounded-lg transition-colors"
          title="Xóa lịch sử"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {history.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-slate-500">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-full flex items-center justify-center">
              <Bot className="w-10 h-10 text-indigo-400" />
            </div>
            <div>
              <p className="text-lg font-medium text-slate-700 dark:text-slate-300">Chào bạn! Mình là Gia sư AI.</p>
              <p className="max-w-md mt-2 text-slate-500">Hãy hỏi mình bất cứ câu hỏi nào về Tin học, Thuật toán, Lập trình hoặc tải lên hình ảnh bài tập để mình giải giúp nhé!</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {['Giải thích thuật toán QuickSort', 'Binary Search hoạt động thế nào?', 'SQL JOIN là gì?'].map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => setInput(suggestion)}
                  className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-sm text-slate-600 dark:text-slate-400 hover:border-indigo-300 hover:text-indigo-600 transition-all"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          history.map((msg) => (
            <div key={msg.id} className={cn(
              "flex gap-4 max-w-4xl mx-auto animate-fade-in",
              msg.role === 'user' ? "flex-row-reverse" : ""
            )}>
              <div className={cn(
                "w-8 h-8 shrink-0 rounded-full flex items-center justify-center mt-1 shadow-sm",
                msg.role === 'user' ? "bg-indigo-600 text-white" : "bg-gradient-to-br from-emerald-400 to-teal-500 text-white"
              )}>
                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              
              <div className={cn(
                "flex flex-col gap-2 max-w-[85%]",
                msg.role === 'user' ? "items-end" : "items-start"
              )}>
                {msg.images && msg.images.map((img, idx) => (
                  <img key={idx} src={img} alt="Uploaded" className="max-w-sm rounded-xl border border-slate-200 shadow-sm" />
                ))}
                
                {msg.content && (
                  <div className={cn(
                    "px-5 py-3.5 rounded-2xl shadow-sm text-[15px] leading-relaxed",
                    msg.role === 'user' 
                      ? "bg-indigo-600 text-white rounded-tr-sm" 
                      : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-tl-sm prose prose-slate dark:prose-invert max-w-none prose-pre:bg-slate-800 prose-pre:text-slate-100 prose-code:text-indigo-600 prose-a:text-indigo-600"
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
              </div>
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="flex gap-4 max-w-4xl mx-auto">
            <div className="w-8 h-8 shrink-0 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center mt-1 shadow-sm">
              <Bot className="w-5 h-5" />
            </div>
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-5 py-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-indigo-500 animate-spin" />
              <span className="text-slate-500 font-medium">AI đang suy nghĩ...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white dark:bg-slate-900 p-4 border-t border-slate-200 dark:border-slate-800 shrink-0">
        <div className="max-w-4xl mx-auto">
          {selectedImage && (
            <div className="mb-3 relative inline-block">
              <img src={selectedImage} alt="Preview" className="h-20 rounded-lg border border-slate-200 shadow-sm" />
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center hover:bg-rose-600 shadow-md"
              >
                &times;
              </button>
            </div>
          )}
          
          <div className="flex items-end gap-2 bg-slate-50 dark:bg-slate-800 p-2 rounded-2xl border border-slate-200 dark:border-slate-700 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950 rounded-xl transition-colors shrink-0"
              title="Tải ảnh lên"
            >
              <ImageIcon className="w-6 h-6" />
            </button>
            
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Hỏi bài tập, dán code hoặc tải ảnh đề bài..."
              className="w-full max-h-32 min-h-[52px] bg-transparent border-none focus:ring-0 resize-none py-3 px-2 text-slate-700 dark:text-slate-200 placeholder:text-slate-400 outline-none"
              rows={1}
            />
            
            <button 
              onClick={handleSend}
              disabled={isLoading || (!input.trim() && !selectedImage)}
              className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0 shadow-sm shadow-indigo-200"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-center text-xs text-slate-400 mt-2">
            AI có thể mắc lỗi. Hãy kiểm tra lại các thông tin quan trọng.
          </p>
        </div>
      </div>
    </div>
  );
}
