import { GoogleGenAI } from '@google/genai';
import Swal from 'sweetalert2';
import { ApiKeyEntry, CostRecord, Question, GradeLevel } from '../types';

export const MODELS = [
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash (Ổn định, cân bằng)', tier: 'balanced', inputCost: 0.30, outputCost: 2.50 },
  { id: 'gemini-3-flash-preview', name: 'Gemini 3 Flash (Nhanh, hiệu năng cao)', tier: 'performance', inputCost: 0.50, outputCost: 3.00 },
  { id: 'gemini-2.5-flash-lite', name: 'Gemini 2.5 Flash Lite (Rẻ nhất)', tier: 'lite', inputCost: 0.15, outputCost: 1.00 },
  { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro (Chất lượng cao nhất)', tier: 'pro', inputCost: 1.25, outputCost: 10.00 },
];

export type TaskType = 'chat' | 'quiz_gen' | 'explain' | 'code_analysis' | 'simple';

// Auto-select model based on task type (Tiered Strategy from API.md)
export function selectModelForTask(taskType: TaskType): string {
  switch (taskType) {
    case 'simple': return 'gemini-2.5-flash-lite';
    case 'chat': return 'gemini-2.5-flash';
    case 'quiz_gen': return 'gemini-2.5-flash';
    case 'explain': return 'gemini-3-flash-preview';
    case 'code_analysis': return 'gemini-2.5-pro';
    default: return 'gemini-2.5-flash';
  }
}

// Estimate cost for a request
export function estimateCost(modelId: string, inputTokens: number, outputTokens: number): number {
  const model = MODELS.find(m => m.id === modelId);
  if (!model) return 0;
  return (inputTokens / 1_000_000) * model.inputCost + (outputTokens / 1_000_000) * model.outputCost;
}

// Get next available API key (rotation)
export function getNextAvailableKey(apiKeys: ApiKeyEntry[], currentKey: string): string | null {
  const currentIndex = apiKeys.findIndex(k => k.key === currentKey);
  for (let i = 1; i <= apiKeys.length; i++) {
    const nextIdx = (currentIndex + i) % apiKeys.length;
    if (!apiKeys[nextIdx].isExhausted) {
      return apiKeys[nextIdx].key;
    }
  }
  return null;
}

export async function callGeminiAI(
  prompt: string,
  apiKey: string,
  modelId: string = 'gemini-2.5-flash',
  images: string[] = [],
  apiKeys: ApiKeyEntry[] = [],
  onCostUpdate?: (record: CostRecord) => void
): Promise<string | null> {
  if (!apiKey) {
    Swal.fire({
      icon: 'error',
      title: 'Thiếu API Key',
      text: 'Vui lòng nhập Gemini API Key trong phần Cài đặt!',
    });
    return null;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const parts: any[] = [];
    
    for (const imgBase64 of images) {
      const match = imgBase64.match(/^data:(image\/[a-zA-Z]+);base64,(.+)$/);
      if (match) {
        parts.push({
          inlineData: {
            mimeType: match[1],
            data: match[2],
          },
        });
      }
    }
    
    parts.push({ text: prompt });

    const response = await ai.models.generateContent({
      model: modelId,
      contents: { parts },
      config: {
        systemInstruction: "Bạn là một gia sư Tin học xuất sắc. Hãy giải thích chi tiết, từng bước, phân tích độ phức tạp thuật toán nếu có mã nguồn. Sử dụng tiếng Việt thân thiện, dễ hiểu, trình bày rõ ràng bằng Markdown.",
        temperature: 0.7,
      },
    });

    // Track cost
    if (onCostUpdate) {
      const inputTokens = prompt.length / 4; // rough estimate
      const outputTokens = (response.text?.length || 0) / 4;
      onCostUpdate({
        date: new Date().toISOString(),
        model: modelId,
        inputTokens,
        outputTokens,
        cost: estimateCost(modelId, inputTokens, outputTokens),
      });
    }

    return response.text || '';
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    
    // Fallback: try next model
    const currentModelIndex = MODELS.findIndex(m => m.id === modelId);
    if ((error.status === 429 || error.message?.includes('429'))) {
      // Try rotating API key first
      if (apiKeys.length > 1) {
        const nextKey = getNextAvailableKey(apiKeys, apiKey);
        if (nextKey && nextKey !== apiKey) {
          console.log(`Rotating API key...`);
          return callGeminiAI(prompt, nextKey, modelId, images, [], onCostUpdate);
        }
      }
      // Then try next model
      if (currentModelIndex < MODELS.length - 1) {
        console.log(`Fallback to ${MODELS[currentModelIndex + 1].id}`);
        return callGeminiAI(prompt, apiKey, MODELS[currentModelIndex + 1].id, images, apiKeys, onCostUpdate);
      }
    }
    
    Swal.fire({
      icon: 'error',
      title: 'Lỗi kết nối AI',
      html: `${error.message || 'Không thể kết nối đến Gemini API.'}<br><br><small>💡 Nếu hết quota, hãy thêm API key mới trong Cài đặt hoặc chờ đến ngày mai.</small>`,
    });
    return null;
  }
}

// Generate questions using AI - Pattern: rungchuongvang (model fallback chain + structured JSON)
export async function generateQuestionsAI(
  apiKey: string,
  _modelId: string,
  subjectId: string,
  subjectName: string,
  count: number = 5,
  difficulty: string = 'medium',
  _apiKeys: ApiKeyEntry[] = [],
  grade?: GradeLevel,
): Promise<Question[]> {
  const difficultyText = difficulty === 'mixed'
    ? 'hỗn hợp (bao gồm cả dễ, trung bình và khó)'
    : difficulty === 'easy' ? 'dễ' : difficulty === 'medium' ? 'trung bình' : 'khó';

  const gradeText = grade ? `Lớp ${grade}` : 'THCS/THPT';

  const prompt = `Tạo ${count} câu hỏi trắc nghiệm về chủ đề "${subjectName}" dành cho học sinh ${gradeText} với độ khó ${difficultyText}.
Yêu cầu:
- Mỗi câu có 4 đáp án
- Chỉ 1 đáp án đúng
- Nội dung phù hợp với chương trình ${gradeText}
- Có giải thích ngắn gọn
- Giữ nguyên công thức toán dạng LaTeX $...$

Trả về JSON format:
[
  {
    "content": "Câu hỏi...",
    "options": ["đáp án 1", "đáp án 2", "đáp án 3", "đáp án 4"],
    "correctAnswer": 0,
    "explanation": "Giải thích...",
    "difficulty": "easy|medium|hard"
  }
]`;

  const ai = new GoogleGenAI({ apiKey });

  // Thứ tự fallback model (giống rungchuongvang)
  const MODEL_FALLBACK_ORDER = ['gemini-2.5-flash', 'gemini-3-flash-preview', 'gemini-2.5-flash-lite', 'gemini-2.5-pro'];

  for (let i = 0; i < MODEL_FALLBACK_ORDER.length; i++) {
    const model = MODEL_FALLBACK_ORDER[i];
    try {
      console.log(`[GeminiService] Đang thử model: ${model}`);
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const text = response.text || '[]';
      const generated = JSON.parse(text);
      console.log(`[GeminiService] Thành công với model: ${model}, ${generated.length} câu hỏi`);

      // Xóa tiền tố A., B., C., D. nếu AI vẫn thêm vào
      return generated.map((q: any, idx: number) => ({
        id: `custom_${Date.now()}_${idx}`,
        subjectId,
        content: q.content,
        type: 'multiple_choice' as const,
        options: q.options.map((opt: string) => opt.replace(/^[A-D][\.)\:\/\-]\s*/i, '').trim()),
        correctAnswer: q.options[q.correctAnswer]?.replace(/^[A-D][\.)\:\/\-]\s*/i, '').trim() || q.options[0],
        explanation: q.explanation || '',
        difficulty: (['easy', 'medium', 'hard'].includes(q.difficulty) ? q.difficulty : difficulty) as 'easy' | 'medium' | 'hard',
        isCustom: true,
      }));
    } catch (error: any) {
      console.warn(`[GeminiService] Model ${model} thất bại:`, error.message);

      if (i === MODEL_FALLBACK_ORDER.length - 1) {
        if (error.message?.includes('quota') || error.message?.includes('429') || error.message?.includes('RESOURCE_EXHAUSTED')) {
          Swal.fire('Hết quota!', 'API Key đã hết quota! Vui lòng lấy API key từ Gmail khác tại https://aistudio.google.com/api-keys hoặc chờ đến ngày mai.', 'error');
        } else {
          Swal.fire('Lỗi', `Tất cả model đều thất bại. Lỗi cuối: ${error.message}`, 'error');
        }
        return [];
      }
      // Tiếp tục thử model tiếp theo
    }
  }
  return [];
}
