import { TextbookChapter, GradeLevel } from '../types';

const L = (id: string, title: string, grade: GradeLevel, ci: number, li: number, content: string, keys: string[], icon?: string) => ({
  id, title, content, keyConcepts: keys, grade, chapterIndex: ci, lessonIndex: li, icon: icon || '📖',
});

export const TEXTBOOK_CHAPTERS: TextbookChapter[] = [
// ==================== LỚP 3 ====================
{
  id:'g3_A', title:'Chủ đề A: Máy tính và em', description:'Thông tin, xử lý thông tin, máy tính và bàn phím', icon:'💻', grade:3,
  lessons:[
    L('g3_A_1','Bài 1: Thông tin và quyết định',3,0,0,
`## Thông tin và quyết định
### Thông tin là gì?
**Thông tin** là những gì giúp ta hiểu biết về thế giới xung quanh: hình ảnh, âm thanh, chữ viết, số liệu...
### Thông tin giúp ra quyết định
- Nhìn đèn giao thông → quyết định đi hay dừng
- Nghe dự báo thời tiết → quyết định mang ô hay không
- Xem bảng điểm → biết môn nào cần cố gắng
> 💡 **Ghi nhớ**: Thông tin giúp ta đưa ra quyết định đúng đắn.`,['Thông tin','Quyết định'],'💡'),
    L('g3_A_2','Bài 2: Xử lí thông tin',3,0,1,
`## Xử lí thông tin
### Quy trình xử lí thông tin
\`\`\`
Thu thập → Xử lí → Đưa ra kết quả
(Input)    (Process)   (Output)
\`\`\`
**Ví dụ**: Đọc đề toán (thu thập) → Tính toán (xử lí) → Viết đáp án (kết quả)
### Con người và máy tính xử lí thông tin
| | Con người | Máy tính |
|---|---|---|
| Thu thập | Mắt, tai, mũi... | Bàn phím, chuột, micro |
| Xử lí | Bộ não | CPU |
| Kết quả | Nói, viết | Màn hình, loa, máy in |`,['Xử lí thông tin','Input','Process','Output'],'⚙️'),
    L('g3_A_3','Bài 3: Máy tính và em',3,0,2,
`## Máy tính và em
### Các bộ phận chính của máy tính
- **Thân máy**: Chứa CPU (bộ não), RAM, ổ cứng
- **Màn hình**: Hiển thị hình ảnh, văn bản
- **Bàn phím**: Gõ chữ, nhập thông tin
- **Chuột**: Di chuyển con trỏ, chọn đối tượng
- **Loa**: Phát âm thanh
### Phân loại máy tính
| Loại | Đặc điểm |
|------|----------|
| Máy tính để bàn | Cố định, màn hình rời |
| Laptop | Nhỏ gọn, mang đi được |
| Máy tính bảng | Màn hình cảm ứng |
| Điện thoại thông minh | Nhỏ nhất, đa năng |`,['Máy tính','CPU','Màn hình','Bàn phím','Chuột'],'🖥️'),
    L('g3_A_4','Bài 4: Làm việc với máy tính',3,0,3,
`## Làm việc với máy tính
### Bật và tắt máy tính
- **Bật**: Nhấn nút **Power** ⏻
- **Tắt đúng cách**: Start → Shut down
- ⚠️ Không rút điện đột ngột!
### Tư thế ngồi đúng
- Ngồi thẳng lưng, mắt cách màn hình 50-70 cm
- Nghỉ mắt mỗi 30-45 phút
- Hai tay đặt thoải mái trên bàn phím
### Màn hình Desktop
- **Icon**: Biểu tượng chương trình
- **Taskbar**: Thanh tác vụ phía dưới
- **Nút Start**: Mở menu chương trình`,['Bật/tắt máy','Tư thế ngồi','Desktop','Taskbar'],'🪑'),
    L('g3_A_5','Bài 5: Sử dụng bàn phím',3,0,4,
`## Sử dụng bàn phím
### Các vùng phím
- **Hàng cơ sở**: A S D F – J K L ; (đặt ngón mặc định)
- **Hàng trên**: Q W E R T – Y U I O P
- **Hàng dưới**: Z X C V B – N M
### Phím đặc biệt
| Phím | Công dụng |
|------|-----------|
| Enter | Xuống dòng / xác nhận |
| Space | Tạo khoảng trắng |
| Backspace | Xóa ký tự bên trái |
| Shift | Gõ chữ HOA (giữ + gõ) |
| Caps Lock | Bật/tắt viết hoa |
| Esc | Hủy lệnh |
### Đặt ngón tay
- Ngón trỏ trái → phím **F** (có gờ nổi)
- Ngón trỏ phải → phím **J** (có gờ nổi)`,['Bàn phím','Enter','Backspace','Shift','Caps Lock'],'⌨️'),
  ],
},
{
  id:'g3_B', title:'Chủ đề B: Mạng máy tính và Internet', description:'Khám phá thông tin trên Internet', icon:'🌐', grade:3,
  lessons:[
    L('g3_B_1','Bài 6: Khám phá thông tin trên Internet',3,1,0,
`## Khám phá Internet
### Internet là gì?
**Internet** là mạng kết nối hàng tỷ máy tính trên toàn thế giới.
### Trình duyệt web
Phần mềm để xem trang web: Chrome, Edge, Firefox
### Tìm kiếm thông tin
1. Mở trình duyệt → vào **google.com**
2. Gõ **từ khóa** vào ô tìm kiếm
3. Nhấn Enter → xem kết quả
### An toàn khi dùng Internet
- ✅ Hỏi ý kiến người lớn
- ✅ Chỉ truy cập trang web phù hợp lứa tuổi
- ❌ Không chia sẻ thông tin cá nhân`,['Internet','Trình duyệt','Tìm kiếm','An toàn'],'🌐'),
  ],
},
{
  id:'g3_C', title:'Chủ đề C: Tổ chức lưu trữ thông tin', description:'Sắp xếp, sơ đồ cây, tệp và thư mục', icon:'📁', grade:3,
  lessons:[
    L('g3_C_1','Bài 7: Sắp xếp để dễ tìm',3,2,0,
`## Sắp xếp thông tin
### Tại sao cần sắp xếp?
Sắp xếp giúp **tìm kiếm nhanh** và **quản lý gọn gàng**.
### Cách sắp xếp
- Theo **tên** (A-Z): Sách xếp theo bảng chữ cái
- Theo **loại**: Nhóm sách theo môn học
- Theo **thời gian**: Sắp xếp theo ngày tháng
> 💡 Trên máy tính, ta sắp xếp tệp tin vào các **thư mục** (folder).`,['Sắp xếp','Tìm kiếm','Thư mục'],'📂'),
    L('g3_C_2','Bài 8: Sơ đồ hình cây',3,2,1,
`## Sơ đồ hình cây
### Sơ đồ hình cây là gì?
Cách tổ chức thông tin dạng **phân cấp**: gốc → nhánh → lá
### Ví dụ: Cây thư mục
\`\`\`
📁 Máy tính (C:)
├── 📁 Bài học
│   ├── 📄 Toán.docx
│   └── 📄 Văn.docx
├── 📁 Hình ảnh
│   ├── 🖼️ Ảnh1.jpg
│   └── 🖼️ Ảnh2.jpg
└── 📁 Nhạc
\`\`\`
### Trên máy tính
- **Thư mục gốc**: Ổ đĩa C:, D:
- **Thư mục con**: Nằm bên trong thư mục khác
- **Tệp tin**: File nằm trong thư mục`,['Sơ đồ cây','Thư mục','Tệp tin','Phân cấp'],'🌳'),
    L('g3_C_3','Bài 9: Thực hành tệp và thư mục',3,2,2,
`## Thực hành với tệp và thư mục
### Tạo thư mục mới
Click phải → New → Folder → Đặt tên
### Các thao tác cơ bản
| Thao tác | Cách làm |
|----------|----------|
| **Tạo mới** | Click phải → New → Folder |
| **Đổi tên** | Click phải → Rename |
| **Sao chép** | Ctrl + C → Ctrl + V |
| **Di chuyển** | Ctrl + X → Ctrl + V |
| **Xóa** | Nhấn Delete |
### Quy tắc đặt tên
- Đặt tên **có ý nghĩa** (vd: "Bai_tap_Toan")
- Không dùng ký tự đặc biệt: \\ / : * ? " < > |`,['Tạo thư mục','Sao chép','Di chuyển','Đổi tên'],'📁'),
  ],
},
{
  id:'g3_D', title:'Chủ đề D: Đạo đức và văn hóa số', description:'Bảo vệ thông tin khi dùng máy tính', icon:'🛡️', grade:3,
  lessons:[
    L('g3_D_1','Bài 10: Bảo vệ thông tin khi dùng máy tính',3,3,0,
`## Bảo vệ thông tin
### Vì sao cần bảo vệ?
Thông tin cá nhân (tên, địa chỉ, ảnh) cần được bảo vệ khỏi người xấu.
### Cách bảo vệ
- 🔒 Đặt **mật khẩu** cho máy tính
- 🚫 **Không chia sẻ** mật khẩu với người lạ
- ✅ **Lưu bài** thường xuyên (Ctrl + S)
- 💾 **Sao lưu** dữ liệu quan trọng vào USB/đám mây`,['Bảo vệ thông tin','Mật khẩu','Sao lưu'],'🛡️'),
  ],
},
{
  id:'g3_E', title:'Chủ đề E: Ứng dụng tin học', description:'Tạo bài trình chiếu', icon:'📊', grade:3,
  lessons:[
    L('g3_E_1','Bài 11: Bài trình chiếu của em',3,4,0,
`## Bài trình chiếu
### PowerPoint là gì?
Phần mềm tạo bài trình chiếu (slideshow) để thuyết trình.
### Thao tác cơ bản
- **Thêm slide**: Ctrl + M
- **Trình chiếu**: F5
- **Kết thúc**: Esc
### Thiết kế slide
- Mỗi slide chỉ **ít chữ**, có **hình ảnh** minh họa
- Dùng **font lớn** (≥ 24), dễ đọc
- **Transition**: Hiệu ứng chuyển slide
- **Animation**: Hiệu ứng cho đối tượng trên slide`,['PowerPoint','Slide','Transition','Animation'],'📊'),
  ],
},

// ==================== LỚP 4 ====================
{
  id:'g4_A', title:'Chủ đề A: Máy tính và em', description:'Phần cứng, phần mềm và gõ bàn phím', icon:'💻', grade:4,
  lessons:[
    L('g4_A_1','Bài 1: Phần cứng và phần mềm',4,0,0,
`## Phần cứng và phần mềm
### Phần cứng (Hardware)
Các bộ phận **sờ được**: CPU, RAM, ổ cứng, màn hình, bàn phím, chuột, loa, máy in
### Phần mềm (Software)
Chương trình **không sờ được**, chạy trên máy tính:
| Loại | Ví dụ |
|------|-------|
| Hệ điều hành | Windows, macOS |
| Ứng dụng văn phòng | Word, Excel, PowerPoint |
| Trình duyệt | Chrome, Edge |
| Giải trí | Nhạc, game |
> 💡 Phần cứng là "cơ thể", phần mềm là "linh hồn" của máy tính.`,['Phần cứng','Phần mềm','Hệ điều hành'],'🔧'),
    L('g4_A_2','Bài 2: Gõ bàn phím đúng cách',4,0,1,
`## Gõ bàn phím đúng cách
### 10 ngón tay
Mỗi ngón phụ trách một vùng phím nhất định – giúp gõ nhanh, chính xác.
### Quy tắc gõ
- Đặt ngón tay lên hàng cơ sở (A S D F – J K L ;)
- Nhìn màn hình, **không nhìn bàn phím**
- Gõ đều tay, không dùng 1-2 ngón
### Phím tắt phổ biến
| Phím tắt | Chức năng |
|----------|-----------|
| Ctrl+S | Lưu |
| Ctrl+Z | Hoàn tác |
| Ctrl+C / Ctrl+V | Sao chép / Dán |`,['Gõ 10 ngón','Hàng cơ sở','Phím tắt'],'⌨️'),
  ],
},
{
  id:'g4_B', title:'Chủ đề B: Mạng máy tính và Internet', description:'Thông tin trên trang web', icon:'🌐', grade:4,
  lessons:[
    L('g4_B_1','Bài 3: Thông tin trên trang web',4,1,0,
`## Trang web và thông tin
### Trang web là gì?
Trang web chứa **văn bản, hình ảnh, video, liên kết** trên Internet.
### Cách truy cập
1. Mở trình duyệt (Chrome, Edge...)
2. Gõ **địa chỉ web** (URL) hoặc **tìm kiếm** trên Google
### Nhận biết thông tin đáng tin cậy
- ✅ Trang web chính thống (.gov, .edu)
- ✅ Tác giả rõ ràng, có nguồn trích dẫn
- ❌ Trang có nhiều quảng cáo, tiêu đề giật gân`,['Trang web','URL','Thông tin đáng tin cậy'],'🌍'),
  ],
},
{
  id:'g4_C', title:'Chủ đề C: Tổ chức lưu trữ và tìm kiếm', description:'Tìm kiếm Internet, thao tác tệp và thư mục', icon:'🔍', grade:4,
  lessons:[
    L('g4_C_1','Bài 4: Tìm kiếm thông tin trên Internet',4,2,0,
`## Tìm kiếm trên Internet
### Công cụ tìm kiếm
Google, Bing, Yahoo – giúp tìm thông tin nhanh chóng.
### Mẹo tìm kiếm hiệu quả
- Dùng **từ khóa ngắn gọn**, cụ thể
- Dùng **dấu ngoặc kép** "" để tìm chính xác cụm từ
- Thêm loại file: "bài tập toán **filetype:pdf**"
### Đánh giá kết quả
Không phải kết quả nào cũng đúng – cần **kiểm tra từ nhiều nguồn**.`,['Tìm kiếm','Từ khóa','Google'],'🔍'),
    L('g4_C_2','Bài 5: Thao tác với tệp và thư mục',4,2,1,
`## Quản lý tệp và thư mục
### Tệp tin (File)
Đơn vị lưu trữ: văn bản (.docx), ảnh (.jpg), nhạc (.mp3)
### Thư mục (Folder)
"Ngăn tủ" chứa các tệp và thư mục con.
### Thao tác nâng cao
- **Sao chép**: Ctrl+C → Ctrl+V (tạo bản sao)
- **Di chuyển**: Ctrl+X → Ctrl+V (chuyển vị trí)
- **Xóa**: Delete → vào Thùng rác
- **Khôi phục**: Mở Recycle Bin → Restore`,['Tệp tin','Thư mục','Sao chép','Di chuyển'],'📁'),
  ],
},
{
  id:'g4_D', title:'Chủ đề D: Đạo đức, pháp luật số', description:'Sử dụng phần mềm đúng cách', icon:'⚖️', grade:4,
  lessons:[
    L('g4_D_1','Bài 6: Sử dụng phần mềm khi được phép',4,3,0,
`## Bản quyền phần mềm
### Phần mềm có bản quyền
Phần mềm do người khác tạo ra, ta cần **được phép** mới sử dụng.
### Phân loại
- **Phần mềm thương mại**: Phải mua (Microsoft Office)
- **Phần mềm miễn phí**: Dùng free (VLC, 7-Zip)
- **Phần mềm mã nguồn mở**: Miễn phí + được xem/sửa code (LibreOffice)
### Quy tắc
- ✅ Dùng phần mềm **có bản quyền** hoặc miễn phí
- ❌ Không dùng phần mềm lậu (crack) — vi phạm pháp luật`,['Bản quyền','Phần mềm miễn phí','Mã nguồn mở'],'⚖️'),
  ],
},
{
  id:'g4_E', title:'Chủ đề E: Ứng dụng tin học', description:'Trình chiếu, soạn thảo văn bản', icon:'📝', grade:4,
  lessons:[
    L('g4_E_1','Bài 7: Tạo bài trình chiếu',4,4,0,
`## Tạo bài trình chiếu nâng cao
### Các bước tạo bài trình chiếu
1. Mở PowerPoint → chọn **mẫu** (template)
2. Thêm tiêu đề, nội dung
3. Chèn hình ảnh: **Insert → Pictures**
4. Thêm slide mới: **Ctrl + M**
5. Trình chiếu: **F5**`,['PowerPoint','Template','Chèn ảnh'],'📊'),
    L('g4_E_2','Bài 8: Định dạng văn bản trên trang chiếu',4,4,1,
`## Định dạng trên slide
### Font chữ và cỡ chữ
- **Tiêu đề**: Font lớn (32-44), in đậm
- **Nội dung**: Font vừa (24-28)
### Màu sắc
- Chọn màu **tương phản** với nền (nền tối → chữ sáng)
- Không dùng quá **3 màu** trên 1 slide
### Căn lề
- Tiêu đề: **căn giữa**
- Nội dung: **căn trái** hoặc **căn đều**`,['Font chữ','Màu sắc','Căn lề'],'🎨'),
    L('g4_E_3','Bài 9: Hiệu ứng chuyển trang',4,4,2,
`## Hiệu ứng trong PowerPoint
### Transition (chuyển trang)
Hiệu ứng khi chuyển từ slide này sang slide khác.
- Tab **Transitions** → chọn hiệu ứng
- Có thể đặt **thời gian tự động** chuyển
### Animation (hoạt hình)
Hiệu ứng cho từng đối tượng trên slide:
- **Entrance**: Xuất hiện (Fade In, Fly In)
- **Exit**: Biến mất
- **Emphasis**: Nhấn mạnh (phóng to, đổi màu)
> ⚠️ Không dùng quá nhiều hiệu ứng – sẽ gây rối!`,['Transition','Animation','Entrance','Exit'],'✨'),
    L('g4_E_4','Bài 10-11: Phần mềm soạn thảo văn bản',4,4,3,
`## Microsoft Word
### Giao diện Word
- **Ribbon**: Thanh công cụ phía trên
- **Tab Home**: Font, cỡ chữ, màu, căn lề
- **Tab Insert**: Chèn ảnh, bảng, biểu đồ
### Soạn thảo cơ bản
| Phím tắt | Chức năng |
|----------|-----------|
| Ctrl+B | **In đậm** |
| Ctrl+I | *In nghiêng* |
| Ctrl+U | Gạch chân |
| Ctrl+S | Lưu file |
| Ctrl+Z | Hoàn tác |
| Ctrl+A | Chọn tất cả |
### Chỉnh sửa văn bản
- **Find & Replace** (Ctrl+H): Tìm và thay thế từ
- **Spell Check**: Kiểm tra chính tả`,['Word','Ribbon','Phím tắt','Find & Replace'],'📝'),
  ],
},
{
  id:'g4_F', title:'Chủ đề F: Giải quyết vấn đề với máy tính', description:'Lập trình trực quan cơ bản', icon:'🧩', grade:4,
  lessons:[
    L('g4_F_1','Bài 13-14: Lập trình trực quan',4,5,0,
`## Lập trình trực quan
### Lập trình là gì?
Viết **hướng dẫn** (chương trình) để máy tính thực hiện công việc.
### Lập trình trực quan
Dùng các **khối lệnh kéo thả** thay vì gõ code — dễ học, trực quan.
### Môi trường Scratch
- **Sprite**: Nhân vật trên sân khấu
- **Stage**: Sân khấu hiển thị
- **Khối lệnh**: Kéo thả để tạo chương trình
### Ví dụ đơn giản
Kéo khối "when 🏴 clicked" → "move 10 steps" → nhấn cờ xanh!`,['Lập trình','Scratch','Khối lệnh','Sprite'],'🧩'),
    L('g4_F_2','Bài 15-16: Tạo chương trình máy tính',4,5,1,
`## Tạo chương trình
### Thuật toán
**Thuật toán** = dãy các bước để giải quyết vấn đề.
### Ví dụ: Vẽ hình vuông trong Scratch
\`\`\`
when 🏴 clicked
repeat (4)
    move (100) steps
    turn ↻ (90) degrees
\`\`\`
### Các khái niệm cơ bản
- **Tuần tự**: Thực hiện lần lượt từng lệnh
- **Lặp**: Thực hiện nhiều lần (repeat)
- **Điều kiện**: Kiểm tra rồi quyết định (if...then)`,['Thuật toán','Tuần tự','Lặp','Điều kiện'],'💡'),
  ],
},

// ==================== LỚP 5 ====================
{
  id:'g5_A', title:'Chủ đề A: Máy tính và em', description:'Ôn tập kiến thức về máy tính', icon:'💻', grade:5,
  lessons:[
    L('g5_A_1','Bài 1: Ôn tập máy tính',5,0,0,
`## Ôn tập kiến thức máy tính
### Thành phần máy tính
- **Phần cứng**: CPU, RAM, ổ cứng, thiết bị nhập/xuất
- **Phần mềm**: Hệ điều hành + phần mềm ứng dụng
- **Dữ liệu**: Thông tin được lưu trữ
### Quy trình xử lí
Input (nhập) → Processing (xử lí) → Output (xuất)
### Đơn vị lưu trữ
Byte < KB < MB < GB < TB`,['Phần cứng','Phần mềm','Đơn vị lưu trữ'],'💻'),
  ],
},
{
  id:'g5_B', title:'Chủ đề B: Mạng máy tính và Internet', description:'Email và dịch vụ Internet', icon:'📧', grade:5,
  lessons:[
    L('g5_B_1','Bài: Internet và Email',5,1,0,
`## Internet và Email
### Email (Thư điện tử)
- Địa chỉ: **tên@nhacungcap.com** (vd: hocsinh@gmail.com)
- Các phần: To (người nhận), Subject (chủ đề), Body (nội dung), Attachment (đính kèm)
### Gửi email lịch sự
- Viết chủ đề rõ ràng
- Lời chào đầu, cảm ơn cuối
- Kiểm tra trước khi gửi
### An toàn email
- ❌ Không mở email lạ có link/file đính kèm
- ✅ Dùng mật khẩu mạnh`,['Email','Attachment','An toàn email'],'📧'),
  ],
},
{
  id:'g5_C', title:'Chủ đề C: Tổ chức lưu trữ và trao đổi', description:'Quản lý thông tin nâng cao', icon:'📂', grade:5,
  lessons:[
    L('g5_C_1','Bài: Tổ chức thông tin',5,2,0,
`## Tổ chức và trao đổi thông tin
### Quản lý tệp hiệu quả
- Đặt tên file có ý nghĩa
- Tổ chức thư mục theo chủ đề/môn học
- Sao lưu dữ liệu quan trọng
### Chia sẻ thông tin
- Qua **email** (đính kèm file)
- Qua **USB** (sao chép trực tiếp)
- Qua **đám mây** (Google Drive, OneDrive)`,['Quản lý tệp','Chia sẻ','Đám mây'],'📂'),
  ],
},
{
  id:'g5_D', title:'Chủ đề D: Đạo đức số', description:'An toàn và văn hóa số', icon:'🛡️', grade:5,
  lessons:[
    L('g5_D_1','Bài: An toàn trên môi trường số',5,3,0,
`## An toàn môi trường số
### Bảo vệ thông tin cá nhân
- ❌ Không chia sẻ: địa chỉ nhà, SĐT, ảnh riêng tư
- ✅ Dùng mật khẩu mạnh (≥8 ký tự, chữ+số+ký hiệu)
### Nhận biết lừa đảo
- Email/tin nhắn từ người lạ yêu cầu thông tin
- Trang web giả mạo ngân hàng, trường học
- Quà tặng miễn phí quá hấp dẫn
### Ứng xử văn minh
- Tôn trọng người khác trên mạng
- Không bắt nạt, xúc phạm (cyberbullying)
- Không chia sẻ tin giả (fake news)`,['Thông tin cá nhân','Lừa đảo','Cyberbullying'],'🛡️'),
  ],
},
{
  id:'g5_E', title:'Chủ đề E: Ứng dụng tin học', description:'Soạn thảo và trình chiếu nâng cao', icon:'📝', grade:5,
  lessons:[
    L('g5_E_1','Bài: Ứng dụng soạn thảo và trình chiếu',5,4,0,
`## Ứng dụng tin học
### Word nâng cao
- Chèn **bảng biểu**: Insert → Table
- Chèn **hình ảnh**: Insert → Pictures
- **Header/Footer**: Đầu trang, cuối trang
- **Đánh số trang**: Insert → Page Number
### PowerPoint nâng cao
- Chèn **video**: Insert → Video
- Chèn **biểu đồ**: Insert → Chart
- **Speaker Notes**: Ghi chú cho người trình bày`,['Chèn bảng','Chèn ảnh','Header/Footer','Speaker Notes'],'📝'),
  ],
},
{
  id:'g5_F', title:'Chủ đề F: Lập trình Scratch', description:'Lập trình kéo thả nâng cao', icon:'🐱', grade:5,
  lessons:[
    L('g5_F_1','Bài: Lập trình Scratch nâng cao',5,5,0,
`## Scratch nâng cao
### Vòng lặp
- **repeat (n)**: Lặp n lần
- **forever**: Lặp mãi mãi
### Điều kiện
- **if...then**: Nếu đúng → thực hiện
- **if...then...else**: Đúng → A, Sai → B
### Biến (Variable)
Lưu giá trị thay đổi được: điểm, tốc độ, tên...
### Sự kiện và thông điệp
- **broadcast**: Gửi thông điệp
- **when I receive**: Nhận và phản hồi
### Ví dụ: Game bắt trứng
Kết hợp: biến (điểm), lặp (trứng rơi), điều kiện (bắt được?)`,['Vòng lặp','Điều kiện','Biến','Broadcast'],'🐱'),
  ],
},

// ==================== LỚP 6 ====================
{
  id:'g6_A', title:'Chủ đề A: Máy tính và cộng đồng', description:'Thông tin, dữ liệu và xử lí thông tin', icon:'📊', grade:6,
  lessons:[
    L('g6_A_1','Bài 1: Thông tin và dữ liệu',6,0,0,
`## Thông tin và dữ liệu
### Phân biệt
- **Dữ liệu**: "Nguyên liệu thô" chưa xử lí (số, chữ, ảnh)
- **Thông tin**: Dữ liệu đã được xử lí, có ý nghĩa
### Các dạng thông tin
| Dạng | Ví dụ |
|------|-------|
| Văn bản | Sách, báo, email |
| Hình ảnh | Ảnh, biểu đồ |
| Âm thanh | Nhạc, giọng nói |
| Video | Phim, clip |
| Số liệu | Bảng điểm, thống kê |`,['Dữ liệu','Thông tin','Dạng thông tin'],'📊'),
    L('g6_A_2','Bài 2: Xử lí thông tin',6,0,1,
`## Xử lí thông tin
### Quy trình
Thu thập → Lưu trữ → Xử lí → Truyền đạt
### Ví dụ trong đời sống
1. Thu thập điểm các bài kiểm tra
2. Lưu vào bảng điểm
3. Tính điểm trung bình
4. Thông báo kết quả cho học sinh`,['Xử lí thông tin','Quy trình'],'⚙️'),
    L('g6_A_3','Bài 3: Thông tin trong máy tính',6,0,2,
`## Thông tin trong máy tính
### Hệ nhị phân
Máy tính dùng **hệ nhị phân** (binary): chỉ có 0 và 1.
- 1 **bit** = 0 hoặc 1
- 1 **Byte** = 8 bit
### Đơn vị đo
| Đơn vị | Bằng |
|--------|------|
| 1 KB | 1024 Byte |
| 1 MB | 1024 KB |
| 1 GB | 1024 MB |
| 1 TB | 1024 GB |
### Mã hóa ký tự
- **ASCII**: 128 ký tự cơ bản
- **Unicode**: Hỗ trợ mọi ngôn ngữ`,['Hệ nhị phân','Bit','Byte','ASCII','Unicode'],'🔢'),
  ],
},
{
  id:'g6_B', title:'Chủ đề B: Mạng máy tính và Internet', description:'Mạng LAN, Internet, WWW', icon:'🌐', grade:6,
  lessons:[
    L('g6_B_1','Bài 4: Mạng máy tính',6,1,0,
`## Mạng máy tính
### Phân loại
| Loại | Phạm vi |
|------|---------|
| **LAN** | Phòng, trường học |
| **WAN** | Thành phố, quốc gia |
| **Internet** | Toàn cầu |
### Thiết bị mạng
- **Modem**: Chuyển đổi tín hiệu
- **Router**: Phân phối kết nối
- **Switch**: Kết nối máy tính trong LAN`,['LAN','WAN','Router','Modem'],'🔗'),
    L('g6_B_2','Bài 5: Internet',6,1,1,
`## Internet
### Internet là gì?
Mạng kết nối hàng tỷ thiết bị toàn cầu.
### Các dịch vụ Internet
- **WWW**: Trang web (World Wide Web)
- **Email**: Thư điện tử
- **Cloud**: Lưu trữ đám mây
- **VoIP**: Gọi điện qua Internet
### Địa chỉ IP và URL
- **IP**: Định danh thiết bị (192.168.1.1)
- **URL**: Địa chỉ trang web (https://google.com)
- **HTTPS**: Kết nối có mã hóa bảo mật`,['Internet','WWW','IP','HTTPS'],'🌐'),
  ],
},
{
  id:'g6_C', title:'Chủ đề C: Tổ chức, tìm kiếm và trao đổi', description:'WWW, tìm kiếm, thư điện tử', icon:'🔍', grade:6,
  lessons:[
    L('g6_C_1','Bài 6: Mạng thông tin toàn cầu',6,2,0,
`## World Wide Web
### WWW là gì?
Hệ thống các trang web liên kết với nhau qua **hyperlink**.
### Cấu trúc trang web
- **Website**: Tập hợp nhiều trang web
- **Web page**: Một trang đơn lẻ
- **Hyperlink**: Liên kết đến trang khác`,['WWW','Website','Hyperlink'],'🌍'),
    L('g6_C_2','Bài 7-8: Tìm kiếm và Thư điện tử',6,2,1,
`## Tìm kiếm và Email
### Tìm kiếm hiệu quả
- Dùng từ khóa cụ thể
- Dấu ngoặc kép "" cho cụm từ chính xác
- Lọc theo thời gian, loại file
### Thư điện tử (Email)
- **To**: Người nhận, **CC**: Bản sao, **BCC**: Bản sao ẩn
- **Subject**: Chủ đề ngắn gọn, rõ ràng
- **Attachment**: File đính kèm (≤ 25MB)`,['Tìm kiếm','Email','CC','BCC'],'📧'),
  ],
},
{
  id:'g6_D', title:'Chủ đề D: Đạo đức và pháp luật số', description:'An toàn thông tin trên Internet', icon:'🔒', grade:6,
  lessons:[
    L('g6_D_1','Bài 9: An toàn thông tin trên Internet',6,3,0,
`## An toàn trên Internet
### Các mối đe dọa
- **Virus**: Chương trình phá hoại
- **Phishing**: Lừa đảo qua email/web giả
- **Cyberbullying**: Bắt nạt trên mạng
### Biện pháp bảo vệ
- Mật khẩu mạnh (≥8 ký tự, chữ+số+ký hiệu)
- Không click link lạ
- Cài phần mềm diệt virus
- Báo người lớn khi gặp nội dung xấu`,['Virus','Phishing','Cyberbullying','Mật khẩu'],'🔒'),
  ],
},
{
  id:'g6_E', title:'Chủ đề E: Ứng dụng tin học', description:'Sơ đồ tư duy, định dạng văn bản, bảng', icon:'📝', grade:6,
  lessons:[
    L('g6_E_1','Bài 10: Sơ đồ tư duy',6,4,0,
`## Sơ đồ tư duy (Mind Map)
### Sơ đồ tư duy là gì?
Cách tổ chức ý tưởng dạng **nhánh cây** từ chủ đề trung tâm.
### Cách vẽ
1. Chủ đề chính ở **giữa**
2. Các nhánh chính tỏa ra xung quanh
3. Nhánh phụ chi tiết hơn
4. Dùng **màu sắc, hình ảnh** để dễ nhớ
### Phần mềm vẽ sơ đồ tư duy
- XMind, MindMeister, Canva`,['Sơ đồ tư duy','Mind Map','Nhánh'],'🧠'),
    L('g6_E_2','Bài 11-14: Định dạng văn bản và bảng',6,4,1,
`## Định dạng văn bản nâng cao
### Định dạng ký tự
- Font chữ, cỡ chữ, màu chữ
- **Bold** (Ctrl+B), *Italic* (Ctrl+I), Underline (Ctrl+U)
### Định dạng đoạn
- Căn lề: Trái, Phải, Giữa, Đều
- Khoảng cách dòng (Line spacing)
- Thụt đầu dòng (Indent)
### Bảng biểu
- Insert → Table → chọn số hàng/cột
- Gộp ô: Merge Cells, Tách ô: Split Cells
### Tìm kiếm và thay thế
- **Ctrl+F**: Tìm kiếm
- **Ctrl+H**: Tìm và thay thế`,['Định dạng','Bảng biểu','Tìm kiếm','Thay thế'],'📝'),
  ],
},
{
  id:'g6_F', title:'Chủ đề F: Giải quyết vấn đề', description:'Thuật toán, cấu trúc điều khiển, chương trình', icon:'💡', grade:6,
  lessons:[
    L('g6_F_1','Bài 15: Thuật toán',6,5,0,
`## Thuật toán
### Thuật toán là gì?
Dãy bước **hữu hạn, rõ ràng** để giải quyết vấn đề.
### Biểu diễn thuật toán
1. **Liệt kê bước**: Viết từng bước bằng lời
2. **Lưu đồ** (Flowchart):
   - ⬭ Oval: Bắt đầu/Kết thúc
   - ▭ Hình chữ nhật: Xử lí
   - ◇ Hình thoi: Điều kiện
   - ▱ Hình bình hành: Nhập/Xuất`,['Thuật toán','Lưu đồ','Flowchart'],'💡'),
    L('g6_F_2','Bài 16-17: Cấu trúc điều khiển và chương trình',6,5,1,
`## Cấu trúc điều khiển
### Ba cấu trúc cơ bản
1. **Tuần tự**: Lệnh chạy lần lượt từ trên xuống
2. **Rẽ nhánh**: if...then...else — kiểm tra điều kiện
3. **Lặp**: repeat / while — thực hiện nhiều lần
### Chương trình máy tính
Thuật toán được viết bằng **ngôn ngữ lập trình** → máy tính hiểu và thực hiện.
### Ví dụ trong Scratch
\`\`\`
when 🏴 clicked
ask "Nhập số:" and wait
if (answer > 0) then
    say "Số dương"
else
    say "Số không dương"
\`\`\``,['Tuần tự','Rẽ nhánh','Lặp','Chương trình'],'🔄'),
  ],
},

// ==================== LỚP 7 ====================
{
  id:'g7_A', title:'Chủ đề A: Máy tính và cộng đồng', description:'Thiết bị vào-ra, phần mềm, quản lí dữ liệu', icon:'🖥️', grade:7,
  lessons:[
    L('g7_A_1','Bài 1: Thiết bị vào – ra',7,0,0,
`## Thiết bị vào – ra
### Thiết bị vào (Input)
Đưa dữ liệu VÀO máy tính: bàn phím, chuột, micro, webcam, máy quét
### Thiết bị ra (Output)
Đưa dữ liệu RA ngoài: màn hình, loa, máy in, tai nghe
### Thiết bị vừa vào vừa ra
Màn hình cảm ứng, USB, ổ cứng ngoài`,['Thiết bị vào','Thiết bị ra','Input','Output'],'🔌'),
    L('g7_A_2','Bài 2: Phần mềm máy tính',7,0,1,
`## Phân loại phần mềm
| Loại | Chức năng | Ví dụ |
|------|-----------|-------|
| Hệ thống | Quản lí máy tính | Windows, Linux |
| Ứng dụng | Phục vụ người dùng | Word, Chrome |
| Tiện ích | Hỗ trợ hệ thống | Diệt virus, nén file |
### Phần mềm nguồn mở vs Thương mại
- **Nguồn mở**: Miễn phí, mã công khai (Linux, LibreOffice)
- **Thương mại**: Phải mua bản quyền (MS Office, Photoshop)`,['Phần mềm hệ thống','Phần mềm ứng dụng','Nguồn mở'],'💿'),
    L('g7_A_3','Bài 3: Quản lí dữ liệu trong máy tính',7,0,2,
`## Quản lí dữ liệu
### Hệ thống tệp và thư mục
- Cây thư mục phân cấp (gốc → nhánh → lá)
- Đường dẫn: C:\\Users\\Minh\\Documents\\bai.docx
### Thao tác quản lí
- Tạo, đổi tên, sao chép, di chuyển, xóa
- Nén file (ZIP, RAR) để giảm dung lượng
### Sao lưu dữ liệu
- USB, ổ cứng ngoài, đám mây (Google Drive)`,['Hệ thống tệp','Đường dẫn','Nén file','Sao lưu'],'📁'),
  ],
},
{
  id:'g7_B', title:'Chủ đề B: Tổ chức và trao đổi thông tin', description:'Mạng xã hội và trao đổi thông tin', icon:'💬', grade:7,
  lessons:[
    L('g7_B_1','Bài 4: Mạng xã hội và kênh trao đổi thông tin',7,1,0,
`## Mạng xã hội
### Mạng xã hội là gì?
Nền tảng cho phép chia sẻ thông tin, kết nối (Facebook, YouTube, TikTok)
### Ưu và nhược điểm
| Ưu điểm | Nhược điểm |
|----------|------------|
| Kết nối bạn bè | Mất thời gian |
| Học hỏi kiến thức | Thông tin sai lệch |
| Chia sẻ sáng tạo | Quyền riêng tư |
### Kênh trao đổi tin khác
Email, chat (Zalo, Messenger), video call (Google Meet, Zoom)`,['Mạng xã hội','Trao đổi thông tin','Quyền riêng tư'],'💬'),
  ],
},
{
  id:'g7_C', title:'Chủ đề C: Đạo đức và pháp luật số', description:'Ứng xử trên mạng', icon:'⚖️', grade:7,
  lessons:[
    L('g7_C_1','Bài 5: Ứng xử trên mạng',7,2,0,
`## Ứng xử văn minh trên mạng
### Netiquette (Văn hóa mạng)
- ✅ Tôn trọng người khác, lịch sự
- ✅ Kiểm tra thông tin trước khi chia sẻ
- ❌ Không bắt nạt, xúc phạm (cyberbullying)
- ❌ Không chia sẻ tin giả (fake news)
- ❌ Không vi phạm bản quyền
### Quyền riêng tư
- Không chia sẻ thông tin cá nhân của người khác
- Xin phép trước khi đăng ảnh người khác`,['Netiquette','Cyberbullying','Fake news','Quyền riêng tư'],'⚖️'),
  ],
},
{
  id:'g7_D', title:'Chủ đề D: Ứng dụng tin học', description:'Bảng tính Excel và trình chiếu', icon:'📊', grade:7,
  lessons:[
    L('g7_D_1','Bài 6-7: Bảng tính và tính toán',7,3,0,
`## Phần mềm bảng tính (Excel)
### Giao diện
- **Ô (Cell)**: Giao điểm hàng + cột (A1, B3, C5)
- **Sheet tab**: Chuyển giữa các trang tính
### Công thức
Bắt đầu bằng dấu **=**: =A1+B1, =A1*2
### Hàm cơ bản
| Hàm | Chức năng |
|-----|-----------|
| =SUM() | Tính tổng |
| =AVERAGE() | Trung bình |
| =MAX() | Giá trị lớn nhất |
| =MIN() | Giá trị nhỏ nhất |
| =COUNT() | Đếm ô chứa số |
| =IF() | Kiểm tra điều kiện |`,['Excel','Cell','SUM','AVERAGE','IF'],'📊'),
    L('g7_D_2','Bài 8-10: Trình bày bảng tính',7,3,1,
`## Trình bày bảng tính
### Định dạng ô
- Font chữ, cỡ chữ, màu chữ, màu nền
- Viền ô (Borders), căn lề ô
### Sắp xếp và lọc
- **Sort**: Sắp xếp tăng/giảm dần
- **Filter**: Lọc dữ liệu theo điều kiện
### Biểu đồ
- **Column Chart**: So sánh giá trị
- **Pie Chart**: Tỷ lệ phần trăm
- **Line Chart**: Xu hướng theo thời gian
### AutoFill
Kéo góc ô để tự động điền dữ liệu theo quy luật`,['Định dạng','Sort','Filter','Biểu đồ','AutoFill'],'📈'),
    L('g7_D_3','Bài 11-13: Bài trình chiếu',7,3,2,
`## Trình chiếu nâng cao
### Thiết kế slide chuyên nghiệp
- Dùng **Slide Master** để thống nhất định dạng
- Chèn hình ảnh, biểu đồ, video
- Định dạng đối tượng: kích thước, vị trí, hiệu ứng
### Kĩ năng thuyết trình
- Nhìn khán giả, không đọc slide
- Nói rõ ràng, tốc độ vừa phải
- Dùng Speaker Notes để ghi nhớ`,['Slide Master','Thuyết trình','Speaker Notes'],'📊'),
  ],
},
{
  id:'g7_E', title:'Chủ đề E: Giải quyết vấn đề', description:'Thuật toán tìm kiếm và sắp xếp', icon:'🔍', grade:7,
  lessons:[
    L('g7_E_1','Bài 14-15: Thuật toán tìm kiếm',7,4,0,
`## Thuật toán tìm kiếm
### Tìm kiếm tuần tự (Linear Search)
Duyệt từng phần tử từ đầu đến cuối.
- Ưu: Đơn giản, dùng cho mọi dãy
- Nhược: Chậm với dãy lớn
### Tìm kiếm nhị phân (Binary Search)
Chia đôi dãy **đã sắp xếp** để tìm.
- Ưu: Rất nhanh
- Nhược: Dãy phải được sắp xếp trước`,['Tìm kiếm tuần tự','Tìm kiếm nhị phân'],'🔍'),
    L('g7_E_2','Bài 16: Thuật toán sắp xếp',7,4,1,
`## Thuật toán sắp xếp
### Sắp xếp nổi bọt (Bubble Sort)
So sánh 2 phần tử cạnh nhau, đổi chỗ nếu sai thứ tự.
### Sắp xếp chọn (Selection Sort)
Tìm phần tử nhỏ nhất, đặt vào đầu, lặp lại.
### So sánh
| Thuật toán | Ý tưởng | Tốc độ |
|------------|---------|--------|
| Bubble Sort | Đổi chỗ cạnh nhau | Chậm |
| Selection Sort | Chọn nhỏ nhất | Trung bình |`,['Bubble Sort','Selection Sort','Sắp xếp'],'📋'),
  ],
},

// ==================== LỚP 8 ====================
{
  id:'g8_A', title:'Chủ đề A: Máy tính và cộng đồng', description:'Khái quát về tin học và máy tính', icon:'💻', grade:8,
  lessons:[
    L('g8_A_1','Bài 1: Khái quát về tin học và máy tính',8,0,0,
`## Tin học là gì?
**Tin học** là ngành khoa học nghiên cứu các phương pháp xử lí thông tin tự động bằng máy tính.
### Vai trò của tin học
- Y tế, giáo dục, giao thông, giải trí, kinh doanh
- Trí tuệ nhân tạo (AI), IoT, Big Data
### Lịch sử phát triển máy tính
Thế hệ 1 (đèn chân không) → Thế hệ 2 (transistor) → Thế hệ 3 (IC) → Thế hệ 4 (vi xử lý) → Thế hệ 5 (AI)`,['Tin học','AI','IoT','Lịch sử máy tính'],'💻'),
  ],
},
{
  id:'g8_B', title:'Chủ đề B: Thông tin trong môi trường số', description:'Khai thác thông tin số', icon:'📱', grade:8,
  lessons:[
    L('g8_B_1','Bài 2-3: Thông tin trong môi trường số',8,1,0,
`## Thông tin trong môi trường số
### Thông tin số là gì?
Thông tin được biểu diễn dưới dạng số (0 và 1) trên thiết bị điện tử.
### Nguồn thông tin số
- Trang web, ebook, video trực tuyến
- Cơ sở dữ liệu, kho lưu trữ đám mây
### Đánh giá thông tin
- Kiểm tra **nguồn gốc** (tác giả, tổ chức)
- So sánh **nhiều nguồn** khác nhau
- Chú ý **ngày đăng** (thông tin cập nhật?)`,['Thông tin số','Đánh giá thông tin','Nguồn tin'],'📱'),
  ],
},
{
  id:'g8_C', title:'Chủ đề C: Đạo đức và pháp luật số', description:'Đạo đức và pháp luật trong môi trường số', icon:'⚖️', grade:8,
  lessons:[
    L('g8_C_1','Bài 4: Đạo đức và pháp luật trong môi trường số',8,2,0,
`## Đạo đức và pháp luật số
### Quyền sở hữu trí tuệ
- Bản quyền tác giả (văn bản, ảnh, nhạc, phần mềm)
- Giấy phép sử dụng (license)
### Pháp luật
- Luật An ninh mạng
- Luật Sở hữu trí tuệ
- Xử phạt vi phạm: phần mềm lậu, chia sẻ nội dung vi phạm
### Công dân số tốt
- Có trách nhiệm khi sử dụng công nghệ
- Tôn trọng quyền của người khác
- Bảo vệ thông tin cá nhân`,['Sở hữu trí tuệ','Luật An ninh mạng','Công dân số'],'⚖️'),
  ],
},
{
  id:'g8_D', title:'Chủ đề D: Ứng dụng tin học', description:'Bảng tính nâng cao và chỉnh sửa ảnh', icon:'📊', grade:8,
  lessons:[
    L('g8_D_1','Bài 5-8: Bảng tính nâng cao',8,3,0,
`## Bảng tính giải quyết bài toán thực tế
### Sắp xếp và lọc dữ liệu
- **Sort**: Sắp xếp theo 1 hoặc nhiều cột
- **Filter**: Lọc hiển thị theo điều kiện
### Biểu đồ
Trình bày dữ liệu trực quan: Column, Bar, Line, Pie chart
### Hàm nâng cao
- =COUNTIF(): Đếm có điều kiện
- =SUMIF(): Tính tổng có điều kiện
- =VLOOKUP(): Dò tìm giá trị`,['Sort','Filter','Biểu đồ','COUNTIF','VLOOKUP'],'📊'),
    L('g8_D_2','Bài 9-11: Chỉnh sửa ảnh',8,3,1,
`## Chỉnh sửa ảnh
### Phần mềm chỉnh sửa
GIMP (miễn phí), Photoshop (thương mại), Canva (trực tuyến)
### Thao tác cơ bản
- Cắt ảnh (Crop), xoay (Rotate), lật (Flip)
- Thay đổi kích thước (Resize)
- Điều chỉnh độ sáng, tương phản, màu sắc
### Lớp (Layer)
- Mỗi lớp chứa một phần của ảnh
- Có thể chỉnh sửa từng lớp riêng biệt`,['Chỉnh sửa ảnh','Crop','Resize','Layer'],'🖼️'),
  ],
},
{
  id:'g8_E', title:'Chủ đề E: Lập trình Python', description:'Từ thuật toán đến chương trình Python', icon:'🐍', grade:8,
  lessons:[
    L('g8_E_1','Bài 12-13: Từ thuật toán đến chương trình',8,4,0,
`## Từ thuật toán đến chương trình
### Ngôn ngữ lập trình Python
\`\`\`python
# Chương trình đầu tiên
print("Xin chào Python!")

# Biến và kiểu dữ liệu
ten = "Minh"      # str (chuỗi)
tuoi = 14          # int (số nguyên)
diem = 8.5         # float (số thực)
hoc_gioi = True    # bool (đúng/sai)

# Nhập dữ liệu
ten = input("Nhập tên: ")
tuoi = int(input("Nhập tuổi: "))
\`\`\``,['Python','Biến','Kiểu dữ liệu','print','input'],'🐍'),
    L('g8_E_2','Bài 14: Cấu trúc điều khiển',8,4,1,
`## Cấu trúc điều khiển trong Python
### Rẽ nhánh (if-elif-else)
\`\`\`python
if diem >= 8.5:
    print("Giỏi")
elif diem >= 6.5:
    print("Khá")
elif diem >= 5.0:
    print("Trung bình")
else:
    print("Yếu")
\`\`\`
### Vòng lặp for
\`\`\`python
for i in range(1, 6):
    print(i)  # In: 1, 2, 3, 4, 5
\`\`\`
### Vòng lặp while
\`\`\`python
so = 5
while so > 0:
    print(so)
    so -= 1
\`\`\``,['if-elif-else','for','while','range'],'🔄'),
    L('g8_E_3','Bài 15: Gỡ lỗi chương trình',8,4,2,
`## Gỡ lỗi (Debug)
### Các loại lỗi
| Loại | Mô tả | Ví dụ |
|------|-------|-------|
| **Syntax Error** | Sai cú pháp | Thiếu dấu : sau if |
| **Runtime Error** | Lỗi khi chạy | Chia cho 0 |
| **Logic Error** | Sai logic | Kết quả tính sai |
### Cách gỡ lỗi
1. Đọc thông báo lỗi → tìm dòng sai
2. Dùng **print()** để kiểm tra giá trị
3. Chạy từng phần nhỏ để tìm lỗi`,['Debug','Syntax Error','Runtime Error','Logic Error'],'🐛'),
  ],
},
{
  id:'g8_F', title:'Chủ đề F: Hướng nghiệp với Tin học', description:'Tìm hiểu ngành nghề tin học', icon:'🎓', grade:8,
  lessons:[
    L('g8_F_1','Bài 16: Ngành nghề tin học',8,5,0,
`## Ngành nghề tin học
### Các ngành phổ biến
- **Lập trình viên**: Viết phần mềm, ứng dụng, game
- **Quản trị mạng**: Duy trì hệ thống mạng
- **Thiết kế đồ họa**: Thiết kế hình ảnh, UI/UX
- **An ninh mạng**: Bảo vệ hệ thống khỏi tấn công
- **Khoa học dữ liệu**: Phân tích dữ liệu lớn, AI`,['Lập trình viên','Quản trị mạng','An ninh mạng','Data Science'],'🎓'),
  ],
},

// ==================== LỚP 9 ====================
{
  id:'g9_A', title:'Chương 1: Máy tính và cộng đồng', description:'Thế giới kĩ thuật số, thông tin và pháp luật', icon:'🌐', grade:9,
  lessons:[
    L('g9_A_1','Bài 1-2: Thế giới kĩ thuật số',9,0,0,
`## Thế giới kĩ thuật số
### Chuyển đổi số
Ứng dụng công nghệ số vào mọi lĩnh vực đời sống: giáo dục, y tế, giao thông...
### Thông tin trong giải quyết vấn đề
1. Xác định vấn đề
2. Thu thập thông tin liên quan
3. Phân tích, đánh giá thông tin
4. Đưa ra giải pháp
### Đánh giá chất lượng thông tin
- Tính chính xác, đầy đủ, cập nhật
- Nguồn tin đáng tin cậy`,['Chuyển đổi số','Đánh giá thông tin','Giải quyết vấn đề'],'🌐'),
    L('g9_A_2','Bài 4: Pháp luật về sử dụng Internet',9,0,1,
`## Pháp luật khi dùng Internet
### Quy định pháp luật
- Luật An ninh mạng Việt Nam
- Quyền sở hữu trí tuệ
- Bảo vệ dữ liệu cá nhân
### Hành vi vi phạm
- Đăng tải thông tin sai sự thật
- Xâm phạm quyền riêng tư
- Sử dụng phần mềm lậu
- Tấn công hệ thống mạng`,['Pháp luật','Luật An ninh mạng','Quyền riêng tư'],'⚖️'),
  ],
},
{
  id:'g9_B', title:'Chương 2: Tổ chức và trao đổi thông tin', description:'Phần mềm mô phỏng, công cụ hợp tác', icon:'🤝', grade:9,
  lessons:[
    L('g9_B_1','Bài 5-6: Phần mềm mô phỏng',9,1,0,
`## Phần mềm mô phỏng
### Mô phỏng là gì?
Dùng phần mềm để **tái hiện** các hiện tượng thực tế trên máy tính.
### Ứng dụng
- Mô phỏng vật lý, hóa học (PhET)
- Mô phỏng kiến trúc (3D)
- Huấn luyện lái xe, bay`,['Mô phỏng','PhET','Thực tế ảo'],'🔬'),
    L('g9_B_2','Bài 7-8: Trao đổi và hợp tác trực tuyến',9,1,1,
`## Hợp tác trực tuyến
### Công cụ hợp tác
- **Google Docs**: Soạn thảo cùng lúc
- **Google Meet/Zoom**: Họp video
- **Trello/Notion**: Quản lý dự án
### Kĩ năng trao đổi
- Trình bày rõ ràng, ngắn gọn
- Lắng nghe và phản hồi
- Chia sẻ tài liệu qua đám mây`,['Google Docs','Hợp tác','Đám mây'],'🤝'),
  ],
},
{
  id:'g9_C', title:'Chương 3: Đạo đức và an toàn số', description:'Sử dụng Internet có trách nhiệm', icon:'🛡️', grade:9,
  lessons:[
    L('g9_C_1','Bài 9-10: An toàn và quyền riêng tư',9,2,0,
`## An toàn và quyền riêng tư
### Sử dụng Internet có trách nhiệm
- Kiểm tra thông tin trước khi chia sẻ
- Tôn trọng bản quyền nội dung
- Không tham gia hành vi xấu trên mạng
### Bảo mật thông tin cá nhân
- Mật khẩu mạnh + Xác thực 2 yếu tố (2FA)
- Cài đặt quyền riêng tư trên mạng xã hội
- Cẩn thận với WiFi công cộng → dùng VPN`,['Quyền riêng tư','2FA','VPN','Trách nhiệm'],'🛡️'),
  ],
},
{
  id:'g9_D', title:'Chương 4: Ứng dụng tin học', description:'Bảng tính nâng cao và trò chơi tương tác', icon:'🎮', grade:9,
  lessons:[
    L('g9_D_1','Bài 11-12: Dữ liệu trên trang tính',9,3,0,
`## Xử lí dữ liệu trên bảng tính
### Hàm nâng cao
- =VLOOKUP(): Dò tìm giá trị theo cột
- =HLOOKUP(): Dò tìm theo hàng
- =INDEX() + MATCH(): Dò tìm linh hoạt
### Bảng Pivot
Tổng hợp, phân tích dữ liệu lớn tự động`,['VLOOKUP','Pivot Table','Hàm nâng cao'],'📊'),
    L('g9_D_2','Bài 13: Trò chơi tương tác',9,3,1,
`## Xây dựng trò chơi tương tác
### Thiết kế game đơn giản
1. **Ý tưởng**: Luật chơi, mục tiêu
2. **Nhân vật**: Sprite và hình ảnh
3. **Logic**: Điều khiển, va chạm, điểm số
4. **Giao diện**: Màn hình start, game over
### Trong Scratch
- Điều khiển bằng phím mũi tên
- Phát hiện va chạm (touching?)
- Biến đếm điểm, mạng sống`,['Game','Scratch','Va chạm','Điểm số'],'🎮'),
  ],
},
{
  id:'g9_E', title:'Chương 5: Giải quyết vấn đề', description:'Bài toán tin học và lập trình', icon:'💻', grade:9,
  lessons:[
    L('g9_E_1','Bài 14-16: Bài toán tin học và lập trình',9,4,0,
`## Giải quyết bài toán tin học
### Quy trình giải quyết
1. **Phân tích**: Input? Output? Ràng buộc?
2. **Thiết kế thuật toán**: Các bước giải
3. **Lập trình**: Viết code Python
4. **Kiểm thử**: Thử với nhiều bộ dữ liệu
5. **Tối ưu**: Cải thiện hiệu quả
### Ví dụ: Tìm số lớn nhất
\`\`\`python
ds = [3, 7, 1, 9, 4]
max_val = ds[0]
for x in ds:
    if x > max_val:
        max_val = x
print(f"Số lớn nhất: {max_val}")
\`\`\``,['Phân tích','Thuật toán','Lập trình','Kiểm thử'],'💻'),
  ],
},

// ==================== LỚP 10 ====================
{
  id:'g10_A', title:'Chủ đề A: Máy tính và xã hội tri thức', description:'Thông tin, biểu diễn dữ liệu, thiết bị số', icon:'🖥️', grade:10,
  lessons:[
    L('g10_A_1','Bài 1-2: Thông tin và thiết bị thông minh',10,0,0,
`## Thông tin và xã hội tri thức
### Tin học và xã hội
- Cách mạng công nghiệp 4.0
- Chuyển đổi số trong GD, y tế, kinh tế
### Vai trò thiết bị thông minh
Smartphone, smartwatch, IoT → kết nối vạn vật`,['Tin học','Cách mạng 4.0','IoT'],'🖥️'),
    L('g10_A_2','Bài 3-6: Biểu diễn dữ liệu',10,0,1,
`## Biểu diễn dữ liệu trong máy tính
### Hệ nhị phân
- Đổi thập phân ↔ nhị phân
- 5₁₀ = 101₂, 10₁₀ = 1010₂
### Dữ liệu lôgic (Boolean)
- True/False, AND, OR, NOT
### Dữ liệu văn bản
- ASCII (128 ký tự), Unicode (140,000+ ký tự)
### Dữ liệu âm thanh và hình ảnh
- Âm thanh: sampling rate (Hz)
- Hình ảnh: pixel, RGB, độ phân giải`,['Nhị phân','Boolean','ASCII','Unicode','Pixel','RGB'],'🔢'),
  ],
},
{
  id:'g10_B', title:'Chủ đề B: Mạng máy tính và Internet', description:'Mạng, an toàn mạng', icon:'🌐', grade:10,
  lessons:[
    L('g10_B_1','Bài 8-10: Mạng và an toàn mạng',10,1,0,
`## Mạng máy tính hiện đại
### Mạng trong đời sống
LAN, WAN, Internet → kết nối toàn cầu
### An toàn không gian mạng
- Phần mềm độc hại: Virus, Trojan, Ransomware
- Tường lửa (Firewall)
- Mã hóa (Encryption), HTTPS
### Khai thác tài nguyên Internet
- Tìm kiếm nâng cao
- Lưu trữ đám mây
- Học trực tuyến (e-learning)`,['LAN','WAN','Firewall','Ransomware','HTTPS'],'🌐'),
  ],
},
{
  id:'g10_C', title:'Chủ đề C: Đạo đức và pháp luật số', description:'Ứng xử và bản quyền', icon:'⚖️', grade:10,
  lessons:[
    L('g10_C_1','Bài 11: Ứng xử và bản quyền',10,2,0,
`## Đạo đức số
### Ứng xử trên môi trường số
- Tôn trọng, không xúc phạm
- Kiểm chứng trước khi chia sẻ
### Bản quyền
- Creative Commons (CC): Chia sẻ có điều kiện
- Copyright ©: Bảo vệ toàn bộ`,['Ứng xử số','Creative Commons','Copyright'],'⚖️'),
  ],
},
{
  id:'g10_D', title:'Chủ đề D: Thiết kế đồ họa', description:'Phần mềm thiết kế đồ họa', icon:'🎨', grade:10,
  lessons:[
    L('g10_D_1','Bài 12-15: Thiết kế đồ họa',10,3,0,
`## Thiết kế đồ họa
### Phần mềm
- **Inkscape** (miễn phí), **Adobe Illustrator** (thương mại)
### Đồ họa vector vs Raster
| | Vector | Raster |
|---|---|---|
| Đơn vị | Đường, hình | Pixel |
| Phóng to | Không vỡ | Bị vỡ |
| File | .svg, .ai | .jpg, .png |
### Kĩ thuật cơ bản
- Vẽ hình cơ bản, đường cong Bezier
- Tô màu, gradient, pattern
- Văn bản nghệ thuật
- Nhóm và lớp đối tượng`,['Vector','Raster','Inkscape','Bezier'],'🎨'),
  ],
},
{
  id:'g10_E', title:'Chủ đề E: Lập trình Python', description:'Lập trình Python từ cơ bản đến nâng cao', icon:'🐍', grade:10,
  lessons:[
    L('g10_E_1','Bài 16-18: Biến, gán, vào ra',10,4,0,
`## Nhập môn Python
### Biến và lệnh gán
\`\`\`python
x = 10
ten = "Minh"
pi = 3.14
\`\`\`
### Lệnh vào ra
\`\`\`python
n = int(input("Nhập n: "))
print(f"Kết quả: {n * 2}")
\`\`\``,['Python','Biến','input','print'],'🐍'),
    L('g10_E_2','Bài 19-21: Cấu trúc điều khiển',10,4,1,
`## Cấu trúc điều khiển
### Rẽ nhánh if
\`\`\`python
if n > 0:
    print("Dương")
elif n < 0:
    print("Âm")
else:
    print("Bằng 0")
\`\`\`
### Lặp for
\`\`\`python
for i in range(1, 11):
    print(i)
\`\`\`
### Lặp while
\`\`\`python
while n > 0:
    print(n)
    n -= 1
\`\`\``,['if','for','while','range'],'🔄'),
    L('g10_E_3','Bài 22-25: Danh sách và xâu kí tự',10,4,2,
`## List và String
### Danh sách (List)
\`\`\`python
ds = [1, 2, 3, 4, 5]
ds.append(6)       # Thêm cuối
ds.sort()           # Sắp xếp
len(ds)             # Độ dài
ds[0]               # Phần tử đầu
ds[1:3]             # Slicing
\`\`\`
### Xâu kí tự (String)
\`\`\`python
s = "Xin chào"
s.upper()          # "XIN CHÀO"
s.lower()          # "xin chào"
s.split()          # ["Xin", "chào"]
len(s)             # 8
\`\`\``,['List','String','append','sort','split'],'📦'),
    L('g10_E_4','Bài 26-31: Hàm và gỡ lỗi',10,4,3,
`## Hàm trong Python
### Định nghĩa hàm
\`\`\`python
def tinh_tong(a, b):
    return a + b

ket_qua = tinh_tong(3, 5)  # 8
\`\`\`
### Tham số và phạm vi biến
- Tham số = biến nhận giá trị khi gọi hàm
- Biến cục bộ (local) vs toàn cục (global)
### Kiểm thử và gỡ lỗi
- Thử với nhiều bộ test
- Dùng print() để kiểm tra
- Đọc thông báo lỗi`,['Hàm','return','Tham số','Phạm vi biến','Kiểm thử'],'🔧'),
  ],
},
{
  id:'g10_F', title:'Chủ đề F: Hướng nghiệp', description:'Nghề thiết kế đồ họa và phát triển phần mềm', icon:'🎓', grade:10,
  lessons:[
    L('g10_F_1','Bài 33-34: Nghề tin học',10,5,0,
`## Nghề tin học
### Thiết kế đồ họa
- UI/UX Designer, Graphic Designer
- Công cụ: Figma, Photoshop, Illustrator
### Phát triển phần mềm
- Frontend (giao diện), Backend (server), Fullstack
- Ngôn ngữ: Python, JavaScript, Java, C++
### Kĩ năng cần thiết
- Tư duy logic, giải quyết vấn đề
- Làm việc nhóm, giao tiếp
- Tự học liên tục`,['Thiết kế đồ họa','Phát triển phần mềm','Frontend','Backend'],'🎓'),
  ],
},

// ==================== LỚP 11 ====================
{
  id:'g11_A', title:'Chủ đề A: Máy tính và xã hội tri thức', description:'Hệ điều hành, phần cứng, kết nối thiết bị', icon:'⚙️', grade:11,
  lessons:[
    L('g11_A_1','Bài 1-3: Hệ điều hành và phần mềm',11,0,0,
`## Hệ điều hành
### Chức năng chính
Quản lý: tiến trình, bộ nhớ, tệp, thiết bị, bảo mật
### Các HĐH phổ biến
Windows, macOS, Linux, Android, iOS
### Phần mềm nguồn mở
- LibreOffice (thay MS Office)
- GIMP (thay Photoshop)
- Google Docs (trực tuyến, miễn phí)`,['Hệ điều hành','Linux','Phần mềm nguồn mở'],'⚙️'),
    L('g11_A_2','Bài 4-5: Bên trong máy tính và kết nối',11,0,1,
`## Bên trong máy tính
### Kiến trúc máy tính
- **CPU**: Bộ xử lý (CU + ALU + Thanh ghi)
- **RAM**: Bộ nhớ tạm thời
- **Bộ nhớ ngoài**: SSD, HDD
- **Mainboard**: Kết nối tất cả linh kiện
- **GPU**: Xử lý đồ họa
### Kết nối thiết bị số
- USB, HDMI, Bluetooth, WiFi
- Cài đặt driver (trình điều khiển)`,['CPU','RAM','SSD','GPU','USB','Bluetooth'],'🔧'),
  ],
},
{
  id:'g11_B', title:'Chủ đề B: Tổ chức lưu trữ và trao đổi', description:'Lưu trữ đám mây, tìm kiếm, email nâng cao', icon:'☁️', grade:11,
  lessons:[
    L('g11_B_1','Bài 6-8: Lưu trữ và chia sẻ',11,1,0,
`## Lưu trữ và chia sẻ trực tuyến
### Dịch vụ đám mây
- Google Drive, OneDrive, Dropbox
- Chia sẻ file, cộng tác thời gian thực
### Tìm kiếm nâng cao
- Toán tử: site:, filetype:, "cụm từ"
- Google Scholar (tài liệu học thuật)
### Email và mạng xã hội nâng cao
- Quản lý hộp thư (label, filter)
- Thiết lập bảo mật 2 lớp`,['Google Drive','Tìm kiếm nâng cao','Email'],'☁️'),
  ],
},
{
  id:'g11_C', title:'Chủ đề C: Đạo đức số', description:'Giao tiếp an toàn trên Internet', icon:'🔒', grade:11,
  lessons:[
    L('g11_C_1','Bài 9: Giao tiếp an toàn trên Internet',11,2,0,
`## Giao tiếp an toàn
### Rủi ro trên Internet
- Phishing, Social Engineering
- Malware qua email/link
- Rò rỉ dữ liệu cá nhân
### Biện pháp bảo vệ
- Xác thực 2 yếu tố (2FA)
- VPN khi dùng WiFi công cộng
- Mật khẩu khác nhau cho mỗi tài khoản
- Cập nhật phần mềm thường xuyên`,['Phishing','2FA','VPN','Mật khẩu'],'🔒'),
  ],
},
{
  id:'g11_D', title:'Chủ đề D: Cơ sở dữ liệu', description:'CSDL quan hệ, SQL', icon:'🗄️', grade:11,
  lessons:[
    L('g11_D_1','Bài 10-13: Cơ sở dữ liệu quan hệ',11,3,0,
`## Cơ sở dữ liệu
### CSDL là gì?
Tập hợp dữ liệu có tổ chức, cho phép truy xuất hiệu quả.
### Mô hình quan hệ
- **Bảng** (Table): Hàng (bản ghi) × Cột (trường)
- **Khóa chính** (Primary Key): Xác định duy nhất bản ghi
- **Khóa ngoại** (Foreign Key): Liên kết giữa 2 bảng
### Hệ quản trị CSDL
MySQL, PostgreSQL, SQLite, SQL Server`,['CSDL','Bảng','Khóa chính','Khóa ngoại','DBMS'],'🗄️'),
    L('g11_D_2','Bài 14-15: SQL và bảo mật CSDL',11,3,1,
`## SQL – Ngôn ngữ truy vấn
### Truy vấn cơ bản
\`\`\`sql
SELECT HoTen, DiemTB FROM HocSinh
WHERE Lop = '11A1' ORDER BY DiemTB DESC;
\`\`\`
### Thao tác dữ liệu
\`\`\`sql
INSERT INTO HocSinh VALUES ('HS01', 'An', 8.5);
UPDATE HocSinh SET DiemTB = 9 WHERE MaHS = 'HS01';
DELETE FROM HocSinh WHERE MaHS = 'HS01';
\`\`\`
### Bảo mật CSDL
- Phân quyền truy cập
- Sao lưu (backup) định kỳ
- Mã hóa dữ liệu nhạy cảm`,['SQL','SELECT','INSERT','UPDATE','DELETE','Bảo mật'],'📝'),
  ],
},
{
  id:'g11_E', title:'Chủ đề E: Kĩ thuật lập trình', description:'Mảng, tìm kiếm, sắp xếp', icon:'💻', grade:11,
  lessons:[
    L('g11_E_1','Bài 17-18: Mảng một chiều và hai chiều',11,4,0,
`## Mảng (Array)
### Mảng 1 chiều
\`\`\`python
ds = [3, 7, 1, 9, 4]
print(ds[0])     # 3
print(len(ds))   # 5
\`\`\`
### Mảng 2 chiều
\`\`\`python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
print(matrix[1][2])  # 6
\`\`\``,['Mảng 1 chiều','Mảng 2 chiều','Index'],'📦'),
    L('g11_E_2','Bài 19-21: Tìm kiếm và sắp xếp',11,4,1,
`## Thuật toán tìm kiếm và sắp xếp
### Tìm kiếm tuần tự
\`\`\`python
def tim_kiem(ds, x):
    for i in range(len(ds)):
        if ds[i] == x:
            return i
    return -1
\`\`\`
### Tìm kiếm nhị phân
\`\`\`python
def tim_nhi_phan(ds, x):
    lo, hi = 0, len(ds) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if ds[mid] == x: return mid
        elif ds[mid] < x: lo = mid + 1
        else: hi = mid - 1
    return -1
\`\`\`
### Sắp xếp
- Bubble Sort, Selection Sort, Insertion Sort`,['Tìm kiếm tuần tự','Tìm kiếm nhị phân','Bubble Sort'],'🔍'),
  ],
},
{
  id:'g11_F', title:'Chủ đề F: Hướng nghiệp', description:'Quản trị cơ sở dữ liệu', icon:'🎓', grade:11,
  lessons:[
    L('g11_F_1','Bài 16: Quản trị CSDL',11,5,0,
`## Nghề quản trị CSDL
### Database Administrator (DBA)
- Thiết kế, cài đặt, bảo trì CSDL
- Đảm bảo hiệu suất và an toàn dữ liệu
### Kĩ năng cần có
- SQL thành thạo
- Hiểu kiến trúc hệ thống
- Kĩ năng sao lưu, phục hồi dữ liệu
- Bảo mật thông tin`,['DBA','SQL','Bảo trì','Sao lưu'],'🎓'),
  ],
},

// ==================== LỚP 12 ====================
{
  id:'g12_A', title:'Chủ đề A: Máy tính và xã hội', description:'Dữ liệu lớn, AI, IoT', icon:'🤖', grade:12,
  lessons:[
    L('g12_A_1','Bài: Công nghệ hiện đại',12,0,0,
`## Công nghệ hiện đại
### Dữ liệu lớn (Big Data)
- Dữ liệu có khối lượng lớn, tốc độ cao, đa dạng
- Ứng dụng: phân tích xu hướng, dự đoán
### Trí tuệ nhân tạo (AI)
- Machine Learning, Deep Learning
- Ứng dụng: nhận diện khuôn mặt, chatbot, xe tự lái
### Internet vạn vật (IoT)
- Kết nối thiết bị qua Internet
- Smart home, smart city`,['Big Data','AI','Machine Learning','IoT'],'🤖'),
  ],
},
{
  id:'g12_B', title:'Chủ đề B: Mạng và truyền thông', description:'Mạng nâng cao, điện toán đám mây', icon:'☁️', grade:12,
  lessons:[
    L('g12_B_1','Bài: Mạng và đám mây',12,1,0,
`## Mạng nâng cao
### Mô hình Client-Server
- **Server**: Máy chủ cung cấp dịch vụ
- **Client**: Máy khách sử dụng dịch vụ
### Điện toán đám mây (Cloud Computing)
| Mô hình | Ý nghĩa |
|---------|---------|
| **IaaS** | Hạ tầng (máy ảo, lưu trữ) |
| **PaaS** | Nền tảng (database, hosting) |
| **SaaS** | Ứng dụng (Gmail, Office 365) |`,['Client-Server','Cloud','IaaS','PaaS','SaaS'],'☁️'),
  ],
},
{
  id:'g12_C', title:'Chủ đề C: Đạo đức số', description:'An toàn thông tin nâng cao', icon:'🔐', grade:12,
  lessons:[
    L('g12_C_1','Bài: An toàn thông tin nâng cao',12,2,0,
`## An toàn thông tin nâng cao
### Mã hóa (Cryptography)
- Mã hóa đối xứng (AES) vs bất đối xứng (RSA)
- Chứng chỉ số (SSL/TLS)
### Tấn công phổ biến
- DDoS, SQL Injection, XSS
- Social Engineering
### Bảo vệ hệ thống
- Firewall, IDS/IPS
- Audit log, giám sát liên tục`,['Mã hóa','AES','RSA','DDoS','SQL Injection'],'🔐'),
  ],
},
{
  id:'g12_D', title:'Chủ đề D: Ứng dụng tin học', description:'Phát triển ứng dụng web, mobile', icon:'🌍', grade:12,
  lessons:[
    L('g12_D_1','Bài: Phát triển ứng dụng',12,3,0,
`## Phát triển ứng dụng
### Web Development
- **HTML**: Cấu trúc trang web
- **CSS**: Giao diện, bố cục
- **JavaScript**: Logic, tương tác
### Mobile Development
- Android (Kotlin/Java), iOS (Swift)
- Cross-platform: React Native, Flutter
### Quy trình phát triển
1. Phân tích yêu cầu
2. Thiết kế giao diện (UI/UX)
3. Lập trình
4. Kiểm thử
5. Triển khai`,['HTML','CSS','JavaScript','Mobile','UI/UX'],'🌍'),
  ],
},
{
  id:'g12_E', title:'Chủ đề E: Giải quyết vấn đề', description:'Lập trình nâng cao, thuật toán', icon:'💻', grade:12,
  lessons:[
    L('g12_E_1','Bài: Lập trình nâng cao',12,4,0,
`## Lập trình nâng cao
### Cấu trúc dữ liệu
- **Stack**: Ngăn xếp (LIFO)
- **Queue**: Hàng đợi (FIFO)
- **Dictionary**: Bảng băm key-value
### Đệ quy
\`\`\`python
def fibonacci(n):
    if n <= 1: return n
    return fibonacci(n-1) + fibonacci(n-2)
\`\`\`
### File I/O
\`\`\`python
# Đọc file
with open("data.txt", "r") as f:
    data = f.read()

# Ghi file
with open("output.txt", "w") as f:
    f.write("Kết quả")
\`\`\``,['Stack','Queue','Đệ quy','File I/O'],'💻'),
  ],
},
{
  id:'g12_F', title:'Chủ đề F: Hướng nghiệp', description:'Các ngành nghề tin học', icon:'🎓', grade:12,
  lessons:[
    L('g12_F_1','Bài: Ngành nghề tin học',12,5,0,
`## Ngành nghề tin học
### Các lĩnh vực chính
| Lĩnh vực | Công việc |
|-----------|-----------|
| Phát triển phần mềm | Web, Mobile, Game |
| Khoa học dữ liệu | Data Analyst, ML Engineer |
| An ninh mạng | Security Analyst, Pentester |
| Quản trị hệ thống | SysAdmin, DevOps |
| AI/ML | AI Researcher, NLP Engineer |
### Xu hướng tương lai
- AI/ML, Cloud Computing, Blockchain
- Cybersecurity, Quantum Computing`,['Phát triển phần mềm','Data Science','An ninh mạng','AI/ML'],'🎓'),
  ],
},
];

export function getChaptersByGrade(grade: GradeLevel): TextbookChapter[] {
  return TEXTBOOK_CHAPTERS.filter(ch => ch.grade === grade);
}

export function getAvailableGrades(): GradeLevel[] {
  const grades = new Set(TEXTBOOK_CHAPTERS.map(ch => ch.grade));
  return Array.from(grades).sort((a, b) => a - b) as GradeLevel[];
}
