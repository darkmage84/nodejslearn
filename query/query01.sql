-- This is comment in SQL

-- 1. add data
INSERT INTO users(id,name,email,password,status,created_at,updated_at)
VALUES(1,'user 1','user1@gmail.com', '123456', true, NOW(), NOW());

INSERT INTO users(id,name,email,password,status,created_at,updated_at)
VALUES(2,'user 2','user2@gmail.com', '123456', true, NOW(), NOW());

INSERT INTO users(id,name,email,password,status,created_at,updated_at)
VALUES(3,'user 3','user3@gmail.com', '123456', true, NOW(), NOW());

INSERT INTO users(id,name,email,password,status,created_at,updated_at)
VALUES(4,'user 4','user4@gmail.com', '123456', true, NOW(), NOW());

INSERT INTO users(id,name,email,password,status,created_at,updated_at)
VALUES(5,'user 5','user5@gmail.com', '123456', true, NOW(), NOW());

-- 2. update users
UPDATE users SET name = 'user1', email='user1@gmail.com', status=false, updated_at=NOW()
WHERE id=1;

-- 3. delete users
DELETE FROM users WHERE id=2;

-- 4. show detail
-- SELECT * from users WHERE id>=2 AND id<=4;
-- SELECT * from users WHERE id IN(1,4,6);
-- SELECT * from users WHERE id NOT BETWEEN 1 AND 3;
 UPDATE users SET updated_at=null WHERE id=1;
 UPDATE users SET updated_at=null WHERE id=3;
 
 SELECT * from users WHERE updated_at IS NOT null;



