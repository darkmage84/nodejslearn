-- hàm tổng hợp: COUNT(), SUM(), AVG(), MAX(), MIN()
-- --> đi kèm với mệnh đề GROUP BY, HAVING
SELECT status, count(id)
FROM users
GROUP BY status
HAVING count(id) >= 2;

-- Câu 1: truy vấn trả về danh sách user và số lượng bài post
SELECT users.name as user_name, count(posts.user_id) as user_posts
FROM users
FULL JOIN posts
ON users.id = posts.user_id
GROUP BY users.name
ORDER BY users.name;

-- Câu 2: trả về thông tin user có tổng bài post lớn hơn bằng 2
SELECT users.name as user_name, count(posts.user_id) as user_posts
FROM users
LEFT JOIN posts
ON users.id = posts.user_id
GROUP BY users.name
HAVING count(posts.user_id) >= 2;

-- Câu 3: trả về thông tin user có số bài post lớn nhất
SELECT users.*, count(posts.user_id)
FROM users
LEFT JOIN posts
ON users.id = posts.user_id
GROUP BY users.id
HAVING count(posts.user_id) = (
	SELECT MAX(user_posts) 
	FROM (
		-- bảng tạm
		SELECT count(user_id) AS user_posts
		FROM posts
		GROUP BY user_id
	)
)
fetch first 1 row only; 





