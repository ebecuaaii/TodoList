# TodoWork Frontend - Modern Task Manager

Đây là phần Frontend client của ứng dụng Quản lý công việc (Todo List) được xây dựng bằng **React + Vite** kết hợp kiến trúc **Hybrid TypeScript** và phong cách thiết kế **Frosted Glass (Glassmorphism)** hiện đại.

---

## 🛠 Công nghệ sử dụng
* **React 19**
* **Vite** (Bộ đóng gói & máy chủ phát triển siêu tốc)
* **TypeScript (Hybrid)** (Định kiểu an toàn cho API Services, Custom Hooks & Interfaces)
* **Axios** (Thư viện gọi HTTP Client kết nối API)
* **CSS Vanilla** (Styling tùy chỉnh chi tiết, có hiệu ứng chuyển động mượt mà)

---

## ✨ Các tính năng nổi bật
1. **Giao diện Frosted Glass sang trọng**: Hỗ trợ chế độ Sáng/Tối (Light/Dark Mode) có lưu lựa chọn vào `localStorage`.
2. **Gộp cột thông minh (Centered FAB Layout)**: Giao diện chính tinh gọn, ẩn form tạo và chuyển thành nút nổi `+` ở góc dưới màn hình.
3. **Bộ Lọc & Tìm Kiếm**: Lọc nhanh theo bộ lọc (Tất cả, Đang làm, Hoàn thành) và thanh tìm kiếm có biểu tượng đẹp mắt.
4. **Lịch biểu tháng cao cấp (Calendar Modal)**:
   * Xem tổng quan lịch trình của cả tháng.
   * Đánh dấu ngày có công việc bằng các chấm chỉ báo màu cam (Đang làm) và xanh lá (Đã hoàn thành).
   * Xem và thao tác nhanh (xóa, toggle hoàn thành) danh sách nhiệm vụ của ngày được chọn.
5. **Cấu trúc Custom Hooks**: Logic xử lý giao diện được tách biệt hoàn toàn khỏi tầng hiển thị (View) thông qua các hooks chuyên biệt:
   * [useTheme.tsx](file:///src/hooks/useTheme.ts)
   * [useTasks.tsx](file:///src/hooks/useTasks.ts)

---

## 🚀 Hướng dẫn chạy dự án cục bộ (Local)

### 1. Chuẩn bị môi trường
* Đảm bảo bạn đã cài đặt **Node.js** phiên bản v18 trở lên trên máy.

### 2. Cài đặt thư viện
Mở Terminal tại thư mục `todolist-FE` và cài đặt các dependencies:
```bash
npm install
```

### 3. Khởi chạy dự án (Development Mode)
```bash
npm run dev
```
Mặc định ứng dụng sẽ khởi động tại địa chỉ: `http://localhost:5173` (hoặc `http://localhost:5174`).

---

## 📦 Đóng gói & Deploy lên Vercel/Netlify

### 1. Đóng gói Production
```bash
npm run build
```
Thư mục xuất bản sau khi biên dịch thành công là `/dist`.

### 2. Deploy lên Vercel
Dự án đã có cấu hình sẵn tệp [vercel.json](file:///vercel.json) để tránh lỗi định tuyến 404 khi tải lại trang con trên host Vercel. 
Khi cấu hình import dự án trên trang quản lý của Vercel:
* **Framework Preset**: Chọn `Vite`
* **Root Directory**: Để `./` (nếu deploy từ nhánh `FE` độc lập)
* **Build Command**: `npm run build`
* **Output Directory**: `dist`
