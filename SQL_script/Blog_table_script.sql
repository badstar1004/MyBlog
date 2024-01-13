-- 사용자 프로필 테이블
CREATE TABLE UserProfile (
	user_id				INT				GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
	biography			CLOB			NULL,
	profile_pic			VARCHAR2(255)	NULL,
	last_login			TIMESTAMP		NULL
);


-- 게시물 테이블
CREATE TABLE Posts (
	post_id				INT				GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
	user_id				INT				REFERENCES UserProfile(user_id) ON DELETE CASCADE,
	title				VARCHAR2(255)	NOT NULL,
	content				CLOB			NULL,
	status				VARCHAR2(50)	NOT NULL CHECK (status IN ('public', 'private', 'draft')),
	view_count			INT				DEFAULT 0	NOT NULL,
	created_at			TIMESTAMP		NOT NULL,
	updated_at			TIMESTAMP		NULL
);


-- 댓글 테이블
CREATE TABLE Comments (
	comment_id			INT				GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
	post_id				INT				REFERENCES Posts(post_id) ON DELETE CASCADE,
	user_id				INT				REFERENCES UserProfile(user_id) ON DELETE CASCADE,
	parent_comment_id	INT				NULL,
	comments			CLOB			NOT NULL,
	created_at			TIMESTAMP		NOT NULL
);
-- 자기 참조 외래키 제약 조건
ALTER TABLE Comments ADD CONSTRAINT fk_parent_comment_id
FOREIGN KEY (parent_comment_id) REFERENCES Comments(comment_id)
ON DELETE SET NULL;


-- 카테고리 테이블
CREATE TABLE Categories (
	category_id			INT				GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
	name				VARCHAR2(100)	NOT NULL
);


-- 카테고리-게시물 테이블
CREATE TABLE PostCategories (
	category_id			INT				REFERENCES Categories(category_id) ON DELETE CASCADE,
	post_id				INT				REFERENCES Posts(post_id) ON DELETE CASCADE
);
