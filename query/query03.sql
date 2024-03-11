SELECT users.*, groups.name AS group_name 
FROM users
INNER JOIN groups
ON users.group_id = groups.id;

SELECT * 
FROM users
LEFT JOIN groups
ON users.group_id = groups.id;

SELECT * 
FROM users
RIGHT JOIN groups
ON users.group_id = groups.id;

-- bai tap: viết câu lệnh truy vấn lấy ra danh sách users và tên group theo điều kiện sau:
-- tên group có chứa từ khóa "admin"
SELECT users.*, groups.name AS group_name 
FROM users
INNER JOIN groups
ON users.group_id = groups.id
WHERE LOWER(groups.name) LIKE '%admin%';