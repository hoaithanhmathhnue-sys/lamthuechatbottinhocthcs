import { Subject, Question, GradeLevel } from '../types';

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

// ===== SUBJECTS: Chương ôn tập Tin học theo từng lớp =====
export const DEMO_SUBJECTS: Subject[] = [
  // --- LỚP 6 ---
  { id: 'g6_ch1', name: 'Máy tính và cộng đồng', icon: 'Laptop', questionsCount: 15, color: 'blue', grade: 6 },
  { id: 'g6_ch2', name: 'Mạng máy tính và Internet', icon: 'Laptop', questionsCount: 15, color: 'sky', grade: 6 },

  // --- LỚP 7 ---
  { id: 'g7_ch1', name: 'Xử lý thông tin số', icon: 'Laptop', questionsCount: 15, color: 'blue', grade: 7 },
  { id: 'g7_ch2', name: 'Phần mềm bảng tính', icon: 'Laptop', questionsCount: 15, color: 'sky', grade: 7 },

  // --- LỚP 8 ---
  { id: 'g8_ch1', name: 'Lập trình đơn giản', icon: 'Code2', questionsCount: 15, color: 'blue', grade: 8 },
  { id: 'g8_ch2', name: 'Thuật toán và chương trình', icon: 'Code2', questionsCount: 15, color: 'sky', grade: 8 },

  // --- LỚP 9 ---
  { id: 'g9_ch1', name: 'Thiết kế website cơ bản', icon: 'Code2', questionsCount: 15, color: 'blue', grade: 9 },
  { id: 'g9_ch2', name: 'An toàn thông tin', icon: 'Laptop', questionsCount: 15, color: 'sky', grade: 9 },
];

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
];

export const XP_PER_LEVEL = 100;
