# Hướng Dẫn Build và Cài Đặt Extension

## 🚀 Bước 1: Giải nén và Cài đặt Dependencies

```bash
# Giải nén project
tar -xzf extension-customize-page.tar.gz
cd extension-customize-page

# Cài đặt dependencies
npm install
```

## 🔨 Bước 2: Build Extension

```bash
# Build một lần
npm run build

# Hoặc watch mode để tự động build khi có thay đổi
npm run watch
```

Sau khi build xong, các file sẽ được tạo trong thư mục `extension/dist/`

## 🎨 Bước 3: Tạo Icons (Tùy chọn)

Nếu có ImageMagick:
```bash
cd extension/public/icons
./create_icons.sh
```

Hoặc tạo icons thủ công với các kích thước:
- icon16.png (16x16 pixels)
- icon48.png (48x48 pixels)  
- icon128.png (128x128 pixels)

## 📦 Bước 4: Load Extension vào Chrome

1. Mở Chrome browser
2. Truy cập `chrome://extensions/`
3. Bật "Developer mode" (góc trên bên phải)
4. Click "Load unpacked"
5. Chọn thư mục `extension/dist/`
6. Extension đã được cài đặt!

## ✅ Bước 5: Test Extension

1. Click vào icon extension trên thanh công cụ Chrome
2. Toggle extension on/off
3. Truy cập bất kỳ trang web nào
4. Bạn sẽ thấy thông báo "Hello World" xuất hiện ở góc trên bên phải

## 🔧 Development Mode

### Xem Logs

- **Content Script logs**: Console của trang web
- **Background logs**: Chrome Extensions page > Inspect views: service worker
- **Popup logs**: Right-click popup > Inspect

### Reload sau khi thay đổi code

1. Chỉnh sửa code trong `extension/src/`
2. Chạy `npm run build`
3. Quay lại `chrome://extensions/`
4. Click nút "Reload" (icon mũi tên tròn) của extension
5. Refresh trang web để thấy thay đổi

## 📝 Cấu trúc Files sau Build

```
extension/dist/
├─ manifest.json         # Manifest file
├─ contentScript.js      # Content script
├─ serviceWorker.js      # Background service worker
├─ popup.html           # Popup HTML
├─ popup.js             # Popup logic
├─ popup.css            # Popup styles
├─ options.html         # Options HTML
├─ options.js           # Options logic
├─ options.css          # Options styles
└─ icons/               # Extension icons
   ├─ icon16.png
   ├─ icon48.png
   └─ icon128.png
```

## 🐛 Troubleshooting

### Lỗi "npm install" thất bại
```bash
# Xóa và cài lại
rm -rf node_modules package-lock.json
npm install
```

### Extension không hiển thị "Hello World"
1. Kiểm tra Console để xem errors
2. Đảm bảo extension được enable
3. Reload extension trong chrome://extensions/
4. Hard refresh trang web (Ctrl+Shift+R)

### Build errors
```bash
# Clean và rebuild
npm run clean
npm run build
```

## 🎯 Các Tính Năng Chính

### 1. Hello World Message
- Tự động hiển thị khi load trang
- Màu xanh lá, góc trên phải
- Tự động ẩn sau 3 giây

### 2. Popup
- Toggle extension on/off
- Mở trang Options
- Xem trạng thái hiện tại

### 3. Options Page
- Test "Hello World" message
- Quản lý style presets
- Cấu hình domain rules
- Reset settings

## 🔐 Permissions

Extension này chỉ yêu cầu:
- `storage`: Lưu settings
- `activeTab`: Tương tác với tab hiện tại

Không yêu cầu quyền truy cập đặc biệt nào!

## 📚 Tài liệu thêm

- `docs/architecture.md` - Kiến trúc hệ thống
- `docs/roadmap.md` - Kế hoạch phát triển
- `README.md` - Tổng quan project

## 💡 Tips

1. Sử dụng `npm run watch` khi develop để tự động build
2. Kiểm tra Console của cả Content Script và Background
3. Test trên nhiều trang web khác nhau
4. Đọc Chrome Extension docs để mở rộng tính năng

## 🎉 Hoàn thành!

Extension của bạn đã sẵn sàng sử dụng! Chúc bạn code vui vẻ! 🚀
