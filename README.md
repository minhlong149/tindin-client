# TindIn Job Board

Một trang web giúp tìm kiếm cơ hội việc làm và ứng viên tiềm năng phù hợp với công việc, xây dựng bằng `React.js` và `Material UI` để gửi các yêu cầu đến [máy chủ Spring Boot](https://github.com/minhlong149/tindin-server) thông qua các REST API để truy vấn dữ liệu từ cơ sở dữ liệu `PostgreSQL`. *Đây là đồ án môn học Công nghệ Java của nhóm sinh viên trường Đại học Công nghệ Thông tin - ĐHQG TP.HCM.*

- [TindIn Job Board](#tindin-job-board)
  - [Yêu cầu chức năng](#yêu-cầu-chức-năng)
  - [Thiết kế màn hình](#thiết-kế-màn-hình)
  - [Hướng dẫn cài đặt](#hướng-dẫn-cài-đặt)
  - [Tác giả](#tác-giả)

## Yêu cầu chức năng

- Người dùng có thể **đăng nhập** vào tài khoản của mình và **cập nhập hồ sơ** cá nhân.
- Nhà tuyển dụng có thể **đăng tải tin tuyển dụng** và xem danh sách các ứng viên ứng tuyển.
- Ứng viên có thể thể **tìm kiếm công việc** phù hợp với mình và ứng tuyển vào các công việc đó.
- *Gợi ý ứng viên phù hợp với công việc và công việc phù hợp với ứng viên.*

## Thiết kế màn hình

- Từ màn hình đăng nhập, người dùng có thể chuyển đến màn hình hiển thị danh sách các công việc (nếu là ứng viên) hoặc màn hình các ứng viên (nếu là nhà tuyển dụng) sau khi đăng nhập thành công, hoặc chuyển đến màn hình chỉnh sửa thông tin cá nhân.

| Nhà tuyển dụng | Ứng viên |
|----------------|----------|
| Quản lý các tin tuyển dụng. Xem các ứng viên ứng tuyển hoặc được gợi ý | Xem, tìm kiếm hoặc ứng tuyển vào các vị trí. Xem thông tin chi tiết của công việc và doanh nghiệp tuyển dụng.
| Tìm kiếm ứng viên theo tên hoặc kỹ năng, và xem thông tin chi tiết của ứng viên | Xem lại các công việc đã ứng tuyển |
| Chỉnh sửa thông tin cá nhân và công ty | Chỉnh sửa thông tin cá nhân |

## Hướng dẫn cài đặt

- Cài đặt các gói package bằng lệnh `npm install`, sau đó khởi chạy bằng lệnh `npm start`.

> Dùng lệnh `npm run build` để xây dựng trang web tĩnh.

## Tác giả

- [Nguyễn Đào Minh Long](https://github.com/minhlong149) - Trang hồ sơ và danh sách ứng viên ứng tuyển công việc
- [Trần Trọng Nguyên](https://github.com/Norman-Tran) - Trang đăng nhập và tìm kiếm công việc.
- [Quách Kiều Oanh](https://github.com/Qanh195) - Trang tìm kiếm và hiển thị danh sách công việc của ứng viên
- [Mai Ngọc Bích](https://github.com/bichmn) - Trang quản lý tin tuyển dụng.
