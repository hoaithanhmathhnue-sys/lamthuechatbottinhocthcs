import React, { useState, useRef } from 'react';
import { useSettings, useProgress, useSessions, useChatHistory, useCostTracker } from '../store';
import { MODELS } from '../lib/gemini';
import { X, Key, Save, Cpu, Download, Upload, Plus, Trash2, Moon, Sun, Gauge, DollarSign } from 'lucide-react';
import Swal from 'sweetalert2';
import { ApiKeyEntry } from '../types';

interface SettingsModalProps {
  onClose: () => void;
}

export function SettingsModal({ onClose }: SettingsModalProps) {
  const [settings, setSettings] = useSettings();
  const [progress, setProgress] = useProgress();
  const [sessions, setSessions] = useSessions();
  const [history, setHistory] = useChatHistory();
  const [costs] = useCostTracker();
  
  const [apiKey, setApiKey] = useState(settings.apiKey);
  const [apiKeys, setApiKeys] = useState<ApiKeyEntry[]>(settings.apiKeys || []);
  const [selectedModel, setSelectedModel] = useState(settings.selectedModel);
  const [autoModelSelect, setAutoModelSelect] = useState(settings.autoModelSelect);
  const [theme, setTheme] = useState(settings.theme);
  const [showKey, setShowKey] = useState(false);
  const [newKeyLabel, setNewKeyLabel] = useState('');
  const [newKeyValue, setNewKeyValue] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalCost = costs.reduce((s, c) => s + c.cost, 0);

  const handleSave = () => {
    setSettings({ ...settings, apiKey, apiKeys, selectedModel, autoModelSelect, theme });
    // Apply theme immediately
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    Swal.fire({
      icon: 'success',
      title: 'Đã lưu cài đặt',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });
    onClose();
  };

  const addApiKey = () => {
    if (!newKeyValue.trim()) return;
    const entry: ApiKeyEntry = {
      key: newKeyValue.trim(),
      label: newKeyLabel.trim() || `Key ${apiKeys.length + 1}`,
      usageCount: 0,
    };
    setApiKeys([...apiKeys, entry]);
    if (!apiKey) setApiKey(newKeyValue.trim());
    setNewKeyValue('');
    setNewKeyLabel('');
  };

  const removeApiKey = (index: number) => {
    const updated = apiKeys.filter((_, i) => i !== index);
    setApiKeys(updated);
    if (updated.length > 0 && apiKey === apiKeys[index].key) {
      setApiKey(updated[0].key);
    }
  };

  const handleExport = () => {
    const data = { settings, progress, sessions, history };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai_edu_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    Swal.fire('Thành công', 'Đã xuất dữ liệu thành công!', 'success');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.settings) setSettings(data.settings);
        if (data.progress) setProgress(data.progress);
        if (data.sessions) setSessions(data.sessions);
        if (data.history) setHistory(data.history);
        Swal.fire('Thành công', 'Đã khôi phục dữ liệu thành công!', 'success');
        onClose();
      } catch {
        Swal.fire('Lỗi', 'File backup không hợp lệ!', 'error');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-fade-in">
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-700">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Cài đặt hệ thống</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto">

          {/* Theme */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              {theme === 'light' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-400" />}
              Giao diện
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setTheme('light')}
                className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition-all ${
                  theme === 'light' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                ☀️ Sáng
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition-all ${
                  theme === 'dark' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                🌙 Tối
              </button>
            </div>
          </div>

          {/* Primary API Key */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <Key className="w-4 h-4 text-indigo-500" />
              API Key chính
            </label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Nhập API Key của bạn..."
                className="w-full pl-4 pr-12 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-indigo-600 font-medium"
              >
                {showKey ? 'Ẩn' : 'Hiện'}
              </button>
            </div>
            <p className="text-xs text-slate-500">
              Lấy API Key miễn phí tại <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">Google AI Studio</a>
            </p>
          </div>

          {/* Multiple API Keys */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <Key className="w-4 h-4 text-emerald-500" />
              API Keys dự phòng ({apiKeys.length})
            </label>
            
            {apiKeys.map((k, i) => (
              <div key={i} className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 flex-1 truncate">{k.label}</span>
                <span className="text-xs text-slate-400">...{k.key.slice(-6)}</span>
                {k.isExhausted && <span className="text-xs text-rose-500 font-medium">Hết quota</span>}
                <button onClick={() => removeApiKey(i)} className="p-1 text-rose-400 hover:text-rose-600">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            <div className="flex gap-2">
              <input
                type="text"
                value={newKeyLabel}
                onChange={e => setNewKeyLabel(e.target.value)}
                placeholder="Nhãn (vd: Gmail 2)"
                className="w-1/3 px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-indigo-500"
              />
              <input
                type="password"
                value={newKeyValue}
                onChange={e => setNewKeyValue(e.target.value)}
                placeholder="API Key..."
                className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-indigo-500"
              />
              <button
                onClick={addApiKey}
                className="px-3 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-500">Khi hết quota, hệ thống tự động chuyển sang key tiếp theo.</p>
          </div>

          {/* Model Selection */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <Cpu className="w-4 h-4 text-indigo-500" />
              Mô hình AI
            </label>
            
            <div className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                id="autoModel"
                checked={autoModelSelect}
                onChange={e => setAutoModelSelect(e.target.checked)}
                className="rounded border-slate-300"
              />
              <label htmlFor="autoModel" className="text-sm text-slate-600 dark:text-slate-400">
                <Gauge className="w-3.5 h-3.5 inline mr-1" />
                Tự động chọn model theo tác vụ
              </label>
            </div>

            <div className="space-y-2">
              {MODELS.map((model) => (
                <button
                  key={model.id}
                  onClick={() => setSelectedModel(model.id)}
                  className={`w-full p-3 rounded-xl border-2 text-left transition-all ${
                    selectedModel === model.id
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">{model.name}</span>
                    <span className="text-xs text-slate-400">${model.inputCost}/1M in</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Cost Summary */}
          {totalCost > 0 && (
            <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-xl border border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-2 text-sm font-semibold text-amber-800 dark:text-amber-300 mb-1">
                <DollarSign className="w-4 h-4" />
                Chi phí API tổng cộng
              </div>
              <p className="text-2xl font-bold text-amber-900 dark:text-amber-200">${totalCost.toFixed(4)}</p>
              <p className="text-xs text-amber-600 mt-1">{costs.length} requests</p>
            </div>
          )}

          {/* Backup/Restore */}
          <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-700">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Sao lưu & Khôi phục</label>
            <div className="flex gap-3">
              <button
                onClick={handleExport}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                Xuất
              </button>
              <input type="file" accept=".json" className="hidden" ref={fileInputRef} onChange={handleImport} />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors text-sm font-medium"
              >
                <Upload className="w-4 h-4" />
                Nhập
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-200 transition-colors">
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-sm shadow-indigo-200"
          >
            <Save className="w-4 h-4" />
            Lưu cài đặt
          </button>
        </div>
      </div>
    </div>
  );
}
