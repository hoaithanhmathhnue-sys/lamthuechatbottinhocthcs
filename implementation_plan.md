# Thực Hiện 3 Lệnh Cuối (Thư mục GV)

Dựa trên file `lệnh cuối.txt`, cần thực hiện 3 tác vụ sử dụng dữ liệu GV (Trần Thị Kim Thoa, Trường THPT Hoàng Diệu, Cần Thơ, avatar.jpg, logo.jpg).

## Proposed Changes

---

### 1. Trang Tác Giả

#### Copy ảnh vào public
- Copy [GV/avatar.jpg](file:///d:/000000000000000000%20KH%C3%93A%20M%E1%BB%98T%20PH%C3%81T%20%C4%82N%20NGAY/APP%20KIM%20THOA/APP%20CHUYEN%20GIA%20TIN%20HOC/tinhocedu/GV/avatar.jpg) → `public/avatar.jpg`
- Copy [GV/logo.jpg](file:///d:/000000000000000000%20KH%C3%93A%20M%E1%BB%98T%20PH%C3%81T%20%C4%82N%20NGAY/APP%20KIM%20THOA/APP%20CHUYEN%20GIA%20TIN%20HOC/tinhocedu/GV/logo.jpg) → `public/logo.jpg`

#### [NEW] [AuthorProfile.tsx](file:///d:/000000000000000000%20KHÓA%20MỘT%20PHÁT%20ĂN%20NGAY/APP%20KIM%20THOA/APP%20CHUYEN%20GIA%20TIN%20HOC/tinhocedu/src/components/AuthorProfile.tsx)
Tạo trang Tác giả đẹp với:
- Avatar tròn với border gradient
- Thông tin: Tên, Trường, Địa chỉ
- Logo trường/cá nhân
- Thiết kế premium glassmorphism, gradient background

#### [MODIFY] [Sidebar.tsx](file:///d:/000000000000000000%20KHÓA%20MỘT%20PHÁT%20ĂN%20NGAY/APP%20KIM%20THOA/APP%20CHUYEN%20GIA%20TIN%20HOC/tinhocedu/src/components/Sidebar.tsx)
Thêm mục "Tác giả" (icon `User`) vào navItems

#### [MODIFY] [App.tsx](file:///d:/000000000000000000%20KHÓA%20MỘT%20PHÁT%20ĂN%20NGAY/APP%20KIM%20THOA/APP%20CHUYEN%20GIA%20TIN%20HOC/tinhocedu/src/App.tsx)
- Import `AuthorProfile`
- Thêm case `'author'` trong [renderContent()](file:///d:/000000000000000000%20KH%C3%93A%20M%E1%BB%98T%20PH%C3%81T%20%C4%82N%20NGAY/APP%20KIM%20THOA/APP%20CHUYEN%20GIA%20TIN%20HOC/tinhocedu/src/App.tsx#30-56)

---

### 2. Màn Hình Đăng Nhập

#### [NEW] [LoginScreen.tsx](file:///d:/000000000000000000%20KHÓA%20MỘT%20PHÁT%20ĂN%20NGAY/APP%20KIM%20THOA/APP%20CHUYEN%20GIA%20TIN%20HOC/tinhocedu/src/components/LoginScreen.tsx)
Màn hình đăng nhập premium với:
- Logo app (logo.jpg)
- Form đăng nhập (username + password)
- Animation, gradient background
- Hardcoded credentials: `Trần Thị Kim Thoa` / `12345`
- Lưu trạng thái đăng nhập vào `localStorage`

#### [MODIFY] [App.tsx](file:///d:/000000000000000000%20KHÓA%20MỘT%20PHÁT%20ĂN%20NGAY/APP%20KIM%20THOA/APP%20CHUYEN%20GIA%20TIN%20HOC/tinhocedu/src/App.tsx)
- Import `LoginScreen`
- Thêm state `isLoggedIn` (check localStorage)
- Nếu chưa đăng nhập → render `LoginScreen`
- Nếu đã đăng nhập → render app bình thường

---

### 3. Cập Nhật File Báo Cáo DOCX

> [!IMPORTANT]
> File DOCX là file nhị phân, không thể chỉnh sửa trực tiếp bằng code editor. Tôi sẽ **bỏ qua lệnh 3** vì cần công cụ DOCX chuyên dụng và cần biết chi tiết tính năng để viết nội dung phù hợp. Nếu cần, tôi có thể tạo một script Node.js sử dụng thư viện docx để tạo lại file này.

---

## Verification Plan

### Automated
- `npm run build` để kiểm tra không lỗi TypeScript

### Manual
1. Chạy `npm run dev` → mở trình duyệt
2. **Đăng nhập**: Kiểm tra form đăng nhập hiển thị → nhập sai → báo lỗi → nhập đúng (Trần Thị Kim Thoa / 12345) → vào app
3. **Tác giả**: Click menu "Tác giả" → kiểm tra trang hiển thị avatar, tên, trường, địa chỉ, logo
4. **Đăng xuất**: Refresh trang → vẫn giữ trạng thái đăng nhập (localStorage)
