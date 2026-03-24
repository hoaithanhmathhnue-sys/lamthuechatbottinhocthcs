// File Parser - Đọc nội dung từ file Word (.docx) và PDF (.pdf)
// Pattern: rungchuongvang-main/src/services/fileParser.ts

import { Question, ApiKeyEntry } from '../types';

declare global {
  interface Window {
    mammoth?: any;
    pdfjsLib?: any;
  }
}

// Load mammoth.js from CDN for DOCX parsing
function loadMammoth(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.mammoth) { resolve(); return; }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mammoth@1.8.0/mammoth.browser.min.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Không thể tải thư viện đọc DOCX'));
    document.head.appendChild(script);
  });
}

// Load PDF.js from CDN for PDF parsing
function loadPdfJs(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.pdfjsLib) { resolve(); return; }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js';
    script.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js';
      resolve();
    };
    script.onerror = () => reject(new Error('Không thể tải thư viện đọc PDF'));
    document.head.appendChild(script);
  });
}

/**
 * Đọc text từ file Word (.docx) hoặc PDF (.pdf) hoặc text (.txt)
 */
export async function extractTextFromFile(file: File): Promise<string> {
  const ext = file.name.split('.').pop()?.toLowerCase();

  if (ext === 'docx' || ext === 'doc') {
    return extractFromDocx(file);
  } else if (ext === 'pdf') {
    return extractFromPdf(file);
  } else if (ext === 'txt') {
    return file.text();
  } else {
    throw new Error('Chỉ hỗ trợ file .docx, .pdf và .txt');
  }
}

async function extractFromDocx(file: File): Promise<string> {
  await loadMammoth();
  const arrayBuffer = await file.arrayBuffer();
  const result = await window.mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

async function extractFromPdf(file: File): Promise<string> {
  await loadPdfJs();
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  const pages: string[] = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const text = content.items.map((item: any) => item.str).join(' ');
    pages.push(text);
  }
  return pages.join('\n\n');
}

/**
 * Dùng Gemini API để phân tích text từ file và trích xuất câu hỏi trắc nghiệm.
 * Pattern: rungchuongvang (model fallback chain + correctAnswer as index + option prefix cleanup)
 */
export async function parseQuestionsFromText(
  apiKey: string,
  text: string,
  subjectId: string,
  count: number,
  difficulty: string,
): Promise<Question[]> {
  const { GoogleGenAI } = await import('@google/genai');
  const ai = new GoogleGenAI({ apiKey });

  const difficultyPrompt = difficulty === 'mixed'
    ? 'hỗn hợp (bao gồm cả dễ, trung bình và khó)'
    : difficulty === 'easy' ? 'dễ' : difficulty === 'medium' ? 'trung bình' : 'khó';

  const prompt = `Phân tích nội dung đề thi/bài tập sau và trích xuất ${count} câu hỏi trắc nghiệm (mức độ ${difficultyPrompt}).

Nội dung file:
---
${text.substring(0, 15000)}
---

Trả về JSON array, mỗi phần tử có format:
{
  "content": "Nội dung câu hỏi (giữ nguyên công thức toán dạng $...$)",
  "options": ["Đáp án 1", "Đáp án 2", "Đáp án 3", "Đáp án 4"], // KHÔNG BAO GỒM CÁC TIỀN TỐ "A. ", "B. ", "C. ", "D. " VÀO ĐÂY
  "correctAnswer": 0,
  "explanation": "Giải thích đáp án",
  "difficulty": "easy|medium|hard"
}

Lưu ý:
- Giữ nguyên công thức toán ở dạng LaTeX ($...$)
- correctAnswer là index (0=A, 1=B, 2=C, 3=D)
- Nếu file có sẵn đáp án thì dùng đáp án đó
- Nếu không đủ ${count} câu thì trả về bao nhiêu câu có được
- CHỈ trả về JSON array, không giải thích thêm`;

  // Thứ tự fallback model (giống rungchuongvang)
  const models = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-2.5-flash-lite', 'gemini-2.5-pro'];

  for (const model of models) {
    try {
      console.log(`[FileParser] Đang thử model: ${model}`);
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
      });
      const responseText = response.text || '';
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const generated = JSON.parse(jsonMatch[0]);
        // Xóa các tiền tố A., B., C., D. hoặc A), B) nếu AI vẫn lặp lại
        const cleaned = generated.map((q: any) => ({
          ...q,
          options: q.options.map((opt: string) => opt.replace(/^[A-D][\.)\:\/\-]\s*/i, '').trim()),
        }));
        console.log(`[FileParser] Thành công với model: ${model}, ${cleaned.length} câu hỏi`);
        // Convert to Question[] format
        return cleaned.map((q: any, idx: number) => ({
          id: `import_${Date.now()}_${idx}`,
          subjectId,
          content: q.content,
          type: 'multiple_choice' as const,
          options: q.options,
          correctAnswer: q.options[q.correctAnswer] || q.options[0],
          explanation: q.explanation || '',
          difficulty: (['easy', 'medium', 'hard'].includes(q.difficulty) ? q.difficulty : 'medium') as 'easy' | 'medium' | 'hard',
          isCustom: true,
        }));
      }
      throw new Error('Không parse được JSON');
    } catch (err: any) {
      console.warn(`[FileParser] Model ${model} failed:`, err.message);
      if (model === models[models.length - 1]) {
        // Kiểm tra lỗi hết quota
        if (err.message?.includes('quota') || err.message?.includes('429') || err.message?.includes('RESOURCE_EXHAUSTED')) {
          throw new Error('API Key đã hết quota! Vui lòng lấy API key từ một Gmail khác tại https://aistudio.google.com/api-keys hoặc chờ đến ngày mai.');
        }
        throw new Error(`Tất cả model đều thất bại. Lỗi cuối: ${err.message}`);
      }
      // Tiếp tục thử model tiếp theo
    }
  }
  throw new Error('Không thể phân tích file');
}
