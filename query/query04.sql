-- cau1: lấy danh sách khóa học mà user có id = 1 đã mua
-- yêu cầu: trả về thông tin khóa học, tên và email của user
SELECT courses.name, users.name, users.email
FROM courses
FULL JOIN users_courses
ON courses.id = users_courses.courses_id
FULL JOIN users
ON users.id = users_courses.user_id
WHERE users.id = 1;

SELECT courses.name, courses.price, users.name, users.email
FROM courses
FULL JOIN users_courses
ON courses.id = users_courses.courses_id
FULL JOIN users
ON users.id = users_courses.user_id
FULL JOIN phones
ON users.id = phones.user_id
WHERE phones.phone = '0869988899'
ORDER BY courses.price DESC, courses.id ASC;
-- nếu có 1 khóa học cùng giá tiền, sẽ sắp xếp theo id tăng dần

-- Câu 2: Thêm 1 cột 'discount' bằng câu lệnh truy vấn, theo điều khiện sau:
-- giá >= 200.000 -> 10%, ngược lại: 0
SELECT courses.*, users.name, users.email,
CASE
	WHEN courses.price >= 200000 THEN '10%'
	ELSE '0'
END AS discount
FROM courses
FULL JOIN users_courses
ON courses.id = users_courses.courses_id
FULL JOIN users
ON users.id = users_courses.user_id
WHERE users.id = 1;

-- Câu 3: Thêm 1 cột 'sale_pricec' tính giá phải thanh toán khi đã trừ discount
SELECT courses.name, courses.price, users.name, users.email,
CASE
	WHEN courses.price >= 200000 THEN courses.price * 0.9
	ELSE courses.price
END AS sale_price
FROM courses
FULL JOIN users_courses
ON courses.id = users_courses.courses_id
FULL JOIN users
ON users.id = users_courses.user_id
WHERE users.id = 1;

-- kết hợp bài 2 và 3:
SELECT courses.name, courses.price, users.name, users.email,
CASE
	WHEN courses.price >= 200000 THEN '10%'
	ELSE '0'
END AS discount,
(courses.price - courses.price * (CASE
	WHEN courses.price >= 200000 THEN 10
	ELSE 0
END)/100) AS sale_price
FROM courses
FULL JOIN users_courses
ON courses.id = users_courses.courses_id
FULL JOIN users
ON users.id = users_courses.user_id
WHERE users.id = 2
ORDER BY courses.price DESC
-- trả về 1 bản ghi
LIMIT 1
-- bỏ 1 bản ghi đầu tiên
OFFSET 1;

-- chuyển số trang thành OFFSET:
-- offset = (page - 1) * limit





