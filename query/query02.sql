-- Ràng buộc (Constraint)

-- 1. NOT NULL
INSERT INTO users(id,name,email,password) 
VALUES(6,'user6','user6@gmail.com','123456');

-- 2. DEFAULT
INSERT INTO users(id,name,email,password) 
VALUES(7,'user7','user7@gmail.com','123456');

-- 3. UNIQUE

-- 4. IDENTITY
INSERT INTO users(name,email,password)
VALUES('user1', 'user1@gmail.com', '123456');

INSERT INTO users(name,email,password)
VALUES('user2', 'user2@gmail.com', '123456');

INSERT INTO users(name,email,password)
VALUES('user3', 'user3@gmail.com', '123456');

