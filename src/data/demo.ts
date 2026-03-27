import { Subject, Question, Badge, Achievement, GradeLevel } from '../types';
import { TEXTBOOK_CHAPTERS } from './textbookContent';

export interface GradeInfo {
  value: GradeLevel;
  label: string;
  level: 'primary' | 'secondary' | 'highschool';
}

export const GRADES: GradeInfo[] = [
  { value: 6, label: 'Lớp 6', level: 'secondary' },
  { value: 7, label: 'Lớp 7', level: 'secondary' },
  { value: 8, label: 'Lớp 8', level: 'secondary' },
  { value: 9, label: 'Lớp 9', level: 'secondary' },
];

export const GRADE_LEVELS = {
  secondary: { label: 'THCS', grades: [6, 7, 8, 9], color: 'blue', emoji: '📘' },
};

const colors = ['emerald', 'green', 'blue', 'sky', 'indigo', 'purple', 'violet', 'fuchsia', 'rose', 'orange', 'amber', 'yellow'];

// ===== SUBJECTS: Chương ôn tập Tin học theo từng lớp =====
export const DEMO_SUBJECTS: Subject[] = [
  // --- LỚP 1 ---
  { id: 'g1_ch1', name: 'Làm quen với máy tính', icon: 'Laptop', questionsCount: 15, color: 'emerald', grade: 1 },
  { id: 'g1_ch2', name: 'Sử dụng chuột và bàn phím', icon: 'Laptop', questionsCount: 15, color: 'green', grade: 1 },

  // --- LỚP 2 ---
  { id: 'g2_ch1', name: 'Thông tin và xử lý thông tin', icon: 'Laptop', questionsCount: 15, color: 'emerald', grade: 2 },
  { id: 'g2_ch2', name: 'Phần mềm học tập', icon: 'Laptop', questionsCount: 15, color: 'green', grade: 2 },

  // --- LỚP 3-12 (Từ sách Kết nối tri thức) ---
  ...TEXTBOOK_CHAPTERS.map((ch, i) => ({
    id: ch.id,
    name: ch.title,
    icon: (ch.icon === '💻' || ch.icon === '🖥️' || ch.icon === '📱') ? 'Laptop' : 
          (ch.icon === '🌐' || ch.icon === '☁️' || ch.icon === '🌍') ? 'Network' :
          (ch.icon === '📁' || ch.icon === '🗄️' || ch.icon === '📂') ? 'Database' :
          (ch.icon === '🧩' || ch.icon === '🐱' || ch.icon === '🐍') ? 'Code2' :
          (ch.icon === '🧠' || ch.icon === '💡' || ch.icon === '🤖' || ch.icon === '⚙️') ? 'Cpu' : 'BookOpen',
    questionsCount: 15,
    color: colors[i % colors.length],
    grade: ch.grade
  }))
];

// ===== QUESTIONS: 15 câu mỗi chương =====

let qId = 1;
const q = (subjectId: string, grade: GradeLevel, content: string, options: string[], correctAnswer: string, explanation: string, difficulty: 'easy' | 'medium' | 'hard'): Question => ({
  id: `tq_${qId++}`,
  subjectId,
  content,
  type: 'multiple_choice',
  options,
  correctAnswer,
  explanation,
  difficulty,
  grade,
});

export const DEMO_QUESTIONS: Question[] = [
  // ========================================================================
  // LỚP 1 - Chương 1: Làm quen với máy tính
  // ========================================================================
  q('g1_ch1', 1, 'Máy tính dùng để làm gì?', ['Chỉ để chơi game', 'Học tập, giải trí, làm việc', 'Chỉ để xem phim', 'Chỉ để nghe nhạc'], 'Học tập, giải trí, làm việc', 'Máy tính là công cụ đa năng, giúp ta học tập, giải trí, làm việc và nhiều hoạt động khác.', 'easy'),
  q('g1_ch1', 1, 'Bộ phận nào của máy tính giúp ta nhìn thấy hình ảnh?', ['Chuột', 'Bàn phím', 'Màn hình', 'Thân máy'], 'Màn hình', 'Màn hình (monitor) là bộ phận hiển thị hình ảnh, chữ, video cho ta xem.', 'easy'),
  q('g1_ch1', 1, 'Chuột máy tính dùng để làm gì?', ['Gõ chữ', 'Di chuyển con trỏ và chọn đối tượng', 'Phát âm thanh', 'In giấy'], 'Di chuyển con trỏ và chọn đối tượng', 'Chuột giúp di chuyển con trỏ trên màn hình và chọn (click) các biểu tượng, nút lệnh.', 'easy'),
  q('g1_ch1', 1, 'Bàn phím dùng để làm gì?', ['Di chuyển con trỏ', 'Gõ chữ và nhập thông tin', 'Hiển thị hình ảnh', 'Kết nối Internet'], 'Gõ chữ và nhập thông tin', 'Bàn phím là thiết bị nhập liệu chính, giúp ta gõ chữ, số và các ký tự.', 'easy'),
  q('g1_ch1', 1, 'Thân máy (CPU) chứa gì?', ['Chỉ chứa chuột', 'Bộ xử lý và các linh kiện quan trọng', 'Chỉ chứa loa', 'Chỉ chứa màn hình'], 'Bộ xử lý và các linh kiện quan trọng', 'Thân máy chứa bộ xử lý (CPU), bộ nhớ, ổ cứng — là "bộ não" của máy tính.', 'easy'),
  q('g1_ch1', 1, 'Loa máy tính giúp ta làm gì?', ['Nhìn thấy hình ảnh', 'Nghe âm thanh', 'Gõ chữ', 'In bài'], 'Nghe âm thanh', 'Loa là thiết bị xuất âm thanh, giúp ta nghe nhạc, nghe giảng bài trên máy tính.', 'easy'),
  q('g1_ch1', 1, 'Để tắt máy tính đúng cách, em cần làm gì?', ['Rút dây điện', 'Nhấn nút Start rồi chọn Shut down', 'Đóng nắp laptop ngay', 'Không cần làm gì'], 'Nhấn nút Start rồi chọn Shut down', 'Tắt máy đúng cách bằng menu Start > Shut down giúp máy lưu dữ liệu và không bị hỏng.', 'easy'),
  q('g1_ch1', 1, 'Khi ngồi dùng máy tính, em nên ngồi như thế nào?', ['Nằm trên giường', 'Ngồi thẳng lưng, mắt cách màn hình khoảng 50cm', 'Ngồi sát màn hình', 'Ngồi nghiêng người'], 'Ngồi thẳng lưng, mắt cách màn hình khoảng 50cm', 'Tư thế đúng giúp bảo vệ mắt, cột sống khi sử dụng máy tính.', 'easy'),
  q('g1_ch1', 1, 'Thiết bị nào sau đây KHÔNG phải là bộ phận của máy tính?', ['Màn hình', 'Chuột', 'Tivi', 'Bàn phím'], 'Tivi', 'Tivi là thiết bị riêng biệt, không phải bộ phận cơ bản của máy tính dù có thể dùng làm màn hình.', 'easy'),
  q('g1_ch1', 1, 'Máy tính xách tay khác máy tính để bàn ở điểm nào?', ['Không có màn hình', 'Nhỏ gọn, có thể mang đi', 'Không có bàn phím', 'Không dùng điện'], 'Nhỏ gọn, có thể mang đi', 'Máy tính xách tay (laptop) tích hợp tất cả bộ phận trong một thiết bị nhỏ gọn, dễ di chuyển.', 'easy'),
  q('g1_ch1', 1, 'Máy in dùng để làm gì?', ['Gõ chữ', 'In bài ra giấy', 'Phát nhạc', 'Quay video'], 'In bài ra giấy', 'Máy in là thiết bị xuất, giúp in văn bản và hình ảnh từ máy tính ra giấy.', 'easy'),
  q('g1_ch1', 1, 'Em nên sử dụng máy tính bao lâu mỗi ngày?', ['Cả ngày', 'Khoảng 30-60 phút rồi nghỉ mắt', '5 phút', 'Không giới hạn'], 'Khoảng 30-60 phút rồi nghỉ mắt', 'Sử dụng máy tính vừa phải, nghỉ mắt thường xuyên giúp bảo vệ sức khỏe.', 'easy'),
  q('g1_ch1', 1, 'Biểu tượng trên màn hình máy tính gọi là gì?', ['Hình vẽ', 'Icon', 'Ảnh chụp', 'Tranh'], 'Icon', 'Icon (biểu tượng) là hình nhỏ trên Desktop đại diện cho chương trình hoặc tệp tin.', 'easy'),
  q('g1_ch1', 1, 'Nút nào trên chuột thường dùng nhất?', ['Nút phải', 'Nút giữa', 'Nút trái', 'Không có nút nào'], 'Nút trái', 'Nút trái chuột (click trái) là thao tác phổ biến nhất để chọn, mở chương trình.', 'easy'),
  q('g1_ch1', 1, 'Khi muốn khởi động máy tính, em cần nhấn nút gì?', ['Nút Restart', 'Nút Power (nút nguồn)', 'Nút Enter', 'Nút Escape'], 'Nút Power (nút nguồn)', 'Nút Power có biểu tượng hình tròn và gạch đứng, dùng để bật/tắt máy tính.', 'easy'),

  // ========================================================================
  // LỚP 1 - Chương 2: Sử dụng chuột và bàn phím
  // ========================================================================
  q('g1_ch2', 1, 'Click chuột là gì?', ['Nhấn giữ chuột', 'Nhấn nhanh nút trái chuột 1 lần', 'Kéo chuột', 'Rê chuột'], 'Nhấn nhanh nút trái chuột 1 lần', 'Click (nháy chuột) là nhấn nhanh nút trái chuột 1 lần để chọn đối tượng.', 'easy'),
  q('g1_ch2', 1, 'Double click (nháy đúp) là gì?', ['Nhấn 1 lần nút trái', 'Nhấn nhanh 2 lần nút trái', 'Nhấn nút phải', 'Rê chuột'], 'Nhấn nhanh 2 lần nút trái', 'Double click là nhấn nhanh 2 lần liên tiếp nút trái chuột, thường dùng để mở chương trình.', 'easy'),
  q('g1_ch2', 1, 'Kéo thả (Drag and Drop) chuột là thao tác gì?', ['Nhấn và giữ chuột trái rồi di chuyển', 'Nhấn chuột phải', 'Cuộn chuột giữa', 'Nhấn nhanh 3 lần'], 'Nhấn và giữ chuột trái rồi di chuyển', 'Kéo thả là nhấn giữ nút trái chuột, di chuyển đối tượng đến vị trí mới rồi thả ra.', 'easy'),
  q('g1_ch2', 1, 'Phím nào giúp em xuống dòng khi gõ văn bản?', ['Phím Space', 'Phím Enter', 'Phím Tab', 'Phím Shift'], 'Phím Enter', 'Phím Enter dùng để xuống dòng mới hoặc xác nhận lệnh.', 'easy'),
  q('g1_ch2', 1, 'Phím Space (thanh dài nhất) dùng để làm gì?', ['Xóa chữ', 'Tạo khoảng trống giữa các từ', 'Xuống dòng', 'Tắt máy'], 'Tạo khoảng trống giữa các từ', 'Phím Space Bar là phím dài nhất trên bàn phím, tạo khoảng cách giữa các từ.', 'easy'),
  q('g1_ch2', 1, 'Phím Backspace dùng để làm gì?', ['Gõ chữ', 'Xóa ký tự bên trái con trỏ', 'Xuống dòng', 'Mở trình duyệt'], 'Xóa ký tự bên trái con trỏ', 'Phím Backspace xóa ký tự ngay bên trái vị trí con trỏ đang đứng.', 'easy'),
  q('g1_ch2', 1, 'Phím Caps Lock dùng để làm gì?', ['Xóa chữ', 'Bật/tắt chế độ viết hoa', 'Xuống dòng', 'Mở menu'], 'Bật/tắt chế độ viết hoa', 'Khi Caps Lock bật, tất cả chữ cái gõ ra sẽ là chữ HOA. Nhấn lại để tắt.', 'easy'),
  q('g1_ch2', 1, 'Để gõ chữ hoa 1 ký tự, em giữ phím nào rồi gõ chữ?', ['Ctrl', 'Alt', 'Shift', 'Tab'], 'Shift', 'Giữ Shift + gõ chữ cái sẽ ra chữ HOA mà không cần bật Caps Lock.', 'easy'),
  q('g1_ch2', 1, 'Hàng phím nào chứa các chữ cái A, S, D, F?', ['Hàng phím số', 'Hàng phím cơ sở (Home row)', 'Hàng phím trên', 'Hàng phím dưới'], 'Hàng phím cơ sở (Home row)', 'Hàng phím cơ sở (Home row) chứa A S D F G H J K L — là hàng đặt ngón tay mặc định.', 'easy'),
  q('g1_ch2', 1, 'Phím Esc nằm ở đâu trên bàn phím?', ['Góc dưới phải', 'Góc trên bên trái', 'Giữa bàn phím', 'Bên phải Enter'], 'Góc trên bên trái', 'Phím Esc (Escape) nằm ở góc trên bên trái bàn phím, dùng để hủy lệnh.', 'easy'),
  q('g1_ch2', 1, 'Con trỏ chuột (con trỏ) trên màn hình thường có hình gì?', ['Hình tròn', 'Hình mũi tên', 'Hình ngôi sao', 'Hình vuông'], 'Hình mũi tên', 'Con trỏ chuột thông thường có hình mũi tên, thay đổi hình dạng tùy ngữ cảnh.', 'easy'),
  q('g1_ch2', 1, 'Khi muốn gõ số 5, em nhấn phím ở hàng nào?', ['Hàng phím cơ sở', 'Hàng phím số (trên cùng)', 'Hàng phím dưới', 'Hàng Space'], 'Hàng phím số (trên cùng)', 'Hàng phím số nằm ở trên cùng của khu vực phím chữ, chứa các số từ 1 đến 0.', 'easy'),
  q('g1_ch2', 1, 'Phím Delete dùng để làm gì?', ['Gõ chữ', 'Xóa ký tự bên phải con trỏ', 'Bật âm thanh', 'Mở file'], 'Xóa ký tự bên phải con trỏ', 'Phím Delete xóa ký tự bên phải con trỏ, khác với Backspace xóa bên trái.', 'easy'),
  q('g1_ch2', 1, 'Các phím mũi tên (←↑→↓) dùng để làm gì?', ['Gõ chữ', 'Di chuyển con trỏ trong văn bản', 'Xóa chữ', 'Tắt máy'], 'Di chuyển con trỏ trong văn bản', 'Các phím mũi tên giúp di chuyển con trỏ lên, xuống, trái, phải trong văn bản.', 'easy'),
  q('g1_ch2', 1, 'Nháy chuột phải thường mở ra cái gì?', ['Một chương trình mới', 'Menu ngắn (menu ngữ cảnh)', 'Tắt máy tính', 'Không có gì'], 'Menu ngắn (menu ngữ cảnh)', 'Nháy chuột phải mở menu ngữ cảnh (context menu) với các tùy chọn phù hợp.', 'easy'),

  // ========================================================================
  // LỚP 2 - Chương 1: Thông tin và xử lý thông tin
  // ========================================================================
  q('g2_ch1', 2, 'Thông tin là gì?', ['Chỉ là chữ viết', 'Mọi thứ ta nghe, nhìn, cảm nhận được', 'Chỉ là số liệu', 'Chỉ là hình ảnh'], 'Mọi thứ ta nghe, nhìn, cảm nhận được', 'Thông tin bao gồm mọi thứ xung quanh ta: chữ, số, hình ảnh, âm thanh, mùi vị...', 'easy'),
  q('g2_ch1', 2, 'Bức tranh vẽ là dạng thông tin gì?', ['Thông tin dạng văn bản', 'Thông tin dạng hình ảnh', 'Thông tin dạng âm thanh', 'Thông tin dạng số'], 'Thông tin dạng hình ảnh', 'Tranh, ảnh, bản đồ, biểu đồ đều là thông tin dạng hình ảnh.', 'easy'),
  q('g2_ch1', 2, 'Tiếng chuông trường là dạng thông tin gì?', ['Hình ảnh', 'Văn bản', 'Âm thanh', 'Số liệu'], 'Âm thanh', 'Tiếng chuông, nhạc, lời nói đều là thông tin dạng âm thanh.', 'easy'),
  q('g2_ch1', 2, 'Máy tính giúp ta xử lý thông tin bằng cách nào?', ['Chỉ lưu trữ', 'Nhận, xử lý và xuất thông tin', 'Chỉ hiển thị', 'Chỉ in ra giấy'], 'Nhận, xử lý và xuất thông tin', 'Máy tính thực hiện 3 bước: nhận thông tin vào → xử lý → đưa kết quả ra.', 'easy'),
  q('g2_ch1', 2, 'Thiết bị nào giúp nhập thông tin vào máy tính?', ['Màn hình', 'Loa', 'Bàn phím và chuột', 'Máy in'], 'Bàn phím và chuột', 'Bàn phím, chuột, micro, máy quét là các thiết bị nhập (input devices).', 'easy'),
  q('g2_ch1', 2, 'Thiết bị nào giúp xuất thông tin ra ngoài?', ['Bàn phím', 'Chuột', 'Màn hình và loa', 'USB'], 'Màn hình và loa', 'Màn hình, loa, máy in là các thiết bị xuất (output devices).', 'easy'),
  q('g2_ch1', 2, 'Thư mục (folder) dùng để làm gì?', ['Chạy chương trình', 'Chứa và sắp xếp các tệp tin', 'Kết nối Internet', 'Gõ văn bản'], 'Chứa và sắp xếp các tệp tin', 'Thư mục giống như ngăn tủ, giúp sắp xếp các tệp tin gọn gàng.', 'easy'),
  q('g2_ch1', 2, 'Tệp tin (file) là gì?', ['Một thư mục', 'Một đơn vị lưu trữ thông tin trên máy tính', 'Một chương trình', 'Một thiết bị'], 'Một đơn vị lưu trữ thông tin trên máy tính', 'Tệp tin là nơi lưu trữ dữ liệu như văn bản, hình ảnh, nhạc trên máy tính.', 'easy'),
  q('g2_ch1', 2, 'Bước đầu tiên khi xử lý thông tin là gì?', ['Xuất thông tin', 'Thu thập (nhận) thông tin', 'In kết quả', 'Tắt máy'], 'Thu thập (nhận) thông tin', 'Quy trình xử lý: Thu thập → Xử lý → Lưu trữ → Xuất kết quả.', 'easy'),
  q('g2_ch1', 2, 'Cuốn sách chứa thông tin dạng nào?', ['Chỉ dạng âm thanh', 'Dạng văn bản và hình ảnh', 'Chỉ dạng video', 'Dạng mùi vị'], 'Dạng văn bản và hình ảnh', 'Sách có cả chữ (văn bản) và tranh minh họa (hình ảnh).', 'easy'),
  q('g2_ch1', 2, 'USB dùng để làm gì?', ['Gõ chữ', 'Lưu trữ và chuyển dữ liệu', 'Nghe nhạc', 'Hiển thị hình ảnh'], 'Lưu trữ và chuyển dữ liệu', 'USB flash drive là thiết bị nhớ di động, giúp lưu và chuyển tệp tin giữa các máy.', 'easy'),
  q('g2_ch1', 2, 'Bảng điểm của lớp chứa thông tin dạng gì?', ['Âm thanh', 'Số liệu và văn bản', 'Video', 'Hình ảnh'], 'Số liệu và văn bản', 'Bảng điểm gồm tên (văn bản) và điểm số (số liệu).', 'easy'),
  q('g2_ch1', 2, 'Ổ cứng (hard disk) của máy tính dùng để làm gì?', ['Hiển thị hình ảnh', 'Phát âm thanh', 'Lưu trữ dữ liệu lâu dài', 'Kết nối Internet'], 'Lưu trữ dữ liệu lâu dài', 'Ổ cứng là nơi lưu trữ tất cả chương trình, tệp tin lâu dài trên máy tính.', 'easy'),
  q('g2_ch1', 2, 'Khi ta quay phim bằng điện thoại, đó là thông tin dạng gì?', ['Văn bản', 'Video (hình ảnh động kèm âm thanh)', 'Chỉ âm thanh', 'Chỉ số liệu'], 'Video (hình ảnh động kèm âm thanh)', 'Video kết hợp cả hình ảnh chuyển động và âm thanh.', 'easy'),
  q('g2_ch1', 2, 'Micro (microphone) là thiết bị nhập hay xuất?', ['Thiết bị xuất', 'Thiết bị nhập', 'Không phải thiết bị máy tính', 'Cả hai'], 'Thiết bị nhập', 'Micro thu âm thanh đưa vào máy tính → là thiết bị nhập (input).', 'easy'),

  // ========================================================================
  // LỚP 2 - Chương 2: Phần mềm học tập
  // ========================================================================
  q('g2_ch2', 2, 'Phần mềm (software) là gì?', ['Thiết bị cầm được', 'Chương trình điều khiển máy tính', 'Dây nối', 'Ổ cứng'], 'Chương trình điều khiển máy tính', 'Phần mềm là các chương trình chạy trên máy tính, không sờ được (khác với phần cứng).', 'easy'),
  q('g2_ch2', 2, 'Phần mềm Paint dùng để làm gì?', ['Gõ văn bản', 'Vẽ tranh và tô màu', 'Nghe nhạc', 'Lướt web'], 'Vẽ tranh và tô màu', 'Paint là phần mềm vẽ đơn giản, giúp em vẽ hình, tô màu trên máy tính.', 'easy'),
  q('g2_ch2', 2, 'Trong Paint, công cụ Pencil dùng để làm gì?', ['Tô màu', 'Vẽ đường tự do', 'Xóa hình', 'Chèn chữ'], 'Vẽ đường tự do', 'Pencil (bút chì) cho phép vẽ nét tự do theo cách di chuyển chuột.', 'easy'),
  q('g2_ch2', 2, 'Công cụ Eraser trong Paint dùng để làm gì?', ['Vẽ hình', 'Xóa phần đã vẽ', 'Tô màu', 'Chèn ảnh'], 'Xóa phần đã vẽ', 'Eraser (cục tẩy) xóa phần hình ảnh tại vị trí con trỏ di qua.', 'easy'),
  q('g2_ch2', 2, 'Để lưu bài vẽ trong Paint, em nhấn tổ hợp phím gì?', ['Ctrl + O', 'Ctrl + S', 'Ctrl + P', 'Ctrl + Z'], 'Ctrl + S', 'Ctrl + S (Save) là phím tắt phổ biến để lưu tệp tin trong hầu hết chương trình.', 'easy'),
  q('g2_ch2', 2, 'Phần mềm nào giúp em tập gõ bàn phím?', ['Paint', 'Mario Teaches Typing / Rapid Typing', 'Calculator', 'Media Player'], 'Mario Teaches Typing / Rapid Typing', 'Có nhiều phần mềm tập gõ như Rapid Typing, Mario Teaches Typing, TypingClub...', 'easy'),
  q('g2_ch2', 2, 'Ctrl + Z dùng để làm gì?', ['Lưu tệp', 'Hoàn tác (Undo) thao tác vừa làm', 'Mở tệp', 'In bài'], 'Hoàn tác (Undo) thao tác vừa làm', 'Ctrl + Z giúp hoàn tác thao tác cuối cùng, rất hữu ích khi làm nhầm.', 'easy'),
  q('g2_ch2', 2, 'Để mở một tệp Paint đã lưu, em nhấn tổ hợp phím gì?', ['Ctrl + S', 'Ctrl + N', 'Ctrl + O', 'Ctrl + P'], 'Ctrl + O', 'Ctrl + O (Open) mở hộp thoại để chọn và mở tệp đã có.', 'easy'),
  q('g2_ch2', 2, 'Công cụ Fill (thùng sơn) trong Paint làm gì?', ['Vẽ đường thẳng', 'Tô màu một vùng kín', 'Xóa hình', 'Cắt ảnh'], 'Tô màu một vùng kín', 'Fill tô đầy một vùng kín bằng màu đã chọn.', 'easy'),
  q('g2_ch2', 2, 'Phần mềm Calculator dùng để làm gì?', ['Vẽ tranh', 'Tính toán (máy tính bỏ túi)', 'Soạn văn bản', 'Chơi game'], 'Tính toán (máy tính bỏ túi)', 'Calculator là phần mềm máy tính bỏ túi, giúp tính cộng, trừ, nhân, chia.', 'easy'),
  q('g2_ch2', 2, 'Khi vẽ hình chữ nhật trong Paint, em dùng công cụ nào?', ['Pencil', 'Rectangle', 'Eraser', 'Text'], 'Rectangle', 'Rectangle là công cụ vẽ hình chữ nhật. Giữ Shift để vẽ hình vuông.', 'easy'),
  q('g2_ch2', 2, 'Để chọn màu vẽ trong Paint, em click vào đâu?', ['Thanh công cụ', 'Bảng màu (Color palette)', 'Menu File', 'Thanh tiêu đề'], 'Bảng màu (Color palette)', 'Bảng màu thường ở phía trên, click trái chọn màu nền trước, click phải chọn màu nền.', 'easy'),
  q('g2_ch2', 2, 'Text tool (công cụ chữ A) trong Paint làm gì?', ['Vẽ hình', 'Chèn chữ vào bức vẽ', 'Xóa nền', 'Tô màu'], 'Chèn chữ vào bức vẽ', 'Text tool cho phép gõ chữ trực tiếp lên bức vẽ.', 'easy'),
  q('g2_ch2', 2, 'Để tạo bức vẽ mới trong Paint, em nhấn tổ hợp phím gì?', ['Ctrl + O', 'Ctrl + S', 'Ctrl + N', 'Ctrl + P'], 'Ctrl + N', 'Ctrl + N (New) tạo một tệp mới, trống.', 'easy'),
  q('g2_ch2', 2, 'Nên lưu bài làm thường xuyên để tránh điều gì?', ['Máy chạy nhanh hơn', 'Mất dữ liệu khi mất điện hoặc máy lỗi', 'Màn hình sáng hơn', 'Chuột chạy nhanh hơn'], 'Mất dữ liệu khi mất điện hoặc máy lỗi', 'Lưu thường xuyên (Ctrl + S) giúp bảo vệ công việc không bị mất.', 'easy'),

  // ========================================================================
  // LỚP 3 - Chương 1: Thông tin và máy tính
  // ========================================================================
  q('g3_ch1', 3, 'Máy tính có thể lưu trữ thông tin dưới dạng nào?', ['Chỉ chữ', 'Chữ, số, hình ảnh, âm thanh, video', 'Chỉ số', 'Chỉ hình ảnh'], 'Chữ, số, hình ảnh, âm thanh, video', 'Máy tính lưu trữ mọi dạng thông tin: văn bản, số liệu, ảnh, nhạc, phim.', 'easy'),
  q('g3_ch1', 3, 'RAM là gì?', ['Ổ cứng', 'Bộ nhớ tạm thời', 'Màn hình', 'Bàn phím'], 'Bộ nhớ tạm thời', 'RAM (Random Access Memory) là bộ nhớ tạm, mất dữ liệu khi tắt máy.', 'easy'),
  q('g3_ch1', 3, 'Hệ điều hành (ví dụ: Windows) là gì?', ['Phần cứng', 'Phần mềm quản lý toàn bộ máy tính', 'Thiết bị nhập', 'Trò chơi'], 'Phần mềm quản lý toàn bộ máy tính', 'Hệ điều hành điều khiển phần cứng và cho phép chạy các phần mềm khác.', 'easy'),
  q('g3_ch1', 3, 'Desktop (màn hình nền) là gì?', ['Bàn phím', 'Màn hình hiện ra khi khởi động máy xong', 'Chuột', 'Loa'], 'Màn hình hiện ra khi khởi động máy xong', 'Desktop là giao diện chính sau khi máy tính khởi động, chứa icon và Taskbar.', 'easy'),
  q('g3_ch1', 3, 'Taskbar nằm ở vị trí nào trên Desktop?', ['Bên trên', 'Phía dưới màn hình', 'Bên trái', 'Giữa màn hình'], 'Phía dưới màn hình', 'Taskbar thường nằm phía dưới Desktop, chứa nút Start và các ứng dụng đang mở.', 'easy'),
  q('g3_ch1', 3, 'Biểu tượng Recycle Bin dùng để làm gì?', ['Lưu tệp quan trọng', 'Chứa các tệp đã xóa tạm thời', 'Mở Internet', 'Tắt máy tính'], 'Chứa các tệp đã xóa tạm thời', 'Recycle Bin (Thùng rác) lưu tạm các tệp đã xóa, có thể khôi phục lại.', 'easy'),
  q('g3_ch1', 3, 'Phần cứng (hardware) là gì?', ['Chương trình chạy trên máy', 'Các bộ phận vật lý sờ được', 'Dữ liệu trong máy', 'Hệ điều hành'], 'Các bộ phận vật lý sờ được', 'Phần cứng gồm: CPU, RAM, ổ cứng, màn hình, chuột, bàn phím — những thứ ta cầm được.', 'easy'),
  q('g3_ch1', 3, 'Webcam là thiết bị gì?', ['Thiết bị xuất hình ảnh', 'Thiết bị nhập hình ảnh/video', 'Thiết bị lưu trữ', 'Thiết bị in ấn'], 'Thiết bị nhập hình ảnh/video', 'Webcam quay video và chụp ảnh đưa vào máy tính → là thiết bị nhập.', 'easy'),
  q('g3_ch1', 3, 'Đơn vị đo dung lượng bộ nhớ nhỏ nhất là gì?', ['Megabyte (MB)', 'Gigabyte (GB)', 'Byte', 'Terabyte (TB)'], 'Byte', 'Thứ tự: Byte < KB < MB < GB < TB. 1 Byte ≈ 1 ký tự.', 'medium'),
  q('g3_ch1', 3, '1 Kilobyte (KB) bằng bao nhiêu Byte?', ['100 Byte', '1000 Byte', '1024 Byte', '2048 Byte'], '1024 Byte', '1 KB = 1024 Byte. Tương tự: 1 MB = 1024 KB, 1 GB = 1024 MB.', 'medium'),
  q('g3_ch1', 3, 'CPU được ví như bộ phận nào của con người?', ['Tay', 'Bộ não', 'Mắt', 'Tai'], 'Bộ não', 'CPU (Central Processing Unit) xử lý mọi tính toán, điều khiển — giống bộ não.', 'easy'),
  q('g3_ch1', 3, 'Khi mất điện đột ngột, dữ liệu nào bị mất?', ['Dữ liệu trên ổ cứng', 'Dữ liệu trên RAM chưa lưu', 'Dữ liệu trên USB', 'Tất cả dữ liệu'], 'Dữ liệu trên RAM chưa lưu', 'RAM là bộ nhớ tạm, mất dữ liệu khi tắt nguồn. Dữ liệu trên ổ cứng vẫn còn.', 'medium'),
  q('g3_ch1', 3, 'Windows, macOS, Linux là gì?', ['Phần mềm ứng dụng', 'Hệ điều hành', 'Trò chơi', 'Ngôn ngữ lập trình'], 'Hệ điều hành', 'Đây là 3 hệ điều hành phổ biến. Windows dùng nhiều nhất, macOS cho máy Apple.', 'easy'),
  q('g3_ch1', 3, 'Máy tính bảng (tablet) khác máy tính xách tay ở điểm nào?', ['Không có màn hình', 'Dùng màn hình cảm ứng, không có bàn phím vật lý', 'Không chạy phần mềm', 'Không kết nối Internet'], 'Dùng màn hình cảm ứng, không có bàn phím vật lý', 'Tablet dùng màn hình cảm ứng để thao tác thay vì bàn phím và chuột.', 'easy'),
  q('g3_ch1', 3, 'Bluetooth dùng để làm gì?', ['Kết nối Internet', 'Truyền dữ liệu không dây trong khoảng cách gần', 'Sạc pin', 'Bật tắt máy'], 'Truyền dữ liệu không dây trong khoảng cách gần', 'Bluetooth truyền dữ liệu không dây tầm ngắn (vài mét), dùng cho tai nghe, chuột không dây.', 'medium'),

  // ========================================================================
  // LỚP 3 - Chương 2: Em tập soạn thảo
  // ========================================================================
  q('g3_ch2', 3, 'Phần mềm nào thường dùng để soạn thảo văn bản?', ['Paint', 'Microsoft Word', 'Calculator', 'Media Player'], 'Microsoft Word', 'Microsoft Word là phần mềm soạn thảo văn bản phổ biến nhất.', 'easy'),
  q('g3_ch2', 3, 'Để in đậm chữ, em nhấn tổ hợp phím gì?', ['Ctrl + I', 'Ctrl + B', 'Ctrl + U', 'Ctrl + S'], 'Ctrl + B', 'Ctrl + B (Bold) in đậm chữ. Ctrl + I: in nghiêng, Ctrl + U: gạch chân.', 'easy'),
  q('g3_ch2', 3, 'Để in nghiêng chữ, em nhấn tổ hợp phím gì?', ['Ctrl + B', 'Ctrl + U', 'Ctrl + I', 'Ctrl + S'], 'Ctrl + I', 'Ctrl + I (Italic) làm chữ nghiêng.', 'easy'),
  q('g3_ch2', 3, 'Con trỏ soạn thảo (cursor) có hình gì?', ['Mũi tên', 'Gạch đứng nhấp nháy', 'Hình tròn', 'Hình chữ nhật'], 'Gạch đứng nhấp nháy', 'Cursor trong văn bản là gạch đứng nhấp nháy, chỉ vị trí sẽ gõ chữ.', 'easy'),
  q('g3_ch2', 3, 'Để gạch chân chữ, em dùng phím tắt nào?', ['Ctrl + B', 'Ctrl + I', 'Ctrl + U', 'Ctrl + D'], 'Ctrl + U', 'Ctrl + U (Underline) gạch chân chữ đã chọn.', 'easy'),
  q('g3_ch2', 3, 'Muốn chọn tất cả văn bản, em nhấn phím gì?', ['Ctrl + C', 'Ctrl + V', 'Ctrl + A', 'Ctrl + X'], 'Ctrl + A', 'Ctrl + A (All) chọn toàn bộ nội dung trong văn bản.', 'easy'),
  q('g3_ch2', 3, 'Ctrl + C dùng để làm gì?', ['Dán', 'Sao chép', 'Cắt', 'Xóa'], 'Sao chép', 'Ctrl + C (Copy) sao chép phần đã chọn vào bộ nhớ tạm.', 'easy'),
  q('g3_ch2', 3, 'Ctrl + V dùng để làm gì?', ['Sao chép', 'Dán', 'Cắt', 'Hoàn tác'], 'Dán', 'Ctrl + V (Paste) dán nội dung đã sao chép hoặc cắt vào vị trí con trỏ.', 'easy'),
  q('g3_ch2', 3, 'Ctrl + X dùng để làm gì?', ['Sao chép', 'Dán', 'Cắt (di chuyển)', 'Lưu'], 'Cắt (di chuyển)', 'Ctrl + X (Cut) cắt phần đã chọn — kết hợp với Ctrl + V để di chuyển.', 'easy'),
  q('g3_ch2', 3, 'Font chữ (kiểu chữ) là gì?', ['Màu chữ', 'Hình dáng và kiểu dáng của chữ', 'Kích thước chữ', 'Vị trí chữ'], 'Hình dáng và kiểu dáng của chữ', 'Font chữ quyết định kiểu dáng chữ, ví dụ: Times New Roman, Arial, Calibri.', 'easy'),
  q('g3_ch2', 3, 'Font size 12 lớn hơn hay nhỏ hơn font size 16?', ['Lớn hơn', 'Nhỏ hơn', 'Bằng nhau', 'Không so sánh được'], 'Nhỏ hơn', 'Số font size càng lớn thì chữ càng to. 12 < 16 nên chữ nhỏ hơn.', 'easy'),
  q('g3_ch2', 3, 'Để căn giữa đoạn văn, em nhấn phím tắt gì?', ['Ctrl + L', 'Ctrl + E', 'Ctrl + R', 'Ctrl + J'], 'Ctrl + E', 'Ctrl + E: căn giữa. Ctrl + L: căn trái. Ctrl + R: căn phải. Ctrl + J: căn đều.', 'medium'),
  q('g3_ch2', 3, 'Thanh công cụ (toolbar) nằm ở đâu trong Word?', ['Phía dưới', 'Phía trên trang soạn thảo', 'Bên trái', 'Bên phải'], 'Phía trên trang soạn thảo', 'Ribbon/Toolbar nằm phía trên, chứa các nút lệnh định dạng, chèn, sửa.', 'easy'),
  q('g3_ch2', 3, 'Ctrl + P dùng để làm gì?', ['Mở tệp', 'Lưu tệp', 'In tài liệu', 'Đóng tệp'], 'In tài liệu', 'Ctrl + P (Print) mở hộp thoại in để in tài liệu ra giấy.', 'easy'),
  q('g3_ch2', 3, 'Để thay đổi màu chữ, em tìm nút nào trên thanh công cụ?', ['Nút B', 'Nút có chữ A kèm màu bên dưới', 'Nút có hình kéo', 'Nút hình đĩa mềm'], 'Nút có chữ A kèm màu bên dưới', 'Nút Font Color có biểu tượng chữ A với vệt màu, cho phép đổi màu chữ.', 'easy'),

  // ========================================================================
  // LỚP 4 - Chương 1: Soạn thảo văn bản
  // ========================================================================
  q('g4_ch1', 4, 'Microsoft Word thuộc loại phần mềm gì?', ['Phần mềm đồ họa', 'Phần mềm soạn thảo văn bản', 'Phần mềm trình chiếu', 'Phần mềm hệ thống'], 'Phần mềm soạn thảo văn bản', 'Word là phần mềm soạn thảo (word processor), thuộc bộ Microsoft Office.', 'easy'),
  q('g4_ch1', 4, 'Để chèn hình ảnh vào văn bản Word, em vào tab nào?', ['Home', 'Insert', 'Design', 'View'], 'Insert', 'Tab Insert chứa các lệnh chèn: hình ảnh, bảng, biểu đồ, liên kết.', 'easy'),
  q('g4_ch1', 4, 'Để tạo bảng (table) trong Word, em vào đâu?', ['Home > Table', 'Insert > Table', 'Design > Table', 'View > Table'], 'Insert > Table', 'Insert > Table cho phép tạo bảng bằng cách chọn số hàng và cột.', 'easy'),
  q('g4_ch1', 4, 'Để đánh số trang trong Word, em vào đâu?', ['Home > Page Number', 'Insert > Page Number', 'Design > Page Number', 'View > Page Number'], 'Insert > Page Number', 'Insert > Page Number cho phép chèn số trang tự động ở đầu hoặc cuối trang.', 'medium'),
  q('g4_ch1', 4, 'Khoảng cách giữa các dòng (Line Spacing) mặc định thường là bao nhiêu?', ['1.0', '1.15 hoặc 1.5', '2.0', '3.0'], '1.15 hoặc 1.5', 'Line spacing mặc định thường là 1.15 (Word mới) hoặc 1.5, có thể thay đổi.', 'medium'),
  q('g4_ch1', 4, 'Tab nào trên Ribbon chứa các lệnh định dạng chữ (font, size, color)?', ['Insert', 'Home', 'Layout', 'Review'], 'Home', 'Tab Home chứa nhóm Font (kiểu chữ, cỡ, màu) và Paragraph (đoạn văn).', 'easy'),
  q('g4_ch1', 4, 'Lề trang (margin) là gì?', ['Khoảng cách từ chữ đến mép giấy', 'Kích thước chữ', 'Khoảng cách giữa các dòng', 'Số trang'], 'Khoảng cách từ chữ đến mép giấy', 'Margin là khoảng trắng xung quanh trang — trên, dưới, trái, phải.', 'easy'),
  q('g4_ch1', 4, 'Để kiểm tra chính tả trong Word, em dùng tính năng gì?', ['AutoCorrect', 'Spelling & Grammar', 'Find & Replace', 'WordArt'], 'Spelling & Grammar', 'Spelling & Grammar kiểm tra lỗi chính tả (gạch đỏ) và ngữ pháp (gạch xanh).', 'medium'),
  q('g4_ch1', 4, 'Find & Replace (Ctrl + H) dùng để làm gì?', ['Tìm file', 'Tìm và thay thế từ trong văn bản', 'Tìm ảnh', 'Thay đổi font chữ'], 'Tìm và thay thế từ trong văn bản', 'Find & Replace giúp tìm một từ/cụm từ và thay thế bằng từ khác nhanh chóng.', 'medium'),
  q('g4_ch1', 4, 'Định dạng danh sách có số thứ tự gọi là gì?', ['Bulleted List', 'Numbered List', 'Table', 'Header'], 'Numbered List', 'Numbered List: 1, 2, 3... Bulleted List: dùng ký hiệu (•, ■...).', 'easy'),
  q('g4_ch1', 4, 'Header và Footer là gì?', ['Tên file', 'Phần đầu trang và cuối trang lặp lại', 'Bảng biểu', 'Hình ảnh'], 'Phần đầu trang và cuối trang lặp lại', 'Header (đầu trang) và Footer (cuối trang) chứa thông tin lặp lại trên mọi trang.', 'medium'),
  q('g4_ch1', 4, 'Để lưu tệp Word với tên mới, em chọn gì?', ['Save (Ctrl+S)', 'Save As', 'Export', 'Print'], 'Save As', 'Save As cho phép đặt tên mới hoặc chọn vị trí lưu khác cho tệp.', 'easy'),
  q('g4_ch1', 4, 'Phần mở rộng của file Word thường là gì?', ['.pptx', '.xlsx', '.docx', '.pdf'], '.docx', 'File Word có đuôi .docx (hoặc .doc cho phiên bản cũ).', 'easy'),
  q('g4_ch1', 4, 'WordArt trong Word dùng để làm gì?', ['Chèn bảng', 'Tạo chữ nghệ thuật có hiệu ứng', 'Chèn ảnh', 'Kiểm tra chính tả'], 'Tạo chữ nghệ thuật có hiệu ứng', 'WordArt tạo tiêu đề đẹp với các hiệu ứng 3D, đổ bóng, uốn cong.', 'easy'),
  q('g4_ch1', 4, 'Để chèn ký tự đặc biệt (©, ™, →), em vào đâu?', ['Home > Font', 'Insert > Symbol', 'Design > Colors', 'View > Zoom'], 'Insert > Symbol', 'Insert > Symbol mở bảng ký tự đặc biệt để chèn vào văn bản.', 'medium'),

  // ========================================================================
  // LỚP 4 - Chương 2: Thiết kế bài trình chiếu
  // ========================================================================
  q('g4_ch2', 4, 'Phần mềm nào dùng để tạo bài trình chiếu?', ['Word', 'Excel', 'PowerPoint', 'Paint'], 'PowerPoint', 'Microsoft PowerPoint là phần mềm tạo bài trình chiếu (slideshow).', 'easy'),
  q('g4_ch2', 4, 'Mỗi trang trong PowerPoint gọi là gì?', ['Page', 'Sheet', 'Slide', 'Document'], 'Slide', 'Mỗi trang trình chiếu trong PowerPoint được gọi là Slide.', 'easy'),
  q('g4_ch2', 4, 'Để thêm slide mới, em nhấn phím tắt nào?', ['Ctrl + N', 'Ctrl + M', 'Ctrl + S', 'Ctrl + P'], 'Ctrl + M', 'Ctrl + M thêm slide mới. Ctrl + N tạo bài trình chiếu mới hoàn toàn.', 'easy'),
  q('g4_ch2', 4, 'Để trình chiếu từ slide đầu tiên, em nhấn phím gì?', ['F1', 'F5', 'F3', 'F7'], 'F5', 'F5 bắt đầu trình chiếu từ slide đầu. Shift + F5: từ slide hiện tại.', 'easy'),
  q('g4_ch2', 4, 'Hiệu ứng chuyển slide (Transition) là gì?', ['Chuyển đổi màu chữ', 'Hiệu ứng khi chuyển từ slide này sang slide khác', 'Chèn âm thanh', 'Xóa slide'], 'Hiệu ứng khi chuyển từ slide này sang slide khác', 'Transition tạo hiệu ứng mượt mà khi chuyển giữa các slide.', 'easy'),
  q('g4_ch2', 4, 'Animation là gì trong PowerPoint?', ['Chèn hình ảnh', 'Hiệu ứng chuyển động cho đối tượng trên slide', 'Thay đổi nền', 'In bài'], 'Hiệu ứng chuyển động cho đối tượng trên slide', 'Animation tạo hiệu ứng xuất hiện, biến mất, chuyển động cho chữ, hình ảnh.', 'easy'),
  q('g4_ch2', 4, 'Phần mở rộng file PowerPoint là gì?', ['.docx', '.xlsx', '.pptx', '.pdf'], '.pptx', 'File PowerPoint có đuôi .pptx (hoặc .ppt cho phiên bản cũ).', 'easy'),
  q('g4_ch2', 4, 'Để chèn ảnh vào slide, em vào đâu?', ['Home > Picture', 'Insert > Pictures', 'Design > Background', 'Animations > Add'], 'Insert > Pictures', 'Insert > Pictures cho phép chọn và chèn ảnh từ máy tính vào slide.', 'easy'),
  q('g4_ch2', 4, 'Layout slide là gì?', ['Màu nền slide', 'Bố cục sắp xếp nội dung trên slide', 'Kiểu chữ', 'Hiệu ứng'], 'Bố cục sắp xếp nội dung trên slide', 'Layout quy định vị trí tiêu đề, nội dung, hình ảnh trên slide.', 'easy'),
  q('g4_ch2', 4, 'Design trong PowerPoint dùng để làm gì?', ['Chèn hình', 'Chọn chủ đề và thiết kế cho slide', 'Kiểm tra chính tả', 'In bài'], 'Chọn chủ đề và thiết kế cho slide', 'Tab Design chứa các theme (chủ đề) và biến thể màu sắc cho bài trình chiếu.', 'easy'),
  q('g4_ch2', 4, 'Khi trình chiếu, nhấn phím nào để kết thúc?', ['Enter', 'Escape (Esc)', 'Space', 'Tab'], 'Escape (Esc)', 'Nhấn Esc để thoát chế độ trình chiếu trở về chế độ soạn thảo.', 'easy'),
  q('g4_ch2', 4, 'Slide Master là gì?', ['Slide đầu tiên', 'Mẫu chung quy định định dạng tất cả slide', 'Slide cuối cùng', 'Slide trống'], 'Mẫu chung quy định định dạng tất cả slide', 'Slide Master thiết lập font, màu, bố cục chung cho toàn bộ bài trình chiếu.', 'medium'),
  q('g4_ch2', 4, 'Bài trình chiếu tốt nên có đặc điểm gì?', ['Nhiều chữ nhất có thể', 'Ngắn gọn, hình ảnh rõ ràng, ít chữ', 'Không cần hình ảnh', 'Dùng nhiều font chữ khác nhau'], 'Ngắn gọn, hình ảnh rõ ràng, ít chữ', 'Slide tốt: ít chữ, hình ảnh minh họa rõ ràng, font dễ đọc, màu sắc hài hòa.', 'easy'),
  q('g4_ch2', 4, 'Để chèn video vào slide, em vào đâu?', ['Home > Video', 'Insert > Video', 'Design > Video', 'Animations > Video'], 'Insert > Video', 'Insert > Video cho phép chèn video từ máy tính hoặc trực tuyến vào slide.', 'medium'),
  q('g4_ch2', 4, 'Speaker Notes trong PowerPoint dùng để làm gì?', ['Hiển thị cho khán giả', 'Ghi chú riêng cho người trình bày', 'Chèn hình ảnh', 'Thay đổi nền'], 'Ghi chú riêng cho người trình bày', 'Speaker Notes nằm dưới slide, chỉ người trình bày thấy — dùng để ghi nhớ nội dung.', 'medium'),

  // ========================================================================
  // LỚP 5 - Chương 1: Internet và email
  // ========================================================================
  q('g5_ch1', 5, 'Internet là gì?', ['Một máy tính lớn', 'Mạng kết nối hàng tỷ máy tính trên toàn cầu', 'Một phần mềm', 'Một ổ cứng'], 'Mạng kết nối hàng tỷ máy tính trên toàn cầu', 'Internet là hệ thống mạng toàn cầu kết nối các máy tính, cho phép trao đổi thông tin.', 'easy'),
  q('g5_ch1', 5, 'Trình duyệt web (browser) dùng để làm gì?', ['Soạn văn bản', 'Truy cập và xem trang web', 'Vẽ tranh', 'Tính toán'], 'Truy cập và xem trang web', 'Browser (Chrome, Firefox, Edge...) là phần mềm truy cập trang web trên Internet.', 'easy'),
  q('g5_ch1', 5, 'URL là gì?', ['Tên máy tính', 'Địa chỉ trang web', 'Mật khẩu', 'Tên file'], 'Địa chỉ trang web', 'URL (Uniform Resource Locator) là địa chỉ duy nhất của trang web, ví dụ: https://google.com.', 'easy'),
  q('g5_ch1', 5, 'Email là gì?', ['Thư gửi bằng bưu điện', 'Thư điện tử gửi qua Internet', 'Tin nhắn SMS', 'Cuộc gọi video'], 'Thư điện tử gửi qua Internet', 'Email (Electronic Mail) là thư điện tử, gửi nhận nhanh chóng qua Internet.', 'easy'),
  q('g5_ch1', 5, 'Địa chỉ email có dạng gì?', ['www.ten.com', 'ten@nhacungcap.com', 'ten.com/email', 'http://ten'], 'ten@nhacungcap.com', 'Địa chỉ email có dạng: tên@tên miền, ví dụ: hocsinh@gmail.com. Dấu @ là bắt buộc.', 'easy'),
  q('g5_ch1', 5, 'Google là gì?', ['Hệ điều hành', 'Công cụ tìm kiếm trên Internet', 'Phần mềm soạn thảo', 'Trò chơi'], 'Công cụ tìm kiếm trên Internet', 'Google là công cụ tìm kiếm (search engine) lớn nhất, giúp tìm thông tin trên web.', 'easy'),
  q('g5_ch1', 5, 'Khi tìm kiếm trên Google, em gõ gì vào thanh tìm kiếm?', ['Mật khẩu', 'Từ khóa liên quan đến nội dung cần tìm', 'Địa chỉ nhà', 'Số điện thoại'], 'Từ khóa liên quan đến nội dung cần tìm', 'Gõ từ khóa ngắn gọn, liên quan đến chủ đề cần tìm để có kết quả tốt.', 'easy'),
  q('g5_ch1', 5, 'WiFi là gì?', ['Loại dây mạng', 'Kết nối mạng không dây', 'Hệ điều hành', 'Phần mềm diệt virus'], 'Kết nối mạng không dây', 'WiFi cho phép các thiết bị kết nối Internet không dây qua sóng radio.', 'easy'),
  q('g5_ch1', 5, 'Khi nhận email lạ có link kỳ lạ, em nên làm gì?', ['Click vào link ngay', 'Không click, xóa hoặc báo spam', 'Chuyển tiếp cho bạn bè', 'Tải file đính kèm'], 'Không click, xóa hoặc báo spam', 'Email lạ có thể là lừa đảo (phishing). Không click link, không tải file đính kèm.', 'easy'),
  q('g5_ch1', 5, 'Mật khẩu (password) mạnh nên có đặc điểm gì?', ['Chỉ dùng số 123456', 'Kết hợp chữ hoa, chữ thường, số, ký tự đặc biệt', 'Dùng tên mình', 'Chỉ 3 ký tự'], 'Kết hợp chữ hoa, chữ thường, số, ký tự đặc biệt', 'Mật khẩu mạnh ít nhất 8 ký tự, kết hợp nhiều loại: Abc@1234.', 'medium'),
  q('g5_ch1', 5, 'CC trong email nghĩa là gì?', ['Carbon Copy — gửi bản sao cho người khác', 'Close Connection', 'Copy Content', 'Central Computer'], 'Carbon Copy — gửi bản sao cho người khác', 'CC gửi bản sao email cho người khác, ai cũng thấy danh sách người nhận.', 'medium'),
  q('g5_ch1', 5, 'Attachment trong email là gì?', ['Nội dung thư', 'Tệp đính kèm', 'Chủ đề thư', 'Địa chỉ người nhận'], 'Tệp đính kèm', 'Attachment là tệp tin (ảnh, tài liệu...) đính kèm gửi cùng email.', 'easy'),
  q('g5_ch1', 5, 'Thông tin cá nhân nào KHÔNG nên chia sẻ trên Internet?', ['Sở thích', 'Địa chỉ nhà, số điện thoại, mật khẩu', 'Môn học yêu thích', 'Bài hát yêu thích'], 'Địa chỉ nhà, số điện thoại, mật khẩu', 'Thông tin nhạy cảm như địa chỉ, SĐT, mật khẩu phải giữ bí mật trên mạng.', 'easy'),
  q('g5_ch1', 5, 'Bookmark trên trình duyệt dùng để làm gì?', ['Xóa trang web', 'Lưu địa chỉ trang web yêu thích', 'Tải file', 'Gửi email'], 'Lưu địa chỉ trang web yêu thích', 'Bookmark (đánh dấu) giúp lưu lại các trang web hay để truy cập nhanh sau này.', 'easy'),
  q('g5_ch1', 5, 'Download nghĩa là gì?', ['Gửi file lên Internet', 'Tải file từ Internet về máy', 'Xóa file', 'In file'], 'Tải file từ Internet về máy', 'Download: tải xuống. Upload: tải lên. Đây là 2 thao tác cơ bản trên Internet.', 'easy'),

  // ========================================================================
  // LỚP 5 - Chương 2: Lập trình căn bản với Scratch
  // ========================================================================
  q('g5_ch2', 5, 'Scratch là gì?', ['Trình duyệt web', 'Ngôn ngữ lập trình kéo thả dành cho trẻ em', 'Phần mềm soạn thảo', 'Trò chơi điện tử'], 'Ngôn ngữ lập trình kéo thả dành cho trẻ em', 'Scratch do MIT phát triển, dùng các khối lệnh kéo thả để lập trình.', 'easy'),
  q('g5_ch2', 5, 'Trong Scratch, nhân vật trên sân khấu gọi là gì?', ['Actor', 'Sprite', 'Object', 'Player'], 'Sprite', 'Sprite là nhân vật/đối tượng di chuyển trên sân khấu (Stage).', 'easy'),
  q('g5_ch2', 5, 'Sân khấu (Stage) trong Scratch là gì?', ['Nơi viết code', 'Vùng hiển thị kết quả chương trình', 'Menu lệnh', 'Thư viện ảnh'], 'Vùng hiển thị kết quả chương trình', 'Stage là vùng hiển thị nơi các sprite hoạt động, có kích thước 480×360 pixel.', 'easy'),
  q('g5_ch2', 5, 'Khối lệnh "move 10 steps" làm gì?', ['Xoay nhân vật', 'Di chuyển nhân vật 10 bước', 'Thay đổi màu', 'Phát âm thanh'], 'Di chuyển nhân vật 10 bước', 'Move steps di chuyển sprite theo hướng đang quay, số bước tùy chỉnh.', 'easy'),
  q('g5_ch2', 5, 'Khối lệnh "repeat 10" thuộc nhóm gì?', ['Motion (Chuyển động)', 'Control (Điều khiển)', 'Looks (Hiển thị)', 'Events (Sự kiện)'], 'Control (Điều khiển)', 'Repeat (lặp) thuộc nhóm Control, lặp lại các lệnh bên trong một số lần.', 'easy'),
  q('g5_ch2', 5, 'Khối "when green flag clicked" là loại khối gì?', ['Khối Motion', 'Khối Events (sự kiện bắt đầu)', 'Khối Sound', 'Khối Looks'], 'Khối Events (sự kiện bắt đầu)', 'Khối này bắt đầu chương trình khi nhấn cờ xanh — là sự kiện khởi động.', 'easy'),
  q('g5_ch2', 5, 'Để sprite nói "Xin chào", em dùng khối nào?', ['Move 10 steps', 'Say "Xin chào"', 'Play sound', 'Turn 15 degrees'], 'Say "Xin chào"', 'Khối "say" (nhóm Looks) hiện bong bóng hội thoại trên sprite.', 'easy'),
  q('g5_ch2', 5, 'Khối "forever" làm gì?', ['Chạy 1 lần', 'Lặp lại vô hạn', 'Dừng chương trình', 'Xóa sprite'], 'Lặp lại vô hạn', 'Forever (mãi mãi) lặp vô hạn các lệnh bên trong cho đến khi dừng chương trình.', 'easy'),
  q('g5_ch2', 5, 'Khối "if...then" dùng để làm gì?', ['Lặp lại nhiều lần', 'Kiểm tra điều kiện rồi quyết định thực hiện', 'Phát nhạc', 'Di chuyển'], 'Kiểm tra điều kiện rồi quyết định thực hiện', 'If-then: nếu điều kiện đúng → thực hiện lệnh bên trong. Đây là cấu trúc rẽ nhánh.', 'medium'),
  q('g5_ch2', 5, 'Biến (variable) trong Scratch dùng để làm gì?', ['Vẽ hình', 'Lưu trữ giá trị thay đổi được (điểm, tốc độ...)', 'Phát âm thanh', 'Thay đổi nền'], 'Lưu trữ giá trị thay đổi được (điểm, tốc độ...)', 'Biến lưu giá trị số hoặc chữ, ví dụ: biến "điểm" tăng khi trả lời đúng.', 'medium'),
  q('g5_ch2', 5, 'Nhóm khối Motion (màu xanh dương) dùng để làm gì?', ['Thay đổi hình dáng', 'Điều khiển chuyển động sprite', 'Phát âm thanh', 'Nhận sự kiện'], 'Điều khiển chuyển động sprite', 'Motion chứa các khối: move, turn, go to, glide — điều khiển vị trí và hướng.', 'easy'),
  q('g5_ch2', 5, 'Khối "change costume" thuộc nhóm nào?', ['Motion', 'Control', 'Looks', 'Events'], 'Looks', 'Looks (Hiển thị) chứa các khối thay đổi hình dáng, hiệu ứng, kích thước sprite.', 'easy'),
  q('g5_ch2', 5, 'Để tạo trò chơi bắt trứng, em cần biết gì?', ['Chỉ cần khối Move', 'Biến, vòng lặp, điều kiện, sự kiện', 'Chỉ cần vẽ hình', 'Chỉ cần phát nhạc'], 'Biến, vòng lặp, điều kiện, sự kiện', 'Game cần kết hợp: biến (điểm), vòng lặp (trứng rơi), điều kiện (bắt được?), sự kiện.', 'medium'),
  q('g5_ch2', 5, 'Backdrop trong Scratch là gì?', ['Nhân vật', 'Phông nền của sân khấu', 'Âm thanh', 'Khối lệnh'], 'Phông nền của sân khấu', 'Backdrop là hình nền của Stage, có thể thay đổi bằng lệnh "switch backdrop to".', 'easy'),
  q('g5_ch2', 5, 'Khối "broadcast" dùng để làm gì?', ['Di chuyển sprite', 'Gửi thông điệp để các sprite khác nhận', 'Xóa tất cả', 'Dừng chương trình'], 'Gửi thông điệp để các sprite khác nhận', 'Broadcast gửi thông điệp; khối "when I receive" nhận — giúp các sprite giao tiếp.', 'medium'),

  // ========================================================================
  // LỚP 6 - Chương 1: Máy tính và cộng đồng
  // ========================================================================
  q('g6_ch1', 6, 'Phần mềm mã nguồn mở (open source) là gì?', ['Phần mềm phải trả tiền', 'Phần mềm miễn phí và công khai mã nguồn', 'Phần mềm virus', 'Phần mềm hệ thống'], 'Phần mềm miễn phí và công khai mã nguồn', 'Open source cho phép xem, sửa đổi, phân phối mã nguồn tự do. Ví dụ: Linux, LibreOffice.', 'medium'),
  q('g6_ch1', 6, 'Virus máy tính là gì?', ['Phần mềm có ích', 'Chương trình gây hại, lây lan trên máy tính', 'Phần cứng bị hỏng', 'File văn bản'], 'Chương trình gây hại, lây lan trên máy tính', 'Virus là mã độc tự sao chép, phá hoại dữ liệu, đánh cắp thông tin.', 'easy'),
  q('g6_ch1', 6, 'Phần mềm diệt virus có tác dụng gì?', ['Làm máy chạy chậm', 'Phát hiện và loại bỏ virus, malware', 'Tạo virus mới', 'Kết nối Internet'], 'Phát hiện và loại bỏ virus, malware', 'Phần mềm antivirus quét, phát hiện và xóa các phần mềm độc hại.', 'easy'),
  q('g6_ch1', 6, 'Bản quyền phần mềm (software license) là gì?', ['Mật khẩu đăng nhập', 'Quyền sử dụng hợp pháp do nhà phát triển cấp', 'Tên file', 'Phiên bản phần mềm'], 'Quyền sử dụng hợp pháp do nhà phát triển cấp', 'License quy định cách ta được phép sử dụng phần mềm (miễn phí, trả phí, giới hạn).', 'medium'),
  q('g6_ch1', 6, 'Sử dụng phần mềm lậu (crack) có hại gì?', ['Không có hại', 'Vi phạm pháp luật và có thể chứa virus', 'Máy chạy nhanh hơn', 'Được miễn phí mãi mãi'], 'Vi phạm pháp luật và có thể chứa virus', 'Phần mềm lậu vi phạm bản quyền, thường bị cài thêm mã độc, nguy hiểm.', 'easy'),
  q('g6_ch1', 6, 'Netiquette (văn hóa mạng) là gì?', ['Một loại virus', 'Quy tắc ứng xử văn minh trên Internet', 'Tên phần mềm', 'Loại mạng'], 'Quy tắc ứng xử văn minh trên Internet', 'Netiquette gồm: tôn trọng người khác, không spam, không bắt nạt, chia sẻ có trách nhiệm.', 'easy'),
  q('g6_ch1', 6, 'Cyberbullying (bắt nạt trên mạng) là gì?', ['Trò chơi online', 'Hành vi đe dọa, xúc phạm người khác qua mạng', 'Một loại virus', 'Quảng cáo trên mạng'], 'Hành vi đe dọa, xúc phạm người khác qua mạng', 'Cyberbullying gây tổn thương tinh thần. Nạn nhân nên nói với người lớn và báo cáo.', 'easy'),
  q('g6_ch1', 6, 'Dữ liệu cá nhân bao gồm những gì?', ['Chỉ tên', 'Tên, ngày sinh, địa chỉ, ảnh, số CMND/CCCD', 'Chỉ email', 'Chỉ số điện thoại'], 'Tên, ngày sinh, địa chỉ, ảnh, số CMND/CCCD', 'Dữ liệu cá nhân gồm tất cả thông tin nhận dạng được một cá nhân.', 'easy'),
  q('g6_ch1', 6, 'Tin giả (fake news) trên mạng là gì?', ['Tin tức chính xác', 'Thông tin sai lệch, bịa đặt nhằm lừa dối', 'Tin tức cũ', 'Quảng cáo'], 'Thông tin sai lệch, bịa đặt nhằm lừa dối', 'Fake news cố ý sai lệch. Cần kiểm tra nguồn tin trước khi tin và chia sẻ.', 'easy'),
  q('g6_ch1', 6, 'Khi gặp nội dung không phù hợp trên mạng, em nên làm gì?', ['Chia sẻ cho bạn bè', 'Thoát ra, báo cho người lớn', 'Xem tiếp', 'Tải về máy'], 'Thoát ra, báo cho người lớn', 'Thoát ngay khỏi trang có nội dung xấu và thông báo cho cha mẹ, thầy cô.', 'easy'),
  q('g6_ch1', 6, 'Trí tuệ nhân tạo (AI) là gì?', ['Robot hình người', 'Công nghệ giúp máy tính thực hiện công việc thông minh', 'Loại virus mới', 'Tên game'], 'Công nghệ giúp máy tính thực hiện công việc thông minh', 'AI giúp máy tính học hỏi, nhận diện hình ảnh, hiểu ngôn ngữ — ví dụ: Siri, ChatGPT.', 'medium'),
  q('g6_ch1', 6, 'Quyền riêng tư trên mạng nghĩa là gì?', ['Ai cũng được xem thông tin của em', 'Quyền kiểm soát thông tin cá nhân của mình', 'Không dùng Internet', 'Không có mật khẩu'], 'Quyền kiểm soát thông tin cá nhân của mình', 'Quyền riêng tư cho phép ta quyết định ai được xem thông tin cá nhân.', 'easy'),
  q('g6_ch1', 6, 'Cloud computing (điện toán đám mây) là gì?', ['Máy tính trên mây', 'Dịch vụ lưu trữ và xử lý dữ liệu trên Internet', 'Một loại mạng WiFi', 'Phần mềm diệt virus'], 'Dịch vụ lưu trữ và xử lý dữ liệu trên Internet', 'Cloud computing cho phép lưu file, chạy phần mềm trên server từ xa qua Internet.', 'medium'),
  q('g6_ch1', 6, 'Google Drive, OneDrive là dịch vụ gì?', ['Phần mềm diệt virus', 'Dịch vụ lưu trữ đám mây', 'Hệ điều hành', 'Trình duyệt web'], 'Dịch vụ lưu trữ đám mây', 'Các dịch vụ cloud storage cho phép lưu file trên Internet, truy cập từ mọi thiết bị.', 'easy'),
  q('g6_ch1', 6, 'Công dân số (digital citizen) tốt cần làm gì?', ['Sử dụng mạng tùy thích', 'Có trách nhiệm, tôn trọng, an toàn khi dùng công nghệ', 'Không dùng Internet', 'Chia sẻ mật khẩu'], 'Có trách nhiệm, tôn trọng, an toàn khi dùng công nghệ', 'Công dân số tốt: bảo vệ thông tin, tôn trọng người khác, không vi phạm bản quyền.', 'easy'),

  // ========================================================================
  // LỚP 6 - Chương 2: Mạng máy tính và Internet
  // ========================================================================
  q('g6_ch2', 6, 'Mạng LAN là gì?', ['Mạng toàn cầu', 'Mạng cục bộ trong phạm vi nhỏ', 'Mạng di động', 'Mạng vệ tinh'], 'Mạng cục bộ trong phạm vi nhỏ', 'LAN (Local Area Network) kết nối máy tính trong phạm vi nhỏ: phòng, trường, tòa nhà.', 'easy'),
  q('g6_ch2', 6, 'Mạng WAN là gì?', ['Mạng trong 1 phòng', 'Mạng diện rộng kết nối nhiều LAN', 'Mạng không dây', 'Mạng Bluetooth'], 'Mạng diện rộng kết nối nhiều LAN', 'WAN (Wide Area Network) kết nối các LAN trên phạm vi rộng — Internet là WAN lớn nhất.', 'medium'),
  q('g6_ch2', 6, 'WWW viết tắt của gì?', ['World Wide Web', 'World WiFi Wireless', 'Web Without Wires', 'Window Web Work'], 'World Wide Web', 'WWW (World Wide Web) là hệ thống trang web liên kết với nhau trên Internet.', 'easy'),
  q('g6_ch2', 6, 'Modem/Router dùng để làm gì?', ['Hiển thị hình ảnh', 'Kết nối máy tính với Internet', 'Lưu trữ dữ liệu', 'In văn bản'], 'Kết nối máy tính với Internet', 'Modem chuyển đổi tín hiệu; Router phân phối kết nối Internet cho nhiều thiết bị.', 'easy'),
  q('g6_ch2', 6, 'Trang web (website) là gì?', ['Một file Word', 'Tập hợp các trang thông tin liên kết trên Internet', 'Phần mềm diệt virus', 'Ổ cứng trực tuyến'], 'Tập hợp các trang thông tin liên kết trên Internet', 'Website gồm nhiều trang (web pages) chứa nội dung: chữ, ảnh, video, liên kết.', 'easy'),
  q('g6_ch2', 6, 'HTTPS khác HTTP ở điểm nào?', ['Nhanh hơn', 'Có mã hóa bảo mật (S = Secure)', 'Không khác gì', 'Chậm hơn'], 'Có mã hóa bảo mật (S = Secure)', 'HTTPS mã hóa dữ liệu giữa trình duyệt và server, bảo vệ thông tin cá nhân.', 'medium'),
  q('g6_ch2', 6, 'Địa chỉ IP dùng để làm gì?', ['Trang trí trang web', 'Định danh duy nhất mỗi thiết bị trên mạng', 'Diệt virus', 'Lưu file'], 'Định danh duy nhất mỗi thiết bị trên mạng', 'Mỗi thiết bị trên Internet có địa chỉ IP riêng, giống "số nhà" trên mạng.', 'medium'),
  q('g6_ch2', 6, 'Tường lửa (Firewall) dùng để làm gì?', ['Kết nối Internet nhanh hơn', 'Bảo vệ máy tính khỏi truy cập trái phép', 'Lưu trữ dữ liệu', 'Gửi email'], 'Bảo vệ máy tính khỏi truy cập trái phép', 'Firewall lọc dữ liệu ra vào, chặn truy cập không được phép.', 'medium'),
  q('g6_ch2', 6, 'Băng thông (bandwidth) là gì?', ['Kích thước màn hình', 'Tốc độ truyền dữ liệu tối đa của kết nối mạng', 'Dung lượng ổ cứng', 'Số trang web'], 'Tốc độ truyền dữ liệu tối đa của kết nối mạng', 'Băng thông đo bằng Mbps (Megabit per second), càng cao → Internet càng nhanh.', 'medium'),
  q('g6_ch2', 6, 'Email server có nhiệm vụ gì?', ['Vẽ hình', 'Lưu trữ và chuyển tiếp email', 'Chơi game', 'In ấn'], 'Lưu trữ và chuyển tiếp email', 'Email server nhận, lưu trữ và gửi email đến đúng người nhận.', 'medium'),
  q('g6_ch2', 6, 'Hyperlink (liên kết) trên trang web là gì?', ['Hình ảnh', 'Đoạn chữ/ảnh nhấn vào sẽ chuyển sang trang khác', 'Quảng cáo', 'Nút tắt máy'], 'Đoạn chữ/ảnh nhấn vào sẽ chuyển sang trang khác', 'Hyperlink kết nối các trang web với nhau. Thường có màu xanh và gạch chân.', 'easy'),
  q('g6_ch2', 6, 'Search engine (công cụ tìm kiếm) nào phổ biến nhất?', ['Bing', 'Yahoo', 'Google', 'DuckDuckGo'], 'Google', 'Google chiếm hơn 90% thị phần tìm kiếm toàn cầu.', 'easy'),
  q('g6_ch2', 6, 'Tải file từ Internet về máy gọi là gì?', ['Upload', 'Download', 'Streaming', 'Browsing'], 'Download', 'Download = tải xuống. Upload = tải lên. Streaming = xem trực tuyến.', 'easy'),
  q('g6_ch2', 6, 'Blog là gì?', ['Phần mềm diệt virus', 'Trang web cá nhân chia sẻ bài viết', 'Loại mạng LAN', 'Hệ điều hành'], 'Trang web cá nhân chia sẻ bài viết', 'Blog (weblog) là trang web nơi cá nhân viết và chia sẻ bài viết theo chủ đề.', 'easy'),
  q('g6_ch2', 6, 'Phishing là gì?', ['Câu cá', 'Lừa đảo trực tuyến để đánh cắp thông tin', 'Tên phần mềm', 'Cách kết nối mạng'], 'Lừa đảo trực tuyến để đánh cắp thông tin', 'Phishing giả mạo email/trang web của tổ chức uy tín để lừa lấy mật khẩu, thẻ ngân hàng.', 'medium'),

  // ========================================================================
  // LỚP 7 - Chương 1: Xử lý thông tin số
  // ========================================================================
  q('g7_ch1', 7, 'Hệ nhị phân (binary) dùng những chữ số nào?', ['0 đến 9', 'Chỉ 0 và 1', '0 đến 7', '0 đến F'], 'Chỉ 0 và 1', 'Hệ nhị phân (cơ số 2) chỉ dùng 2 chữ số: 0 và 1. Máy tính lưu mọi dữ liệu bằng hệ này.', 'easy'),
  q('g7_ch1', 7, 'Số 5 trong hệ thập phân bằng bao nhiêu trong hệ nhị phân?', ['100', '101', '110', '111'], '101', '5 = 4+1 = 1×2² + 0×2¹ + 1×2⁰ = 101₂', 'medium'),
  q('g7_ch1', 7, '1 bit có thể lưu được bao nhiêu giá trị?', ['1', '2', '8', '16'], '2', '1 bit lưu 0 hoặc 1 → 2 giá trị. n bit lưu 2ⁿ giá trị.', 'easy'),
  q('g7_ch1', 7, '1 Byte bằng bao nhiêu bit?', ['2 bit', '4 bit', '8 bit', '16 bit'], '8 bit', '1 Byte = 8 bit. Có thể biểu diễn 2⁸ = 256 giá trị (0-255).', 'easy'),
  q('g7_ch1', 7, 'Ảnh bitmap lưu trữ thông tin bằng gì?', ['Công thức toán', 'Các điểm ảnh (pixel) có giá trị màu', 'Văn bản', 'Âm thanh'], 'Các điểm ảnh (pixel) có giá trị màu', 'Ảnh bitmap (BMP, PNG, JPEG) lưu màu sắc của từng điểm ảnh.', 'easy'),
  q('g7_ch1', 7, 'Pixel là gì?', ['Loại file', 'Điểm ảnh nhỏ nhất tạo thành hình ảnh', 'Đơn vị âm thanh', 'Phần mềm'], 'Điểm ảnh nhỏ nhất tạo thành hình ảnh', 'Pixel (picture element) là điểm nhỏ nhất. Ảnh Full HD có 1920×1080 = 2 triệu pixel.', 'easy'),
  q('g7_ch1', 7, 'Độ phân giải ảnh (resolution) là gì?', ['Kích thước file', 'Số lượng pixel theo chiều ngang × dọc', 'Màu sắc ảnh', 'Tốc độ xử lý'], 'Số lượng pixel theo chiều ngang × dọc', 'Ảnh 1920×1080 có độ phân giải Full HD. Càng nhiều pixel → ảnh càng rõ nét.', 'medium'),
  q('g7_ch1', 7, 'Mô hình màu RGB gồm những màu nào?', ['Red, Green, Black', 'Red, Green, Blue', 'Red, Gray, Blue', 'Red, Gold, Blue'], 'Red, Green, Blue', 'RGB = Red (đỏ), Green (xanh lá), Blue (xanh dương). Mỗi thành phần 0-255.', 'easy'),
  q('g7_ch1', 7, 'Âm thanh số hóa bằng quá trình gì?', ['Nén file', 'Lấy mẫu (sampling)', 'Chụp ảnh', 'Quay video'], 'Lấy mẫu (sampling)', 'Âm thanh analog → digital bằng cách lấy mẫu nhiều lần/giây (Hz).', 'medium'),
  q('g7_ch1', 7, 'Nén file (compress) có tác dụng gì?', ['Làm file lớn hơn', 'Giảm kích thước file', 'Xóa file', 'Đổi tên file'], 'Giảm kích thước file', 'Nén giảm dung lượng file để lưu trữ và truyền nhanh hơn. Ví dụ: ZIP, RAR.', 'easy'),
  q('g7_ch1', 7, 'Định dạng file JPEG thường dùng cho gì?', ['Văn bản', 'Ảnh chụp và hình ảnh', 'Âm thanh', 'Video'], 'Ảnh chụp và hình ảnh', 'JPEG là định dạng ảnh nén lossy, phổ biến cho ảnh chụp. PNG giữ chất lượng cao hơn.', 'easy'),
  q('g7_ch1', 7, 'File MP3 chứa dữ liệu loại gì?', ['Hình ảnh', 'Âm thanh', 'Video', 'Văn bản'], 'Âm thanh', 'MP3 là định dạng âm thanh nén, phổ biến cho nhạc số.', 'easy'),
  q('g7_ch1', 7, 'Đổi số 1010₂ sang hệ thập phân bằng bao nhiêu?', ['8', '9', '10', '11'], '10', '1010₂ = 1×2³ + 0×2² + 1×2¹ + 0×2⁰ = 8+0+2+0 = 10.', 'medium'),
  q('g7_ch1', 7, 'Mã ASCII dùng để làm gì?', ['Nén file', 'Biểu diễn ký tự bằng số', 'Mã hóa video', 'Tạo mật khẩu'], 'Biểu diễn ký tự bằng số', 'ASCII gán mỗi ký tự một số (A=65, a=97, 0=48). Có 128 mã cơ bản.', 'medium'),
  q('g7_ch1', 7, 'Unicode là gì?', ['Loại virus', 'Bảng mã hỗ trợ mọi ngôn ngữ trên thế giới', 'Phần mềm', 'Hệ điều hành'], 'Bảng mã hỗ trợ mọi ngôn ngữ trên thế giới', 'Unicode hỗ trợ hầu hết ngôn ngữ (Việt, Trung, Nhật, Hàn...) với hơn 140,000 ký tự.', 'medium'),

  // ========================================================================
  // LỚP 7 - Chương 2: Phần mềm bảng tính
  // ========================================================================
  q('g7_ch2', 7, 'Phần mềm bảng tính phổ biến nhất là gì?', ['Word', 'PowerPoint', 'Excel', 'Paint'], 'Excel', 'Microsoft Excel là phần mềm bảng tính phổ biến nhất, thuộc bộ MS Office.', 'easy'),
  q('g7_ch2', 7, 'Ô (cell) trong Excel được xác định bằng gì?', ['Chỉ số hàng', 'Tên cột và số hàng (ví dụ: A1, B3)', 'Chỉ tên cột', 'Chỉ màu sắc'], 'Tên cột và số hàng (ví dụ: A1, B3)', 'Mỗi ô có địa chỉ = tên cột (A, B, C...) + số hàng (1, 2, 3...). Ví dụ: C5.', 'easy'),
  q('g7_ch2', 7, 'Hàm SUM trong Excel dùng để làm gì?', ['Đếm số ô', 'Tính tổng các giá trị', 'Tìm giá trị lớn nhất', 'Tính trung bình'], 'Tính tổng các giá trị', '=SUM(A1:A10) tính tổng giá trị từ ô A1 đến A10.', 'easy'),
  q('g7_ch2', 7, 'Hàm AVERAGE dùng để tính gì?', ['Tổng', 'Trung bình cộng', 'Giá trị lớn nhất', 'Số lượng'], 'Trung bình cộng', '=AVERAGE(A1:A10) tính trung bình cộng các giá trị.', 'easy'),
  q('g7_ch2', 7, 'Hàm MAX tìm gì?', ['Giá trị nhỏ nhất', 'Giá trị lớn nhất', 'Giá trị trung bình', 'Tổng'], 'Giá trị lớn nhất', '=MAX(A1:A10) trả về giá trị lớn nhất trong vùng dữ liệu.', 'easy'),
  q('g7_ch2', 7, 'Hàm MIN tìm gì?', ['Giá trị lớn nhất', 'Giá trị nhỏ nhất', 'Tổng', 'Số lượng ô'], 'Giá trị nhỏ nhất', '=MIN(A1:A10) trả về giá trị nhỏ nhất trong vùng dữ liệu.', 'easy'),
  q('g7_ch2', 7, 'Hàm COUNT đếm gì?', ['Đếm ô chứa chữ', 'Đếm ô chứa số', 'Tính tổng', 'Tìm giá trị lớn nhất'], 'Đếm ô chứa số', '=COUNT(A1:A10) đếm số ô chứa giá trị số (không đếm ô trống hay chữ).', 'easy'),
  q('g7_ch2', 7, 'Công thức trong Excel luôn bắt đầu bằng ký tự nào?', ['#', '*', '=', '+'], '=', 'Mọi công thức Excel bắt đầu bằng dấu = . Ví dụ: =A1+B1, =SUM(A1:A10).', 'easy'),
  q('g7_ch2', 7, 'Để sắp xếp dữ liệu trong Excel, em dùng tính năng gì?', ['Filter', 'Sort', 'Merge', 'Format'], 'Sort', 'Sort sắp xếp dữ liệu tăng dần (A-Z) hoặc giảm dần (Z-A).', 'easy'),
  q('g7_ch2', 7, 'Biểu đồ cột (Column Chart) thường dùng để làm gì?', ['Hiện tỷ lệ phần trăm', 'So sánh giá trị giữa các nhóm', 'Hiện xu hướng theo thời gian', 'Hiện mối quan hệ'], 'So sánh giá trị giữa các nhóm', 'Column chart dùng cột đứng để so sánh trực quan giá trị giữa các nhóm.', 'easy'),
  q('g7_ch2', 7, 'Biểu đồ tròn (Pie Chart) dùng để hiển thị gì?', ['Xu hướng theo thời gian', 'Tỷ lệ phần trăm của tổng thể', 'So sánh nhiều nhóm', 'Mối quan hệ'], 'Tỷ lệ phần trăm của tổng thể', 'Pie chart chia hình tròn thành các phần thể hiện tỷ lệ % của mỗi thành phần.', 'easy'),
  q('g7_ch2', 7, 'Phần mở rộng file Excel thường là gì?', ['.docx', '.xlsx', '.pptx', '.txt'], '.xlsx', 'File Excel có đuôi .xlsx (hoặc .xls cho phiên bản cũ).', 'easy'),
  q('g7_ch2', 7, 'Hàm IF trong Excel dùng để làm gì?', ['Tính tổng', 'Kiểm tra điều kiện và trả kết quả tương ứng', 'Đếm ô', 'Sắp xếp dữ liệu'], 'Kiểm tra điều kiện và trả kết quả tương ứng', '=IF(A1>=5,"Đạt","Chưa đạt") kiểm tra điều kiện → đúng: "Đạt", sai: "Chưa đạt".', 'medium'),
  q('g7_ch2', 7, 'Tham chiếu tuyệt đối trong Excel viết thế nào?', ['A1', '$A$1', '#A#1', '@A@1'], '$A$1', 'Dấu $ khóa cột/hàng khi sao chép công thức. $A$1 cố định cả cột A và hàng 1.', 'medium'),
  q('g7_ch2', 7, 'AutoFill trong Excel dùng để làm gì?', ['Xóa dữ liệu', 'Tự động điền dữ liệu theo quy luật', 'Lọc dữ liệu', 'In bảng tính'], 'Tự động điền dữ liệu theo quy luật', 'Kéo góc ô để AutoFill tự điền dãy số, ngày, công thức theo quy luật.', 'easy'),

  // ========================================================================
  // LỚP 8 - Chương 1: Lập trình đơn giản
  // ========================================================================
  q('g8_ch1', 8, 'Chương trình máy tính (program) là gì?', ['Một thiết bị', 'Tập hợp các lệnh để máy tính thực hiện', 'Một loại file ảnh', 'Một trang web'], 'Tập hợp các lệnh để máy tính thực hiện', 'Chương trình là dãy các câu lệnh viết theo ngôn ngữ lập trình, điều khiển máy tính.', 'easy'),
  q('g8_ch1', 8, 'Python là gì?', ['Hệ điều hành', 'Ngôn ngữ lập trình', 'Phần mềm đồ họa', 'Trình duyệt web'], 'Ngôn ngữ lập trình', 'Python là ngôn ngữ lập trình phổ biến, cú pháp đơn giản, dễ học.', 'easy'),
  q('g8_ch1', 8, 'Lệnh print() trong Python dùng để làm gì?', ['Nhập dữ liệu', 'In/hiển thị kết quả ra màn hình', 'Lưu file', 'Xóa dữ liệu'], 'In/hiển thị kết quả ra màn hình', 'print("Xin chào") sẽ hiển thị dòng chữ "Xin chào" trên màn hình.', 'easy'),
  q('g8_ch1', 8, 'Lệnh input() trong Python dùng để làm gì?', ['In ra màn hình', 'Nhận dữ liệu từ bàn phím', 'Tính toán', 'Vẽ hình'], 'Nhận dữ liệu từ bàn phím', 'ten = input("Nhập tên: ") — nhận dữ liệu người dùng gõ và lưu vào biến.', 'easy'),
  q('g8_ch1', 8, 'Biến (variable) trong lập trình là gì?', ['Số cố định', 'Vùng nhớ lưu trữ dữ liệu có thể thay đổi', 'Tên hàm', 'Kiểu dữ liệu'], 'Vùng nhớ lưu trữ dữ liệu có thể thay đổi', 'Biến có tên và giá trị, ví dụ: x = 10 → biến x lưu giá trị 10.', 'easy'),
  q('g8_ch1', 8, 'Trong Python, dấu # dùng để làm gì?', ['Nhân', 'Viết chú thích (comment)', 'Chia', 'So sánh'], 'Viết chú thích (comment)', '# Đây là chú thích — máy tính bỏ qua, chỉ dành cho người đọc code.', 'easy'),
  q('g8_ch1', 8, 'Kết quả của 10 // 3 trong Python là bao nhiêu?', ['3.33', '3', '1', '10'], '3', '// là phép chia lấy phần nguyên. 10 // 3 = 3 (bỏ phần dư).', 'medium'),
  q('g8_ch1', 8, 'Kết quả của 10 % 3 trong Python là bao nhiêu?', ['3', '0', '1', '10'], '1', '% là phép chia lấy dư (modulo). 10 % 3 = 1 (vì 10 = 3×3 + 1).', 'medium'),
  q('g8_ch1', 8, 'Kiểu dữ liệu int trong Python là gì?', ['Số thực', 'Số nguyên', 'Chuỗi', 'Boolean'], 'Số nguyên', 'int (integer) lưu số nguyên: 1, -5, 100. float lưu số thực: 3.14.', 'easy'),
  q('g8_ch1', 8, 'Kiểu dữ liệu str trong Python là gì?', ['Số nguyên', 'Chuỗi ký tự (text)', 'Số thực', 'Đúng/Sai'], 'Chuỗi ký tự (text)', 'str (string) lưu chuỗi ký tự: "Hello", \'Xin chào\'. Đặt trong ngoặc kép.', 'easy'),
  q('g8_ch1', 8, 'Toán tử == trong Python dùng để làm gì?', ['Gán giá trị', 'So sánh bằng', 'Cộng', 'Nhân'], 'So sánh bằng', '== so sánh hai giá trị. = gán giá trị. 5 == 5 → True, 5 == 3 → False.', 'easy'),
  q('g8_ch1', 8, 'Cấu trúc if-else dùng để làm gì?', ['Lặp lại nhiều lần', 'Rẽ nhánh: làm việc A hoặc B tùy điều kiện', 'In ra màn hình', 'Nhập dữ liệu'], 'Rẽ nhánh: làm việc A hoặc B tùy điều kiện', 'if điều_kiện: thực_hiện_A else: thực_hiện_B — tùy điều kiện đúng/sai.', 'easy'),
  q('g8_ch1', 8, 'Trong Python, khối lệnh được xác định bằng gì?', ['Dấu ngoặc {}', 'Thụt lề (indentation)', 'Dấu chấm phẩy ;', 'Dấu ngoặc ()'], 'Thụt lề (indentation)', 'Python dùng thụt lề (4 dấu cách) thay vì {} để xác định khối lệnh.', 'medium'),
  q('g8_ch1', 8, 'Hàm len() trong Python dùng để làm gì?', ['Tính tổng', 'Trả về độ dài (số phần tử/ký tự)', 'In ra màn hình', 'Sắp xếp'], 'Trả về độ dài (số phần tử/ký tự)', 'len("Hello") = 5, len([1,2,3]) = 3 — đếm số ký tự hoặc phần tử.', 'easy'),
  q('g8_ch1', 8, 'Hàm int("5") trả về giá trị gì?', ['Chuỗi "5"', 'Số nguyên 5', 'Lỗi', 'True'], 'Số nguyên 5', 'int() chuyển đổi chuỗi thành số nguyên. int("5") → 5.', 'easy'),

  // ========================================================================
  // LỚP 8 - Chương 2: Thuật toán và chương trình
  // ========================================================================
  q('g8_ch2', 8, 'Thuật toán (algorithm) là gì?', ['Ngôn ngữ lập trình', 'Dãy bước hữu hạn để giải quyết bài toán', 'Phần mềm máy tính', 'Kiểu dữ liệu'], 'Dãy bước hữu hạn để giải quyết bài toán', 'Thuật toán là tập hợp các bước rõ ràng, hữu hạn, có thứ tự để giải quyết vấn đề.', 'easy'),
  q('g8_ch2', 8, 'Lưu đồ (flowchart) dùng hình nào để biểu diễn điều kiện?', ['Hình chữ nhật', 'Hình thoi', 'Hình elip', 'Hình bình hành'], 'Hình thoi', 'Hình thoi (diamond) trong flowchart biểu diễn quyết định/điều kiện (Yes/No).', 'easy'),
  q('g8_ch2', 8, 'Vòng lặp for trong Python dùng để làm gì?', ['Rẽ nhánh', 'Lặp lại một khối lệnh với số lần xác định', 'Khai báo biến', 'Nhập dữ liệu'], 'Lặp lại một khối lệnh với số lần xác định', 'for i in range(10): lặp 10 lần với i = 0,1,2,...,9.', 'easy'),
  q('g8_ch2', 8, 'Vòng lặp while khác for ở điểm nào?', ['Không có sự khác biệt', 'while lặp khi điều kiện còn đúng, không biết trước số lần', 'while nhanh hơn for', 'while chỉ lặp 1 lần'], 'while lặp khi điều kiện còn đúng, không biết trước số lần', 'while điều_kiện: lặp cho đến khi điều kiện sai. Ví dụ: while x > 0.', 'medium'),
  q('g8_ch2', 8, 'range(1, 6) tạo ra dãy số nào?', ['1, 2, 3, 4, 5, 6', '1, 2, 3, 4, 5', '0, 1, 2, 3, 4, 5', '1, 3, 5'], '1, 2, 3, 4, 5', 'range(start, stop) tạo dãy từ start đến stop-1. range(1,6) → 1,2,3,4,5.', 'easy'),
  q('g8_ch2', 8, 'Thuật toán tìm giá trị lớn nhất trong danh sách hoạt động thế nào?', ['Chọn ngẫu nhiên', 'Giả sử phần tử đầu là max, duyệt so sánh với các phần tử còn lại', 'Sắp xếp rồi lấy cuối', 'Không thể tìm được'], 'Giả sử phần tử đầu là max, duyệt so sánh với các phần tử còn lại', 'Thuật toán: max = a[0], lặp: nếu a[i] > max → max = a[i]. Cuối cùng max là giá trị lớn nhất.', 'medium'),
  q('g8_ch2', 8, 'Danh sách (list) trong Python là gì?', ['Một biến đơn', 'Cấu trúc chứa nhiều phần tử', 'Một kiểu số', 'Một hàm'], 'Cấu trúc chứa nhiều phần tử', 'List = [1, 2, 3, "abc"] — chứa nhiều phần tử, truy cập bằng chỉ số (index).', 'easy'),
  q('g8_ch2', 8, 'Chỉ số (index) của phần tử đầu tiên trong list Python là bao nhiêu?', ['1', '0', '-1', '2'], '0', 'Python đánh số từ 0. a = [10,20,30] → a[0]=10, a[1]=20, a[2]=30.', 'easy'),
  q('g8_ch2', 8, 'Hàm (function) trong lập trình dùng để làm gì?', ['Lưu dữ liệu', 'Nhóm các lệnh thành khối có thể tái sử dụng', 'Xóa biến', 'Kết nối mạng'], 'Nhóm các lệnh thành khối có thể tái sử dụng', 'Hàm giúp tổ chức code, tránh lặp lại. def tinh_tong(a,b): return a+b.', 'medium'),
  q('g8_ch2', 8, 'Lệnh break trong vòng lặp dùng để làm gì?', ['Bắt đầu vòng lặp', 'Thoát khỏi vòng lặp ngay lập tức', 'Tiếp tục lặp', 'In kết quả'], 'Thoát khỏi vòng lặp ngay lập tức', 'break kết thúc vòng lặp ngay. continue bỏ qua phần còn lại và lặp tiếp.', 'medium'),
  q('g8_ch2', 8, 'Debug (gỡ lỗi) là gì?', ['Viết code mới', 'Tìm và sửa lỗi trong chương trình', 'Xóa chương trình', 'Cài phần mềm'], 'Tìm và sửa lỗi trong chương trình', 'Debug là quá trình tìm bug (lỗi) và sửa để chương trình chạy đúng.', 'easy'),
  q('g8_ch2', 8, 'Lỗi cú pháp (Syntax Error) là gì?', ['Lỗi logic', 'Lỗi do viết sai quy tắc ngôn ngữ lập trình', 'Lỗi khi chạy', 'Lỗi phần cứng'], 'Lỗi do viết sai quy tắc ngôn ngữ lập trình', 'Syntax Error: thiếu dấu :, sai tên lệnh... Python báo lỗi ngay khi chạy.', 'easy'),
  q('g8_ch2', 8, 'Trong lưu đồ, hình elip (oval) biểu diễn gì?', ['Điều kiện', 'Bắt đầu/Kết thúc', 'Xử lý', 'Nhập/Xuất'], 'Bắt đầu/Kết thúc', 'Oval: Start/End. Hình chữ nhật: xử lý. Hình bình hành: nhập/xuất.', 'easy'),
  q('g8_ch2', 8, 'Thuật toán sắp xếp nổi bọt (Bubble Sort) hoạt động thế nào?', ['Chọn phần tử nhỏ nhất', 'So sánh cặp liền kề, đổi chỗ nếu sai thứ tự', 'Chia đôi mảng', 'Chèn từng phần tử'], 'So sánh cặp liền kề, đổi chỗ nếu sai thứ tự', 'Bubble Sort lặp qua mảng, so sánh 2 phần tử cạnh nhau, đổi nếu sai → phần tử lớn "nổi" lên cuối.', 'medium'),
  q('g8_ch2', 8, 'Lệnh return trong hàm Python dùng để làm gì?', ['In kết quả', 'Trả về giá trị kết quả cho nơi gọi hàm', 'Kết thúc chương trình', 'Nhập dữ liệu'], 'Trả về giá trị kết quả cho nơi gọi hàm', 'return giá_trị trả kết quả và kết thúc hàm. Ví dụ: return a + b.', 'medium'),

  // ========================================================================
  // LỚP 9 - Chương 1: Thiết kế website cơ bản
  // ========================================================================
  q('g9_ch1', 9, 'HTML viết tắt của gì?', ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyper Transfer Mail Link'], 'Hyper Text Markup Language', 'HTML là ngôn ngữ đánh dấu siêu văn bản, dùng để tạo cấu trúc trang web.', 'easy'),
  q('g9_ch1', 9, 'Thẻ <h1> trong HTML dùng để làm gì?', ['Tạo đoạn văn', 'Tạo tiêu đề lớn nhất', 'Chèn hình ảnh', 'Tạo liên kết'], 'Tạo tiêu đề lớn nhất', '<h1> đến <h6> tạo tiêu đề từ lớn nhất đến nhỏ nhất.', 'easy'),
  q('g9_ch1', 9, 'Thẻ <p> dùng để tạo gì?', ['Tiêu đề', 'Đoạn văn bản', 'Hình ảnh', 'Bảng'], 'Đoạn văn bản', '<p>Đây là một đoạn văn.</p> — paragraph.', 'easy'),
  q('g9_ch1', 9, 'Thẻ <a href="url"> dùng để tạo gì?', ['Tiêu đề', 'Liên kết (hyperlink)', 'Hình ảnh', 'Danh sách'], 'Liên kết (hyperlink)', '<a href="https://google.com">Google</a> tạo liên kết đến trang web khác.', 'easy'),
  q('g9_ch1', 9, 'Thẻ <img> dùng để làm gì?', ['Tạo bảng', 'Chèn hình ảnh', 'Tạo liên kết', 'In đậm'], 'Chèn hình ảnh', '<img src="anh.jpg" alt="Mô tả"> — chèn ảnh, alt mô tả khi ảnh không hiện.', 'easy'),
  q('g9_ch1', 9, 'CSS dùng để làm gì?', ['Tạo cấu trúc trang', 'Định dạng giao diện (màu sắc, bố cục)', 'Lập trình logic', 'Lưu dữ liệu'], 'Định dạng giao diện (màu sắc, bố cục)', 'CSS (Cascading Style Sheets) trang trí trang web: màu, font, khoảng cách, bố cục.', 'easy'),
  q('g9_ch1', 9, 'Cấu trúc cơ bản của HTML gồm những thẻ nào?', ['<body> và <footer>', '<html>, <head>, <body>', '<div> và <span>', '<h1> và <p>'], '<html>, <head>, <body>', '<html> bao toàn bộ, <head> chứa thông tin, <body> chứa nội dung hiển thị.', 'easy'),
  q('g9_ch1', 9, 'Thẻ <ul> và <li> dùng để tạo gì?', ['Bảng', 'Danh sách không thứ tự', 'Tiêu đề', 'Form nhập liệu'], 'Danh sách không thứ tự', '<ul><li>Item 1</li><li>Item 2</li></ul> tạo danh sách với dấu chấm tròn.', 'easy'),
  q('g9_ch1', 9, 'Thuộc tính style trong HTML dùng để làm gì?', ['Tạo liên kết', 'Áp dụng CSS trực tiếp vào thẻ', 'Chèn ảnh', 'Tạo bảng'], 'Áp dụng CSS trực tiếp vào thẻ', '<p style="color:red">Chữ đỏ</p> — inline CSS.', 'medium'),
  q('g9_ch1', 9, 'Thẻ <table>, <tr>, <td> dùng để tạo gì?', ['Danh sách', 'Bảng biểu', 'Form', 'Hình ảnh'], 'Bảng biểu', '<table> tạo bảng, <tr> tạo hàng, <td> tạo ô dữ liệu.', 'easy'),
  q('g9_ch1', 9, 'Responsive design là gì?', ['Thiết kế chỉ cho máy tính', 'Thiết kế tự động thích ứng với mọi kích thước màn hình', 'Thiết kế chỉ cho điện thoại', 'Thiết kế không có hình ảnh'], 'Thiết kế tự động thích ứng với mọi kích thước màn hình', 'Responsive design giúp trang web hiển thị đẹp trên mọi thiết bị: PC, tablet, phone.', 'medium'),
  q('g9_ch1', 9, 'JavaScript dùng để làm gì trong website?', ['Tạo cấu trúc', 'Thêm tính tương tác và xử lý logic', 'Định dạng màu sắc', 'Lưu trữ hình ảnh'], 'Thêm tính tương tác và xử lý logic', 'JavaScript là ngôn ngữ lập trình cho web, xử lý sự kiện, animation, gọi API.', 'medium'),
  q('g9_ch1', 9, 'Thẻ <div> dùng để làm gì?', ['Tạo tiêu đề', 'Nhóm các phần tử lại thành khối', 'Chèn video', 'Tạo liên kết'], 'Nhóm các phần tử lại thành khối', '<div> là container, nhóm các thẻ HTML lại để dễ bố cục và styling.', 'easy'),
  q('g9_ch1', 9, 'Thuộc tính class trong HTML dùng để làm gì?', ['Tạo liên kết', 'Đặt tên nhóm để áp dụng CSS', 'Chèn ảnh', 'In đậm chữ'], 'Đặt tên nhóm để áp dụng CSS', 'class="ten" cho phép áp dụng cùng CSS cho nhiều phần tử.', 'medium'),
  q('g9_ch1', 9, 'Hosting là gì?', ['Phần mềm thiết kế web', 'Dịch vụ lưu trữ website trên server', 'Trình duyệt web', 'Tên miền'], 'Dịch vụ lưu trữ website trên server', 'Hosting là nơi lưu trữ file website trên server để mọi người truy cập qua Internet.', 'medium'),

  // ========================================================================
  // LỚP 9 - Chương 2: An toàn thông tin
  // ========================================================================
  q('g9_ch2', 9, 'Mã hóa (encryption) là gì?', ['Xóa dữ liệu', 'Biến đổi dữ liệu thành dạng không đọc được nếu không có khóa', 'Nén file', 'Sao lưu dữ liệu'], 'Biến đổi dữ liệu thành dạng không đọc được nếu không có khóa', 'Mã hóa bảo vệ dữ liệu — chỉ người có khóa giải mã mới đọc được.', 'medium'),
  q('g9_ch2', 9, 'Malware là gì?', ['Phần mềm hữu ích', 'Phần mềm độc hại (virus, trojan, worm...)', 'Phần mềm miễn phí', 'Hệ điều hành'], 'Phần mềm độc hại (virus, trojan, worm...)', 'Malware = Malicious Software, gồm: virus, worm, trojan, ransomware, spyware.', 'easy'),
  q('g9_ch2', 9, 'Ransomware là loại malware gì?', ['Phần mềm quảng cáo', 'Mã hóa dữ liệu và đòi tiền chuộc', 'Phần mềm theo dõi', 'Virus phá hủy file'], 'Mã hóa dữ liệu và đòi tiền chuộc', 'Ransomware khóa/mã hóa dữ liệu nạn nhân, đòi trả tiền (thường bằng Bitcoin) mới giải mã.', 'medium'),
  q('g9_ch2', 9, 'Xác thực hai yếu tố (2FA) là gì?', ['Dùng 2 mật khẩu', 'Cần 2 bước xác minh danh tính khi đăng nhập', 'Dùng 2 tài khoản', 'Đăng nhập 2 lần'], 'Cần 2 bước xác minh danh tính khi đăng nhập', '2FA yêu cầu: 1) mật khẩu + 2) mã OTP/xác nhận thiết bị → an toàn hơn.', 'medium'),
  q('g9_ch2', 9, 'Sao lưu dữ liệu (backup) quan trọng vì sao?', ['Làm máy nhanh hơn', 'Phòng ngừa mất dữ liệu do sự cố', 'Tăng dung lượng', 'Không quan trọng'], 'Phòng ngừa mất dữ liệu do sự cố', 'Backup bảo vệ dữ liệu khỏi: hỏng ổ cứng, virus, xóa nhầm, thiên tai.', 'easy'),
  q('g9_ch2', 9, 'Social engineering (kỹ thuật xã hội) là gì?', ['Một mạng xã hội', 'Lừa đảo bằng cách thao túng tâm lý con người', 'Phần mềm mạng xã hội', 'Kỹ thuật mạng'], 'Lừa đảo bằng cách thao túng tâm lý con người', 'Kẻ tấn công lợi dụng lòng tin, sự sợ hãi để lừa nạn nhân tiết lộ thông tin.', 'medium'),
  q('g9_ch2', 9, 'Cập nhật phần mềm (update) quan trọng vì sao?', ['Thay đổi giao diện', 'Vá lỗi bảo mật và cải thiện hiệu suất', 'Tăng dung lượng ổ cứng', 'Không cần thiết'], 'Vá lỗi bảo mật và cải thiện hiệu suất', 'Update vá các lỗ hổng bảo mật mà hacker có thể khai thác.', 'easy'),
  q('g9_ch2', 9, 'Cookie trên trình duyệt là gì?', ['Virus', 'File nhỏ website lưu trên máy để nhớ thông tin', 'Phần mềm diệt virus', 'Hình ảnh'], 'File nhỏ website lưu trên máy để nhớ thông tin', 'Cookie lưu thông tin đăng nhập, giỏ hàng, tùy chọn — giúp trang web nhớ bạn.', 'medium'),
  q('g9_ch2', 9, 'VPN (Virtual Private Network) dùng để làm gì?', ['Tăng tốc Internet', 'Mã hóa kết nối và bảo vệ quyền riêng tư', 'Diệt virus', 'Tạo trang web'], 'Mã hóa kết nối và bảo vệ quyền riêng tư', 'VPN mã hóa dữ liệu và ẩn IP thật, bảo vệ khi dùng WiFi công cộng.', 'medium'),
  q('g9_ch2', 9, 'Spam email là gì?', ['Email quan trọng', 'Email rác gửi hàng loạt không mong muốn', 'Email từ bạn bè', 'Email cập nhật hệ thống'], 'Email rác gửi hàng loạt không mong muốn', 'Spam là email quảng cáo/lừa đảo gửi hàng loạt. Không click link trong email spam.', 'easy'),
  q('g9_ch2', 9, 'Dấu hiệu nào cho thấy trang web an toàn?', ['Có nhiều quảng cáo', 'Có biểu tượng khóa và HTTPS trên thanh địa chỉ', 'Có nhiều màu sắc', 'URL rất dài'], 'Có biểu tượng khóa và HTTPS trên thanh địa chỉ', 'Biểu tượng khóa + HTTPS cho thấy kết nối được mã hóa, an toàn hơn.', 'easy'),
  q('g9_ch2', 9, 'Khi sử dụng WiFi công cộng, em nên làm gì?', ['Đăng nhập tài khoản ngân hàng', 'Tránh truy cập tài khoản quan trọng, dùng VPN', 'Chia sẻ mật khẩu', 'Tải phần mềm lạ'], 'Tránh truy cập tài khoản quan trọng, dùng VPN', 'WiFi công cộng không an toàn — hacker có thể đánh cắp dữ liệu. Dùng VPN để bảo vệ.', 'easy'),
  q('g9_ch2', 9, 'Trojan horse (mã độc ngựa thành Troy) là gì?', ['Virus lây lan qua email', 'Phần mềm giả dạng hữu ích nhưng chứa mã độc', 'Phần mềm diệt virus', 'Trò chơi'], 'Phần mềm giả dạng hữu ích nhưng chứa mã độc', 'Trojan giả vờ là phần mềm tốt (game, tool...) nhưng bí mật cài backdoor.', 'medium'),
  q('g9_ch2', 9, 'Quy tắc 3-2-1 trong backup nghĩa là gì?', ['3 file, 2 máy, 1 ngày', '3 bản sao, 2 loại phương tiện, 1 bản lưu ngoài', '3 ngày, 2 tuần, 1 tháng', '3 mật khẩu, 2 tài khoản, 1 email'], '3 bản sao, 2 loại phương tiện, 1 bản lưu ngoài', '3-2-1: giữ 3 bản sao, trên 2 loại thiết bị khác nhau, 1 bản ở nơi khác (cloud).', 'hard'),
  q('g9_ch2', 9, 'Keylogger là gì?', ['Phần mềm bảo mật', 'Phần mềm ghi lại mọi phím bấm để đánh cắp thông tin', 'Trình quản lý mật khẩu', 'Phần mềm diệt virus'], 'Phần mềm ghi lại mọi phím bấm để đánh cắp thông tin', 'Keylogger ghi lại tất cả phím gõ (mật khẩu, tin nhắn...) rồi gửi cho hacker. Cần phần mềm diệt virus để phát hiện.', 'medium'),

  // ========================================================================
  // LỚP 10 - Chương 1: Hệ thống máy tính và hệ điều hành
  // ========================================================================
  q('g10_ch1', 10, 'Máy tính gồm mấy thành phần chính?', ['2', '3: Phần cứng, Phần mềm, Dữ liệu', '4', '5'], '3: Phần cứng, Phần mềm, Dữ liệu', 'Ba thành phần: Hardware (phần cứng), Software (phần mềm), Data (dữ liệu/người dùng).', 'easy'),
  q('g10_ch1', 10, 'Bộ xử lý trung tâm (CPU) gồm những đơn vị chính nào?', ['RAM và ROM', 'ALU và CU (Control Unit)', 'Ổ cứng và SSD', 'GPU và APU'], 'ALU và CU (Control Unit)', 'CPU gồm: ALU (tính toán), CU (điều khiển), và thanh ghi (register).', 'medium'),
  q('g10_ch1', 10, 'ROM khác RAM ở điểm nào?', ['ROM nhanh hơn', 'ROM chỉ đọc, không mất dữ liệu khi tắt nguồn', 'ROM dung lượng lớn hơn', 'Không khác gì'], 'ROM chỉ đọc, không mất dữ liệu khi tắt nguồn', 'ROM (Read Only Memory): chỉ đọc, lưu BIOS. RAM: đọc/ghi, mất dữ liệu khi tắt.', 'medium'),
  q('g10_ch1', 10, 'SSD khác HDD ở điểm nào?', ['SSD dùng đĩa từ', 'SSD dùng chip nhớ flash, nhanh hơn và không tiếng ồn', 'HDD nhanh hơn SSD', 'Không khác gì'], 'SSD dùng chip nhớ flash, nhanh hơn và không tiếng ồn', 'SSD (Solid State Drive): không có bộ phận cơ, nhanh, bền. HDD: dùng đĩa từ quay.', 'medium'),
  q('g10_ch1', 10, 'Hệ điều hành có chức năng gì?', ['Chỉ chạy game', 'Quản lý phần cứng, phần mềm và tài nguyên', 'Chỉ kết nối mạng', 'Chỉ hiển thị hình ảnh'], 'Quản lý phần cứng, phần mềm và tài nguyên', 'HĐH quản lý: CPU, bộ nhớ, thiết bị I/O, file, tiến trình, bảo mật.', 'easy'),
  q('g10_ch1', 10, 'Phần mềm ứng dụng khác phần mềm hệ thống ở điểm nào?', ['Không khác', 'Phần mềm ứng dụng phục vụ người dùng, hệ thống quản lý máy', 'Ứng dụng chạy trước hệ thống', 'Hệ thống nhỏ hơn ứng dụng'], 'Phần mềm ứng dụng phục vụ người dùng, hệ thống quản lý máy', 'Hệ thống (OS, driver): quản lý máy. Ứng dụng (Word, Chrome): phục vụ công việc.', 'easy'),
  q('g10_ch1', 10, 'Driver (trình điều khiển) là gì?', ['Phần mềm ứng dụng', 'Phần mềm giúp HĐH giao tiếp với phần cứng', 'Phần cứng', 'Virus'], 'Phần mềm giúp HĐH giao tiếp với phần cứng', 'Driver là cầu nối giữa HĐH và thiết bị (card mạng, máy in, card đồ họa).', 'medium'),
  q('g10_ch1', 10, 'Tiến trình (process) trong HĐH là gì?', ['File đang lưu', 'Chương trình đang được thực thi', 'Thư mục', 'Ổ đĩa'], 'Chương trình đang được thực thi', 'Process là instance của chương trình đang chạy, chiếm CPU và bộ nhớ.', 'medium'),
  q('g10_ch1', 10, 'BIOS/UEFI có chức năng gì?', ['Chạy ứng dụng', 'Khởi động máy và kiểm tra phần cứng trước khi nạp HĐH', 'Kết nối Internet', 'Soạn văn bản'], 'Khởi động máy và kiểm tra phần cứng trước khi nạp HĐH', 'BIOS/UEFI chạy đầu tiên khi bật máy, kiểm tra RAM/CPU/ổ cứng rồi nạp HĐH.', 'medium'),
  q('g10_ch1', 10, 'Đa nhiệm (multitasking) là gì?', ['Chạy 1 chương trình', 'HĐH cho phép chạy nhiều chương trình đồng thời', 'Tắt tất cả chương trình', 'Chỉ có trên máy mới'], 'HĐH cho phép chạy nhiều chương trình đồng thời', 'HĐH hiện đại phân chia CPU cho nhiều tiến trình, tạo cảm giác chạy đồng thời.', 'easy'),
  q('g10_ch1', 10, 'GPU (Graphics Processing Unit) dùng để làm gì?', ['Xử lý văn bản', 'Xử lý đồ họa và hình ảnh', 'Lưu trữ dữ liệu', 'Kết nối mạng'], 'Xử lý đồ họa và hình ảnh', 'GPU chuyên xử lý đồ họa: game, video, AI. Card rời (NVIDIA, AMD) mạnh hơn card tích hợp.', 'easy'),
  q('g10_ch1', 10, 'Mainboard (bo mạch chủ) có vai trò gì?', ['Lưu trữ file', 'Kết nối tất cả linh kiện với nhau', 'Hiển thị hình ảnh', 'Phát âm thanh'], 'Kết nối tất cả linh kiện với nhau', 'Mainboard là bảng mạch trung tâm, nơi gắn CPU, RAM, GPU, ổ cứng, thiết bị I/O.', 'easy'),
  q('g10_ch1', 10, 'Bộ nhớ ảo (virtual memory) là gì?', ['RAM thật', 'Phần ổ cứng HĐH dùng khi RAM đầy', 'Bộ nhớ USB', 'Cloud storage'], 'Phần ổ cứng HĐH dùng khi RAM đầy', 'Khi RAM hết, HĐH dùng phần ổ cứng làm bộ nhớ ảo. Chậm hơn RAM thật.', 'medium'),
  q('g10_ch1', 10, 'Phân vùng ổ đĩa (partition) là gì?', ['Xóa ổ đĩa', 'Chia ổ đĩa thành nhiều phần logic riêng biệt', 'Nén ổ đĩa', 'Sao chép ổ đĩa'], 'Chia ổ đĩa thành nhiều phần logic riêng biệt', 'Partition chia 1 ổ vật lý thành nhiều ổ logic (C:, D:). Mỗi phân vùng hoạt động độc lập.', 'medium'),
  q('g10_ch1', 10, 'Nguồn điện (PSU) của máy tính để bàn có công dụng gì?', ['Kết nối Internet', 'Chuyển đổi điện AC thành DC cấp cho linh kiện', 'Hiển thị hình ảnh', 'Lưu trữ dữ liệu'], 'Chuyển đổi điện AC thành DC cấp cho linh kiện', 'PSU (Power Supply Unit) chuyển điện xoay chiều 220V thành điện một chiều 12V/5V/3.3V cho các linh kiện.', 'medium'),

  // ========================================================================
  // LỚP 10 - Chương 2: Hệ thống quản lý tệp và thư mục
  // ========================================================================
  q('g10_ch2', 10, 'Tệp tin (file) được xác định bởi gì?', ['Chỉ tên', 'Tên file và phần mở rộng', 'Chỉ kích thước', 'Chỉ ngày tạo'], 'Tên file và phần mở rộng', 'File = tên + phần mở rộng: baocao.docx, anh.jpg, nhac.mp3.', 'easy'),
  q('g10_ch2', 10, 'Hệ thống file NTFS thường dùng cho HĐH nào?', ['macOS', 'Windows', 'Linux', 'Android'], 'Windows', 'NTFS là hệ thống file mặc định của Windows. macOS dùng APFS, Linux dùng ext4.', 'medium'),
  q('g10_ch2', 10, 'Cây thư mục (directory tree) có cấu trúc như thế nào?', ['Danh sách phẳng', 'Cấu trúc phân cấp gốc → nhánh → lá', 'Vòng tròn', 'Ngẫu nhiên'], 'Cấu trúc phân cấp gốc → nhánh → lá', 'Thư mục gốc (C:\\) → thư mục con → thư mục con... tạo cấu trúc cây.', 'easy'),
  q('g10_ch2', 10, 'Đường dẫn tuyệt đối (absolute path) là gì?', ['Đường dẫn từ thư mục hiện tại', 'Đường dẫn đầy đủ từ thư mục gốc', 'Tên file', 'Shortcut'], 'Đường dẫn đầy đủ từ thư mục gốc', 'Tuyệt đối: C:\\Users\\Thanh\\Documents\\bai.docx. Tương đối: .\\Documents\\bai.docx.', 'medium'),
  q('g10_ch2', 10, 'Ký tự đại diện * (wildcard) dùng để làm gì?', ['Nhân', 'Đại diện cho bất kỳ chuỗi ký tự nào khi tìm file', 'Xóa file', 'Đổi tên file'], 'Đại diện cho bất kỳ chuỗi ký tự nào khi tìm file', '*.docx tìm tất cả file Word. bai*.pdf tìm file PDF bắt đầu bằng "bai".', 'medium'),
  q('g10_ch2', 10, 'Quyền truy cập file (permission) gồm những quyền cơ bản nào?', ['Chỉ đọc', 'Đọc (Read), Ghi (Write), Thực thi (Execute)', 'Chỉ xóa', 'Chỉ sao chép'], 'Đọc (Read), Ghi (Write), Thực thi (Execute)', 'R (đọc), W (ghi/sửa), X (thực thi chương trình) — áp dụng cho user, group, others.', 'medium'),
  q('g10_ch2', 10, 'File nén .zip có thể chứa gì?', ['Chỉ 1 file', 'Nhiều file và thư mục được nén lại', 'Chỉ ảnh', 'Chỉ nhạc'], 'Nhiều file và thư mục được nén lại', 'ZIP gom nhiều file/folder vào 1 file nén, giảm dung lượng.', 'easy'),
  q('g10_ch2', 10, 'Shortcut (lối tắt) khác file gốc ở điểm nào?', ['Giống hệt nhau', 'Shortcut chỉ là liên kết, xóa shortcut không mất file gốc', 'Shortcut lớn hơn file gốc', 'File gốc là shortcut'], 'Shortcut chỉ là liên kết, xóa shortcut không mất file gốc', 'Shortcut là "đường tắt" đến file/folder gốc, thường có mũi tên nhỏ trên icon.', 'easy'),
  q('g10_ch2', 10, 'FAT32 có hạn chế gì so với NTFS?', ['Nhanh hơn', 'Không hỗ trợ file lớn hơn 4GB', 'Bảo mật hơn', 'Không có hạn chế'], 'Không hỗ trợ file lớn hơn 4GB', 'FAT32: giới hạn file 4GB, không có phân quyền. NTFS hỗ trợ file lớn và bảo mật.', 'medium'),
  q('g10_ch2', 10, 'Lệnh nào trong Windows mở Command Prompt?', ['cmd', 'terminal', 'bash', 'shell'], 'cmd', 'Gõ "cmd" vào Start menu hoặc Run (Win+R) để mở Command Prompt.', 'easy'),
  q('g10_ch2', 10, 'Lệnh dir trong Command Prompt dùng để làm gì?', ['Xóa file', 'Liệt kê file và thư mục', 'Tạo thư mục', 'Sao chép file'], 'Liệt kê file và thư mục', 'dir liệt kê nội dung thư mục hiện tại. Tương tự lệnh ls trên Linux.', 'easy'),
  q('g10_ch2', 10, 'Lệnh mkdir dùng để làm gì?', ['Xóa thư mục', 'Tạo thư mục mới', 'Đổi tên thư mục', 'Di chuyển thư mục'], 'Tạo thư mục mới', 'mkdir TenThuMuc tạo thư mục mới. rmdir xóa thư mục rỗng.', 'easy'),
  q('g10_ch2', 10, 'Phần mở rộng .exe cho biết file thuộc loại gì?', ['Văn bản', 'Hình ảnh', 'Chương trình thực thi', 'Âm thanh'], 'Chương trình thực thi', '.exe (executable) là file chương trình có thể chạy trực tiếp trên Windows.', 'easy'),
  q('g10_ch2', 10, 'Task Manager (Ctrl + Shift + Esc) dùng để làm gì?', ['Soạn văn bản', 'Xem và quản lý tiến trình đang chạy', 'Kết nối WiFi', 'Cài phần mềm'], 'Xem và quản lý tiến trình đang chạy', 'Task Manager hiện danh sách tiến trình, mức dùng CPU/RAM, và cho phép tắt ứng dụng treo.', 'easy'),
  q('g10_ch2', 10, 'Defragment (chống phân mảnh) dùng cho loại ổ nào?', ['SSD', 'HDD (ổ cứng cơ)', 'USB', 'SD Card'], 'HDD (ổ cứng cơ)', 'Defrag sắp xếp lại dữ liệu phân mảnh trên HDD. Không nên dùng cho SSD.', 'medium'),

  // ========================================================================
  // LỚP 11 - Chương 1: Lập trình cơ bản (Python/C++)
  // ========================================================================
  q('g11_ch1', 11, 'Python và C++ khác nhau cơ bản ở điểm nào?', ['Không khác gì', 'Python thông dịch, cú pháp đơn giản; C++ biên dịch, hiệu năng cao', 'C++ dễ hơn Python', 'Python nhanh hơn C++'], 'Python thông dịch, cú pháp đơn giản; C++ biên dịch, hiệu năng cao', 'Python: dễ học, chạy chậm hơn. C++: phức tạp hơn nhưng hiệu năng cao.', 'medium'),
  q('g11_ch1', 11, 'Trong Python, kiểu dữ liệu boolean có những giá trị nào?', ['0 và 1', 'True và False', 'Yes và No', 'Đúng và Sai'], 'True và False', 'Boolean chỉ có 2 giá trị: True (đúng) và False (sai).', 'easy'),
  q('g11_ch1', 11, 'Tuple khác List ở điểm nào trong Python?', ['Tuple nhanh hơn', 'Tuple không thể thay đổi sau khi tạo (immutable)', 'List nhỏ hơn Tuple', 'Không khác gì'], 'Tuple không thể thay đổi sau khi tạo (immutable)', 'List [1,2,3]: mutable. Tuple (1,2,3): immutable — không thêm/xóa/sửa phần tử.', 'medium'),
  q('g11_ch1', 11, 'Dictionary (dict) trong Python dùng để làm gì?', ['Lưu danh sách có thứ tự', 'Lưu dữ liệu theo cặp key-value', 'Lưu số nguyên', 'Sắp xếp dữ liệu'], 'Lưu dữ liệu theo cặp key-value', 'd = {"ten": "An", "tuoi": 16} — truy cập: d["ten"] → "An".', 'medium'),
  q('g11_ch1', 11, 'Phạm vi biến (scope) là gì?', ['Kiểu dữ liệu', 'Vùng trong code mà biến có thể truy cập được', 'Tên biến', 'Giá trị biến'], 'Vùng trong code mà biến có thể truy cập được', 'Local scope: biến trong hàm. Global scope: biến ngoài hàm, toàn chương trình.', 'medium'),
  q('g11_ch1', 11, 'Try-except trong Python dùng để làm gì?', ['Lặp lại code', 'Xử lý lỗi (exception handling)', 'Khai báo biến', 'Nhập dữ liệu'], 'Xử lý lỗi (exception handling)', 'try: chạy code. except: bắt lỗi xử lý. Tránh chương trình dừng đột ngột.', 'medium'),
  q('g11_ch1', 11, 'Đệ quy (recursion) là gì?', ['Vòng lặp for', 'Hàm gọi lại chính nó', 'Khai báo biến', 'Nhập xuất file'], 'Hàm gọi lại chính nó', 'Đệ quy: hàm gọi chính nó với bài toán nhỏ hơn. Ví dụ: tính giai thừa n! = n × (n-1)!.', 'hard'),
  q('g11_ch1', 11, 'Thư viện (library/module) trong Python là gì?', ['File ảnh', 'Tập hợp hàm và code có sẵn để tái sử dụng', 'Kiểu dữ liệu', 'Trình biên dịch'], 'Tập hợp hàm và code có sẵn để tái sử dụng', 'import math rồi dùng math.sqrt(25) → 5.0. Thư viện tiết kiệm thời gian.', 'easy'),
  q('g11_ch1', 11, 'Lệnh "import random" cho phép làm gì?', ['Sắp xếp mảng', 'Tạo số ngẫu nhiên', 'Đọc file', 'Kết nối mạng'], 'Tạo số ngẫu nhiên', 'random.randint(1,6) tạo số ngẫu nhiên từ 1 đến 6 (giống tung xúc xắc).', 'easy'),
  q('g11_ch1', 11, 'Chuỗi f-string trong Python viết thế nào?', ['str(x)', 'f"Giá trị: {x}"', '"Giá trị: " + x', 'format(x)'], 'f"Giá trị: {x}"', 'f-string: f"Xin chào {ten}, bạn {tuoi} tuổi" — chèn biến trực tiếp vào chuỗi.', 'easy'),
  q('g11_ch1', 11, 'List comprehension trong Python là gì?', ['Sắp xếp list', 'Cách tạo list ngắn gọn trong 1 dòng', 'Xóa list', 'Nối 2 list'], 'Cách tạo list ngắn gọn trong 1 dòng', '[x**2 for x in range(10)] tạo list [0,1,4,9,...,81] trong 1 dòng.', 'medium'),
  q('g11_ch1', 11, 'Đọc file trong Python dùng hàm gì?', ['input()', 'open()', 'read()', 'file()'], 'open()', 'f = open("data.txt", "r") mở file đọc. with open(...) as f: tự đóng file.', 'medium'),
  q('g11_ch1', 11, 'Phương thức .append() của list dùng để làm gì?', ['Xóa phần tử cuối', 'Thêm phần tử vào cuối list', 'Sắp xếp list', 'Đảo ngược list'], 'Thêm phần tử vào cuối list', 'a = [1,2]; a.append(3) → a = [1,2,3].', 'easy'),
  q('g11_ch1', 11, 'Lambda function trong Python là gì?', ['Hàm có tên', 'Hàm ẩn danh viết trên 1 dòng', 'Vòng lặp', 'Kiểu dữ liệu'], 'Hàm ẩn danh viết trên 1 dòng', 'binh_phuong = lambda x: x**2 → binh_phuong(5) = 25. Ngắn gọn cho hàm đơn giản.', 'hard'),
  q('g11_ch1', 11, 'PEP 8 là gì?', ['Phiên bản Python', 'Quy tắc viết code Python chuẩn', 'Thư viện Python', 'Trình biên dịch'], 'Quy tắc viết code Python chuẩn', 'PEP 8 quy định: thụt lề 4 dấu cách, tên biến snake_case, dòng ≤79 ký tự.', 'medium'),

  // ========================================================================
  // LỚP 11 - Chương 2: Kiểu dữ liệu và cấu trúc lặp
  // ========================================================================
  q('g11_ch2', 11, 'Kiểu dữ liệu nguyên thủy (primitive) gồm những gì?', ['Chỉ có int', 'int, float, str, bool', 'Chỉ có str', 'List, tuple, dict'], 'int, float, str, bool', 'Primitive types: int (nguyên), float (thực), str (chuỗi), bool (đúng/sai).', 'easy'),
  q('g11_ch2', 11, 'Ép kiểu (type casting) là gì?', ['Tạo kiểu mới', 'Chuyển đổi giá trị từ kiểu này sang kiểu khác', 'Xóa kiểu dữ liệu', 'Khai báo biến'], 'Chuyển đổi giá trị từ kiểu này sang kiểu khác', 'int("5") → 5, str(10) → "10", float(3) → 3.0 — chuyển đổi kiểu.', 'easy'),
  q('g11_ch2', 11, 'Vòng lặp lồng nhau (nested loop) là gì?', ['Vòng lặp chạy 1 lần', 'Vòng lặp bên trong vòng lặp khác', 'Vòng lặp vô hạn', 'Vòng lặp ngược'], 'Vòng lặp bên trong vòng lặp khác', 'for i in range(3): for j in range(3): — lặp trong lặp, tổng 3×3 = 9 lần.', 'medium'),
  q('g11_ch2', 11, 'Mảng 2 chiều (2D array) là gì?', ['Mảng 1 hàng', 'Mảng gồm nhiều hàng và nhiều cột (bảng)', 'Chuỗi ký tự', 'Số thực'], 'Mảng gồm nhiều hàng và nhiều cột (bảng)', 'matrix = [[1,2],[3,4],[5,6]] — 3 hàng 2 cột. Truy cập: matrix[0][1] = 2.', 'medium'),
  q('g11_ch2', 11, 'Set (tập hợp) trong Python có đặc điểm gì?', ['Có thứ tự', 'Không chứa phần tử trùng lặp', 'Chỉ chứa số', 'Không thể thêm phần tử'], 'Không chứa phần tử trùng lặp', '{1,2,2,3} → {1,2,3}. Set: không trùng, không thứ tự.', 'medium'),
  q('g11_ch2', 11, 'Phương thức .sort() và sorted() khác nhau thế nào?', ['Giống nhau', '.sort() sửa list gốc, sorted() tạo list mới', '.sort() tạo list mới', 'sorted() sửa list gốc'], '.sort() sửa list gốc, sorted() tạo list mới', 'a.sort() thay đổi a. b = sorted(a) tạo list mới b, a không đổi.', 'medium'),
  q('g11_ch2', 11, 'Slicing (cắt) list a[1:4] lấy những phần tử nào?', ['Phần tử 1,2,3,4', 'Phần tử ở index 1, 2, 3', 'Phần tử ở index 0,1,2,3', 'Phần tử cuối'], 'Phần tử ở index 1, 2, 3', 'a[start:stop] lấy từ index start đến stop-1. a[1:4] → a[1], a[2], a[3].', 'medium'),
  q('g11_ch2', 11, 'Toán tử "in" trong Python dùng để làm gì?', ['Nhập dữ liệu', 'Kiểm tra phần tử có trong tập hợp/list không', 'Tính tổng', 'Gán giá trị'], 'Kiểm tra phần tử có trong tập hợp/list không', '3 in [1,2,3] → True. "a" in "abc" → True.', 'easy'),
  q('g11_ch2', 11, 'enumerate() trong Python dùng để làm gì?', ['Đếm phần tử', 'Lặp qua list kèm cả index', 'Sắp xếp', 'Lọc dữ liệu'], 'Lặp qua list kèm cả index', 'for i, val in enumerate(["a","b","c"]): → i=0,val="a"; i=1,val="b"...', 'medium'),
  q('g11_ch2', 11, 'String formatting "%d, %s, %f" thuộc style nào?', ['f-string', 'C-style (printf-style)', 'format()', 'Template'], 'C-style (printf-style)', '%d: số nguyên, %s: chuỗi, %f: số thực. "Tuổi: %d" % 16 → "Tuổi: 16".', 'medium'),
  q('g11_ch2', 11, 'Cấu trúc while True: ... break khi nào hữu ích?', ['Khi biết trước số lần lặp', 'Khi không biết trước số lần, dừng theo điều kiện bên trong', 'Khi chỉ lặp 1 lần', 'Không bao giờ hữu ích'], 'Khi không biết trước số lần, dừng theo điều kiện bên trong', 'while True: tạo vòng lặp vô hạn, dùng break để thoát khi đủ điều kiện.', 'medium'),
  q('g11_ch2', 11, 'Phương thức .split() của string dùng để làm gì?', ['Nối chuỗi', 'Tách chuỗi thành list theo dấu phân cách', 'Xóa chuỗi', 'Đảo chuỗi'], 'Tách chuỗi thành list theo dấu phân cách', '"Hello World".split() → ["Hello", "World"]. "1,2,3".split(",") → ["1","2","3"].', 'easy'),
  q('g11_ch2', 11, 'Phương thức .join() dùng để làm gì?', ['Tách chuỗi', 'Nối các phần tử list thành chuỗi', 'Xóa phần tử', 'Sắp xếp'], 'Nối các phần tử list thành chuỗi', '"-".join(["a","b","c"]) → "a-b-c". Ngược lại với .split().', 'easy'),
  q('g11_ch2', 11, 'Hàm map() trong Python dùng để làm gì?', ['Tạo bản đồ', 'Áp dụng hàm cho mỗi phần tử của iterable', 'Lọc dữ liệu', 'Sắp xếp dữ liệu'], 'Áp dụng hàm cho mỗi phần tử của iterable', 'list(map(int, ["1","2","3"])) → [1,2,3]. Áp dụng int() cho mỗi phần tử.', 'hard'),
  q('g11_ch2', 11, 'Hàm filter() trong Python dùng để làm gì?', ['Sắp xếp', 'Lọc các phần tử thỏa mãn điều kiện', 'Ánh xạ hàm', 'Đếm phần tử'], 'Lọc các phần tử thỏa mãn điều kiện', 'list(filter(lambda x: x>0, [-1,2,-3,4])) → [2,4]. Giữ lại phần tử >0.', 'hard'),

  // ========================================================================
  // LỚP 12 - Chương 1: Cơ sở dữ liệu quan hệ
  // ========================================================================
  q('g12_ch1', 12, 'Cơ sở dữ liệu (database) là gì?', ['File Word', 'Tập hợp dữ liệu có tổ chức, dễ truy xuất', 'Trang web', 'Phần mềm đồ họa'], 'Tập hợp dữ liệu có tổ chức, dễ truy xuất', 'Database là kho dữ liệu được tổ chức theo cấu trúc, cho phép lưu trữ, truy vấn hiệu quả.', 'easy'),
  q('g12_ch1', 12, 'Hệ quản trị CSDL (DBMS) là gì?', ['Ngôn ngữ lập trình', 'Phần mềm quản lý và truy xuất CSDL', 'Phần cứng', 'Trình duyệt web'], 'Phần mềm quản lý và truy xuất CSDL', 'DBMS (MySQL, PostgreSQL, SQLite...) là phần mềm tạo, quản lý, truy vấn database.', 'easy'),
  q('g12_ch1', 12, 'Trong CSDL quan hệ, bảng (table) gồm gì?', ['Chỉ hàng', 'Hàng (bản ghi) và cột (trường)', 'Chỉ cột', 'Chỉ số'], 'Hàng (bản ghi) và cột (trường)', 'Bảng = hàng (records/rows) × cột (fields/columns). Mỗi hàng là 1 bản ghi.', 'easy'),
  q('g12_ch1', 12, 'Khóa chính (Primary Key) là gì?', ['Mật khẩu', 'Trường xác định duy nhất mỗi bản ghi', 'Tên bảng', 'Giá trị lớn nhất'], 'Trường xác định duy nhất mỗi bản ghi', 'Primary Key: duy nhất, không NULL. Ví dụ: Mã học sinh, CMND.', 'easy'),
  q('g12_ch1', 12, 'Khóa ngoại (Foreign Key) dùng để làm gì?', ['Mã hóa dữ liệu', 'Liên kết giữa 2 bảng', 'Xóa bảng', 'Sắp xếp dữ liệu'], 'Liên kết giữa 2 bảng', 'Foreign Key ở bảng con tham chiếu đến Primary Key bảng cha → tạo quan hệ.', 'medium'),
  q('g12_ch1', 12, 'Quan hệ 1-N (one-to-many) nghĩa là gì?', ['1 bản ghi liên kết 1 bản ghi', '1 bản ghi bảng A liên kết nhiều bản ghi bảng B', 'Nhiều-nhiều', 'Không liên kết'], '1 bản ghi bảng A liên kết nhiều bản ghi bảng B', 'Ví dụ: 1 Lớp có nhiều Học sinh. 1 lớp → N học sinh.', 'medium'),
  q('g12_ch1', 12, 'Chuẩn hóa CSDL (normalization) nhằm mục đích gì?', ['Tăng trùng lặp dữ liệu', 'Giảm trùng lặp và đảm bảo tính nhất quán', 'Xóa dữ liệu', 'Thêm bảng mới'], 'Giảm trùng lặp và đảm bảo tính nhất quán', 'Normalization chia bảng lớn thành bảng nhỏ hơn để tránh dư thừa dữ liệu.', 'medium'),
  q('g12_ch1', 12, 'Kiểu dữ liệu VARCHAR dùng cho gì?', ['Số nguyên', 'Chuỗi ký tự có độ dài thay đổi', 'Ngày tháng', 'Số thực'], 'Chuỗi ký tự có độ dài thay đổi', 'VARCHAR(50): chuỗi tối đa 50 ký tự. INT: số nguyên. DATE: ngày.', 'easy'),
  q('g12_ch1', 12, 'Ràng buộc NOT NULL nghĩa là gì?', ['Cho phép giá trị rỗng', 'Trường bắt buộc phải có giá trị', 'Xóa giá trị', 'Giá trị mặc định'], 'Trường bắt buộc phải có giá trị', 'NOT NULL: không cho phép để trống. Ví dụ: Tên học sinh bắt buộc phải nhập.', 'easy'),
  q('g12_ch1', 12, 'Index (chỉ mục) trong CSDL dùng để làm gì?', ['Trang trí bảng', 'Tăng tốc tìm kiếm và truy vấn', 'Xóa dữ liệu nhanh', 'Sao lưu dữ liệu'], 'Tăng tốc tìm kiếm và truy vấn', 'Index tạo cấu trúc tìm kiếm nhanh. Giống mục lục sách → tìm nhanh trang.', 'medium'),
  q('g12_ch1', 12, 'ACID trong CSDL là gì?', ['Loại dữ liệu', 'Tính chất giao dịch: Atomicity, Consistency, Isolation, Durability', 'Kiểu truy vấn', 'Tên phần mềm'], 'Tính chất giao dịch: Atomicity, Consistency, Isolation, Durability', 'ACID đảm bảo giao dịch toàn vẹn: hoặc hoàn thành hết, hoặc không thực hiện gì.', 'hard'),
  q('g12_ch1', 12, 'MySQL, PostgreSQL, SQLite có điểm chung gì?', ['Đều là ngôn ngữ lập trình', 'Đều là hệ quản trị CSDL quan hệ', 'Đều là hệ điều hành', 'Đều là trình duyệt'], 'Đều là hệ quản trị CSDL quan hệ', 'Tất cả đều là RDBMS (Relational DBMS) dùng SQL để truy vấn.', 'easy'),
  q('g12_ch1', 12, 'Entity-Relationship (ER) Diagram dùng để làm gì?', ['Viết code', 'Mô hình hóa cấu trúc CSDL bằng sơ đồ', 'Diệt virus', 'Kết nối mạng'], 'Mô hình hóa cấu trúc CSDL bằng sơ đồ', 'ER Diagram vẽ các thực thể (bảng), thuộc tính (cột), và quan hệ giữa chúng.', 'medium'),
  q('g12_ch1', 12, 'Backup CSDL quan trọng vì sao?', ['Tăng dung lượng', 'Phòng ngừa mất dữ liệu do sự cố', 'Làm máy nhanh hơn', 'Không cần thiết'], 'Phòng ngừa mất dữ liệu do sự cố', 'Backup định kỳ bảo vệ CSDL khỏi: lỗi phần cứng, virus, xóa nhầm, thiên tai.', 'easy'),
  q('g12_ch1', 12, 'Ràng buộc UNIQUE nghĩa là gì?', ['Cho phép trùng', 'Giá trị trong cột phải khác nhau', 'Xóa trùng lặp', 'Sắp xếp tăng dần'], 'Giá trị trong cột phải khác nhau', 'UNIQUE: không 2 bản ghi nào có cùng giá trị. Ví dụ: email phải unique.', 'easy'),

  // ========================================================================
  // LỚP 12 - Chương 2: Ngôn ngữ truy vấn SQL
  // ========================================================================
  q('g12_ch2', 12, 'SQL viết tắt của gì?', ['Structured Query Language', 'Simple Question Language', 'System Query Logic', 'Standard Quick Language'], 'Structured Query Language', 'SQL là ngôn ngữ truy vấn có cấu trúc, dùng để tương tác với CSDL quan hệ.', 'easy'),
  q('g12_ch2', 12, 'Lệnh SELECT dùng để làm gì?', ['Xóa dữ liệu', 'Truy vấn và lấy dữ liệu từ bảng', 'Tạo bảng', 'Cập nhật dữ liệu'], 'Truy vấn và lấy dữ liệu từ bảng', 'SELECT Ten, Tuoi FROM HocSinh WHERE Lop = "12A1"; lấy tên, tuổi HS lớp 12A1.', 'easy'),
  q('g12_ch2', 12, 'Mệnh đề WHERE dùng để làm gì?', ['Sắp xếp kết quả', 'Lọc bản ghi theo điều kiện', 'Nhóm dữ liệu', 'Giới hạn số dòng'], 'Lọc bản ghi theo điều kiện', 'WHERE Diem >= 5 chỉ lấy bản ghi có điểm từ 5 trở lên.', 'easy'),
  q('g12_ch2', 12, 'Lệnh INSERT INTO dùng để làm gì?', ['Xóa bản ghi', 'Thêm bản ghi mới vào bảng', 'Cập nhật bản ghi', 'Truy vấn dữ liệu'], 'Thêm bản ghi mới vào bảng', 'INSERT INTO HocSinh (Ten, Tuoi) VALUES ("An", 16); thêm 1 học sinh mới.', 'easy'),
  q('g12_ch2', 12, 'Lệnh UPDATE dùng để làm gì?', ['Thêm dữ liệu', 'Sửa đổi dữ liệu đã có', 'Xóa dữ liệu', 'Tạo bảng mới'], 'Sửa đổi dữ liệu đã có', 'UPDATE HocSinh SET Diem = 9 WHERE MaHS = "HS001"; cập nhật điểm.', 'easy'),
  q('g12_ch2', 12, 'Lệnh DELETE FROM dùng để làm gì?', ['Thêm bản ghi', 'Xóa bản ghi khỏi bảng', 'Cập nhật bản ghi', 'Tạo bảng'], 'Xóa bản ghi khỏi bảng', 'DELETE FROM HocSinh WHERE MaHS = "HS001"; xóa học sinh có mã HS001.', 'easy'),
  q('g12_ch2', 12, 'ORDER BY dùng để làm gì?', ['Lọc dữ liệu', 'Sắp xếp kết quả truy vấn', 'Nhóm dữ liệu', 'Giới hạn kết quả'], 'Sắp xếp kết quả truy vấn', 'ORDER BY Diem DESC sắp xếp giảm dần. ASC: tăng dần (mặc định).', 'easy'),
  q('g12_ch2', 12, 'GROUP BY kết hợp hàm COUNT dùng để làm gì?', ['Xóa nhóm', 'Đếm số bản ghi theo nhóm', 'Sắp xếp', 'Thêm dữ liệu'], 'Đếm số bản ghi theo nhóm', 'SELECT Lop, COUNT(*) FROM HocSinh GROUP BY Lop; đếm số HS mỗi lớp.', 'medium'),
  q('g12_ch2', 12, 'Hàm AVG trong SQL dùng để tính gì?', ['Tổng', 'Trung bình', 'Số lượng', 'Giá trị lớn nhất'], 'Trung bình', 'SELECT AVG(Diem) FROM HocSinh; tính điểm trung bình tất cả học sinh.', 'easy'),
  q('g12_ch2', 12, 'JOIN trong SQL dùng để làm gì?', ['Xóa bảng', 'Kết hợp dữ liệu từ 2 bảng trở lên', 'Thêm cột', 'Sao lưu dữ liệu'], 'Kết hợp dữ liệu từ 2 bảng trở lên', 'INNER JOIN kết hợp bản ghi khớp cả 2 bảng. LEFT JOIN giữ tất cả bảng trái.', 'medium'),
  q('g12_ch2', 12, 'INNER JOIN trả về kết quả gì?', ['Tất cả bản ghi 2 bảng', 'Chỉ bản ghi khớp ở cả 2 bảng', 'Chỉ bản ghi bảng trái', 'Chỉ bản ghi bảng phải'], 'Chỉ bản ghi khớp ở cả 2 bảng', 'INNER JOIN chỉ trả kết quả khi có dữ liệu khớp ở cả bảng trái và phải.', 'medium'),
  q('g12_ch2', 12, 'Mệnh đề HAVING khác WHERE ở điểm nào?', ['Giống nhau', 'HAVING lọc sau GROUP BY, WHERE lọc trước', 'WHERE lọc sau GROUP BY', 'HAVING không dùng được với hàm'], 'HAVING lọc sau GROUP BY, WHERE lọc trước', 'WHERE lọc hàng trước khi nhóm. HAVING lọc nhóm sau khi GROUP BY.', 'hard'),
  q('g12_ch2', 12, 'Lệnh CREATE TABLE dùng để làm gì?', ['Xóa bảng', 'Tạo bảng mới trong CSDL', 'Sửa bảng', 'Truy vấn bảng'], 'Tạo bảng mới trong CSDL', 'CREATE TABLE HocSinh (MaHS INT PRIMARY KEY, Ten VARCHAR(50), Diem FLOAT);', 'easy'),
  q('g12_ch2', 12, 'Lệnh ALTER TABLE dùng để làm gì?', ['Xóa bảng', 'Thay đổi cấu trúc bảng (thêm/xóa/sửa cột)', 'Truy vấn dữ liệu', 'Tạo bảng mới'], 'Thay đổi cấu trúc bảng (thêm/xóa/sửa cột)', 'ALTER TABLE HocSinh ADD DiaChi VARCHAR(100); thêm cột địa chỉ.', 'medium'),
  q('g12_ch2', 12, 'LIKE "%an%" trong SQL tìm gì?', ['Chính xác từ "an"', 'Bất kỳ giá trị nào chứa "an"', 'Giá trị bắt đầu bằng "an"', 'Giá trị kết thúc bằng "an"'], 'Bất kỳ giá trị nào chứa "an"', '% đại diện cho bất kỳ chuỗi nào. "%an%" tìm: "Thanh", "Hoàng An", "Phan".', 'medium'),
];

// XP thresholds per level
export const XP_PER_LEVEL = 100;

export const ALL_BADGES: Badge[] = [
  { id: 'first_quiz', name: 'Bước đầu tiên', description: 'Hoàn thành bài quiz đầu tiên', icon: '🎯', color: 'blue' },
  { id: 'perfect_score', name: 'Hoàn hảo', description: 'Đạt 100 điểm trong một bài', icon: '💯', color: 'yellow' },
  { id: 'streak_7', name: 'Kiên trì', description: 'Học liên tục 7 ngày', icon: '🔥', color: 'orange' },
  { id: 'streak_30', name: 'Bền bỉ', description: 'Học liên tục 30 ngày', icon: '💪', color: 'red' },
  { id: 'questions_50', name: 'Chăm chỉ', description: 'Trả lời 50 câu hỏi', icon: '📚', color: 'green' },
  { id: 'questions_200', name: 'Siêu học sinh', description: 'Trả lời 200 câu hỏi', icon: '🏆', color: 'purple' },
  { id: 'ai_master', name: 'Bạn của AI', description: 'Hỏi AI Tutor 20 lần', icon: '🤖', color: 'cyan' },
  { id: 'speed_demon', name: 'Tốc độ', description: 'Hoàn thành Speed Quiz dưới 30 giây', icon: '⚡', color: 'amber' },
  { id: 'all_subjects', name: 'Đa tài', description: 'Làm bài ở tất cả các chương', icon: '🌟', color: 'indigo' },
  { id: 'exam_pass', name: 'Đỗ kỳ thi', description: 'Đạt ≥80 điểm trong chế độ Thi thử', icon: '🎓', color: 'emerald' },
];

export const ALL_ACHIEVEMENTS: Achievement[] = [
  { id: 'ach_answer_10', name: 'Trả lời 10 câu', description: 'Trả lời tổng cộng 10 câu hỏi', icon: '📝', target: 10, current: 0, completed: false },
  { id: 'ach_answer_50', name: 'Trả lời 50 câu', description: 'Trả lời tổng cộng 50 câu hỏi', icon: '📋', target: 50, current: 0, completed: false },
  { id: 'ach_answer_200', name: 'Trả lời 200 câu', description: 'Trả lời tổng cộng 200 câu hỏi', icon: '📚', target: 200, current: 0, completed: false },
  { id: 'ach_correct_10', name: '10 câu đúng', description: 'Trả lời đúng 10 câu', icon: '✅', target: 10, current: 0, completed: false },
  { id: 'ach_correct_100', name: '100 câu đúng', description: 'Trả lời đúng 100 câu', icon: '🎯', target: 100, current: 0, completed: false },
  { id: 'ach_streak_3', name: 'Streak 3 ngày', description: 'Học liên tục 3 ngày', icon: '🔥', target: 3, current: 0, completed: false },
  { id: 'ach_streak_7', name: 'Streak 7 ngày', description: 'Học liên tục 7 ngày', icon: '💪', target: 7, current: 0, completed: false },
  { id: 'ach_level_5', name: 'Đạt Level 5', description: 'Nâng cấp lên Level 5', icon: '⭐', target: 5, current: 0, completed: false },
  { id: 'ach_level_10', name: 'Đạt Level 10', description: 'Nâng cấp lên Level 10', icon: '🌟', target: 10, current: 0, completed: false },
];

// Re-map existing demo questions to the new textbook chapters for grades 3-12
DEMO_QUESTIONS.forEach(q => {
  if (q.grade >= 3) {
    const chapters = TEXTBOOK_CHAPTERS.filter(ch => ch.grade === q.grade);
    if (chapters.length > 0) {
      // Basic deterministic assignment to distribute questions across chapters
      const hash = q.id.charCodeAt(q.id.length - 1);
      q.subjectId = chapters[hash % chapters.length].id;
    }
  }
});
