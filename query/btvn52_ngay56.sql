-- create database
CREATE DATABASE databse_01_buiquangbinh;

-- create table courses
CREATE TABLE IF NOT EXISTS courses;
CREATE TABLE courses(
	id serial NOT NULL,
	name varchar(50) NOT NULL,
	price money,
	detail text,
	teacher_id int NOT NULL,
	active int,
	created_at TIMESTAMP with TIME ZONE,
	updated_at TIMESTAMP with TIME ZONE
);
ALTER TABLE courses
ALTER COLUMN price TYPE float USING price::numeric::float8;

-- add column description after column detail
ALTER TABLE courses 
ADD COLUMN description text;

-- rename detail --> content, add constraint NOT NULL
ALTER TABLE courses 
RENAME COLUMN detail TO content;
-- add constraint NOT NULL 
ALTER TABLE courses 
ALTER COLUMN content SET NOT NULL;

-- create table teacher
CREATE TABLE IF NOT EXISTS teacher;
CREATE TABLE teacher(
	id serial NOT NULL,
	name varchar() NOT NULL,
	bio text,
	created_at TIMESTAMP with TIME ZONE,
	updated_at TIMESTAMP with TIME ZONE
);

-- add 3 teachers
INSERT INTO teacher(name, bio)
VALUES
('teacher1', 'Teacher at F8'),
('teacher2', 'Teacher at F88'),
('teacher3', 'Teacher at F888');

-- add courses, 1 teacher 3 courses
INSERT INTO courses(name,price,content,teacher_id,active,description)
VALUES
('Course 1.1', 100, 'Content course 1.1', 1, 0, 'Description 1.1'),
('Course 1.2', 101, 'Content course 1.2', 1, 0, 'Description 1.2'),
('Course 1.3', 103, 'Content course 1.3', 1, 0, 'Description 1.3');

INSERT INTO courses(name,price,content,teacher_id,active,description)
VALUES
('Course 2.1', 200, 'Content course 2.1', 2, 0, 'Description 2.1'),
('Course 2.2', 201, 'Content course 2.2', 2, 0, 'Description 2.2'),
('Course 2.3', 203, 'Content course 2.3', 2, 0, 'Description 2.3');

INSERT INTO courses(name,price,content,teacher_id,active,description)
VALUES
('Course 3.1', 300, 'Content course 3.1', 3, 0, 'Description 3.1'),
('Course 3.2', 301, 'Content course 3.2', 3, 0, 'Description 3.2'),
('Course 3.3', 303, 'Content course 3.3', 3, 0, 'Description 3.3');

-- rename course and update price
UPDATE courses
SET name='New Course 1.1', price=101.5, updated_at=now()
WHERE id=1;

-- update bio for teacher
UPDATE teacher
SET bio='New bio 1', updated_at=now()
WHERE id=1;

-- show teachers list n courses list
SELECT * from teacher;
SELECT * from courses;