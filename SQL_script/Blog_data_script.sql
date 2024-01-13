-- 카테고리 데이터
INSERT INTO Categories (name) VALUES ('C#');
INSERT INTO Categories (name) VALUES ('JAVA');
INSERT INTO Categories (name) VALUES ('PYTHON');
INSERT INTO Categories (name) VALUES ('SQL');
INSERT INTO Categories (name) VALUES ('CS');
INSERT INTO Categories (name) VALUES ('취업');
INSERT INTO Categories (name) VALUES ('취미');
INSERT INTO Categories (name) VALUES ('주식');
INSERT INTO Categories (name) VALUES ('공지사항');
INSERT INTO Categories (name) VALUES ('임시저장');


-- 사용자 프로필 데이터
INSERT INTO UserProfile (biography, last_login) VALUES ('안녕하세요~ A 입니다~', SYSDATE - 3);
INSERT INTO UserProfile (biography, profile_pic, last_login) VALUES ('안녕하세요~ B 입니다~', 'profileB.jpg', SYSDATE - 2);
INSERT INTO UserProfile (biography, last_login) VALUES ('안녕하세요~ C 입니다~', SYSDATE - 1);
INSERT INTO UserProfile (biography, profile_pic, last_login) VALUES ('안녕하세요~ D 입니다~', 'profileD.jpg', SYSDATE - 1);
INSERT INTO UserProfile (biography, last_login) VALUES ('안녕하세요~ E 입니다~', SYSDATE - 4);
INSERT INTO UserProfile (biography, last_login) VALUES ('안녕하세요~ F 입니다~', SYSDATE - 5);
INSERT INTO UserProfile (biography, profile_pic, last_login) VALUES ('안녕하세요~ G 입니다~', 'profileG.jpg', SYSDATE - 7);
INSERT INTO UserProfile (biography, last_login) VALUES ('안녕하세요~ H 입니다~', SYSDATE - 6);
INSERT INTO UserProfile (biography, profile_pic) VALUES ('안녕하세요~ I 입니다~', 'profileI.jpg');
INSERT INTO UserProfile (biography, last_login) VALUES ('안녕하세요~ J 입니다~', SYSDATE);


-- 게시물 데이터
INSERT INTO Posts (user_id, title, content, status, view_count, created_at) VALUES (1, 'C# 기초 배우기', 'C# 프로그래밍 언어에 대한 기초적인 내용입니다', 'private', 2, SYSDATE);
INSERT INTO Posts (user_id, title, content, status, created_at) VALUES (2, 'JAVA의 고급 기법', 'JAVA 언어의 고급 기법과 팁을 공유합니다', 'public', SYSDATE);
INSERT INTO Posts (user_id, title, content, status, view_count, created_at) VALUES (3, 'PYTHON 프로젝트 시작하기', 'Python을 사용한 흥미로운 프로젝트 아이디어', 'draft', 10, SYSDATE);
INSERT INTO Posts (user_id, title, content, status, view_count, created_at) VALUES (4, 'SQL 기본 명령어', 'SQL을 처음 배우는 사람들을 위한 기본 명령어 안내', 'private', 15, ADD_MONTHS(SYSDATE, -1));
INSERT INTO Posts (user_id, title, content, status, view_count, created_at) VALUES (5, '컴퓨터 과학의 기초', '컴퓨터 과학의 기본 개념에 대해 알아봅니다', 'public', 12, SYSDATE);
INSERT INTO Posts (user_id, title, content, status, created_at) VALUES (1, '시스템 프로그래밍', '시스템 프로그래밍이란?', 'public', ADD_MONTHS(SYSDATE, -1));
INSERT INTO Posts (user_id, title, content, status, view_count, created_at) VALUES (1, '취미로 시작하는 프로그래밍', '프로그래밍을 취미로 시작하는 방법에 대한 가이드', 'public', 5, SYSDATE);
INSERT INTO Posts (user_id, title, content, status, created_at) VALUES (3, '주식 투자 기초', '주식 시장에 처음 발을 들이는 사람들을 위한 기초 지식', 'private', SYSDATE);
INSERT INTO Posts (user_id, title, content, status, view_count, created_at) VALUES (2, '공지사항', '공지사항입니다', 'private', 3, ADD_MONTHS(SYSDATE, -1));
INSERT INTO Posts (user_id, title, content, status, created_at) VALUES (1, '자기계발을 위한 독서 목록', '성장과 발전을 위한 추천 도서 목록', 'draft', SYSDATE);


-- 댓글 데이터
INSERT INTO Comments (post_id, user_id, comments, created_at) VALUES (1, 2, 'C#에 대한 좋은 글 감사합니다!', SYSDATE);
INSERT INTO Comments (post_id, user_id, comments, created_at) VALUES (2, 3, 'JAVA 기법에 대한 흥미로운 정보네요!', SYSDATE);
INSERT INTO Comments (post_id, user_id, comments, created_at) VALUES (3, 4, 'Python 프로젝트에 대해 더 알고 싶어요!', SYSDATE);
INSERT INTO Comments (post_id, user_id, comments, created_at) VALUES (4, 5, 'SQL 기초에 대한 좋은 정보 감사합니다!', SYSDATE);
INSERT INTO Comments (post_id, user_id, comments, created_at) VALUES (5, 6, '컴퓨터 과학 기초에 대한 설명이 잘 되어 있네요!', SYSDATE);
INSERT INTO Comments (post_id, user_id, parent_comment_id, comments, created_at) VALUES (2, 5, 2, 'JAVA에 관한 토론이 정말 흥미로워요!', SYSDATE);
INSERT INTO Comments (post_id, user_id, parent_comment_id, comments, created_at) VALUES (2, 6, 2, '이 글이 JAVA를 더 잘 이해하는 데 도움이 됐어요.', SYSDATE);
INSERT INTO Comments (post_id, user_id, parent_comment_id, comments, created_at) VALUES (4, 7, 4, 'SQL에 대한 좋은 정보 감사합니다. 많은 도움이 되었어요!', SYSDATE);
INSERT INTO Comments (post_id, user_id, parent_comment_id, comments, created_at) VALUES (5, 8, 5, '컴퓨터 과학은 정말 흥미로운 주제네요.', ADD_MONTHS(SYSDATE, -2));
INSERT INTO Comments (post_id, user_id, parent_comment_id, comments, created_at) VALUES (5, 9, 5, '이 글을 통해 많은 것을 배울 수 있었습니다. 감사합니다!', SYSDATE);


-- 카테고리-게시물 데이터
INSERT INTO PostCategories (category_id, post_id) VALUES (1, 1); 
INSERT INTO PostCategories (category_id, post_id) VALUES (2, 2);  
INSERT INTO PostCategories (category_id, post_id) VALUES (3, 3);
INSERT INTO PostCategories (category_id, post_id) VALUES (4, 4); 
INSERT INTO PostCategories (category_id, post_id) VALUES (5, 5); 
INSERT INTO PostCategories (category_id, post_id) VALUES (5, 6);
INSERT INTO PostCategories (category_id, post_id) VALUES (7, 7); 
INSERT INTO PostCategories (category_id, post_id) VALUES (8, 8); 
INSERT INTO PostCategories (category_id, post_id) VALUES (9, 9); 
INSERT INTO PostCategories (category_id, post_id) VALUES (10, 10);
