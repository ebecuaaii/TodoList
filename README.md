# TodoList Backend - API Service

Đây là phần Backend REST API của ứng dụng Quản lý công việc (Todo List) được xây dựng bằng **Spring Boot** và **PostgreSQL**. Dự án hỗ trợ đầy đủ các thao tác CRUD, tìm kiếm, lọc theo trạng thái và phân trang.

---

## 🛠 Công nghệ sử dụng
* **Java 21** 
* **Spring Boot 4.1.0** (Spring Web MVC, Spring Data JPA, Validation, Security)
* **PostgreSQL** (Hệ quản trị cơ sở dữ liệu)
* **Lombok** (Giảm thiểu mã boilerplate)
* **Spring Dotenv** (Quản lý biến môi trường bảo mật qua `.env`)

---

## 📁 Cấu trúc thư mục chính
```text
src/main/java/com/todolist/
├── config/        # Cấu hình CORS toàn cục (WebConfig.java)
├── controller/    # Tầng tiếp nhận API Requests (TaskController.java)
├── dto/           # Đối tượng chuyển dữ liệu & validation (TaskRequestDto.java)
├── entity/        # Định nghĩa bảng database (Task.java)
├── exception/     # Tự định nghĩa & xử lý lỗi toàn cục (GlobalExceptionHandler.java)
├── repository/    # Giao tiếp cơ sở dữ liệu (TaskRepository.java)
└── service/       # Tầng xử lý logic nghiệp vụ (TaskService.java & TaskServiceImpl.java)
```

---

## 🚀 Hướng dẫn chạy dự án cục bộ (Local)

### 1. Chuẩn bị môi trường
* Đảm bảo bạn đã cài đặt **JDK 21 trở lên** (khuyên dùng JDK 21 hoặc 25).
* Có cơ sở dữ liệu PostgreSQL (chạy cục bộ hoặc online trên Railway/Supabase).

### 2. Cấu hình biến môi trường
Tạo file `.env` ở thư mục gốc của dự án (`d:\todolist-BE\todolist-BE\.env`) với nội dung như sau:
```env
DB_URL=jdbc:postgresql://<host>:<port>/<db_name>
DB_USERNAME=<username>
DB_PASSWORD=<password>
```

### 3. Khởi chạy dự án
Mở Terminal tại thư mục gốc và chạy lệnh:
* **Trên Windows (PowerShell)**:
  ```powershell
  .\mvnw spring-boot:run
  ```
* **Trên Windows (Command Prompt)**:
  ```cmd
  mvnw spring-boot:run
  ```
* **Trên macOS / Linux**:
  ```bash
  ./mvnw spring-boot:run
  ```

Mặc định ứng dụng sẽ chạy tại cổng: `http://localhost:8080`

---

## 🔌 API Documentation

Bảng mô tả các Endpoint API (`/api/tasks`):

| HTTP Method | Endpoint | Tham số query (Optional) | Mô tả |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/tasks` | `search`, `completed`, `page`, `size`, `sortBy`, `direction` | Lấy danh sách task (có lọc, tìm kiếm & phân trang) |
| **GET** | `/api/tasks/{id}` | Không | Xem chi tiết 1 task |
| **POST** | `/api/tasks` | Không (Yêu cầu JSON Body) | Thêm mới 1 task |
| **PUT** | `/api/tasks/{id}` | Không (Yêu cầu JSON Body) | Chỉnh sửa nội dung task |
| **PATCH** | `/api/tasks/{id}/toggle` | Không | Bật/tắt trạng thái hoàn thành |
| **DELETE** | `/api/tasks/{id}` | Không | Xóa task |

### Ví dụ JSON Body khi tạo mới/cập nhật Task (`POST` / `PUT`):
```json
{
  "title": "Học Spring Boot",
  "description": "Hoàn thành phần cấu hình biến môi trường .env",
  "completed": false
}
```

---

