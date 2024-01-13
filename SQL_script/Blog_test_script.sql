---------- SELECT ----------
-- 1. 공개된 모든 게시물 조회 - 모든 공개 게시물(status가 'public'인 게시물)과 해당 게시물의 제목, 내용, 조회수를 조회합니다.
SELECT *
  FROM POSTS
 WHERE status = 'public';

-- 2. 특정 사용자의 게시물 조회 - 작성한 모든 게시물의 제목과 생성 날짜를 조회합니다. 
SELECT title
	  , created_at
  FROM POSTS
 WHERE user_id = '1';

-- 3. 가장 많이 조회된 상위 5개 게시물 조회 - 조회수가 가장 높은 상위 5개 게시물의 제목과 조회수를 조회합니다.
SELECT title, view_count
  FROM (
  			SELECT title
  				  , view_count
  			   FROM POSTS
  		   ORDER BY view_count DESC
  )
 WHERE ROWNUM <= 5;
 
-- 4. 특정 카테고리에 속하는 게시물 조회 - 특정 카테고리에 속하는 모든 게시물을 조회합니다.
	 SELECT PC.category_id
	 	   , P.*
	   FROM POSTCATEGORIES	PC
INNER JOIN POSTS	P
		 ON PC.POST_ID 		= P.POST_ID
	  WHERE PC.CATEGORY_ID	= 5;
	 
-- 5. 각 사용자별 게시물 수 조회 - 사용자별로 작성한 게시물 수를 조회합니다.
	SELECT user_id
		 , count(post_id)	post_count
	  FROM POSTS
  GROUP BY user_id
  ORDER BY user_id;

-- 6. 특정 게시물에 대한 모든 댓글 조회 - 특정 게시물에 달린 모든 댓글을 조회합니다.
	SELECT C.*
	  FROM COMMENTS		C
LEFT JOIN COMMENTS 		CM
		ON C.parent_comment_id		= CM.comment_id
	 WHERE C.post_id	= 5;
	
-- 7. 특정 사용자의 최근 게시물 조회 - 특정 사용자가 최근에 작성한 게시물 3개와 그 게시물의 제목, 내용, 작성 시간을 조회합니다.
SELECT title, content, created_at
  FROM (
  			SELECT title
  				  , content
  				  , created_at
  			   FROM POSTS
  			  WHERE user_id		= 1
  		   ORDER BY created_at	DESC
  )
  WHERE ROWNUM <= 3;
 
-- 8. 각 게시물별 댓글 수 조회 - 모든 게시물과 해당 게시물에 달린 댓글의 수를 조회합니다.
	SELECT P.post_id
		  , P.title
		  , count(C.comment_id)		comment_count
	  FROM POSTS		P
 LEFT JOIN COMMENTS		C
 		 ON P.post_id	= C.post_id
  GROUP BY P.post_id
  		  , P.title
  ORDER BY P.post_id;
 
-- 9. 특정 카테고리의 게시물 중 가장 많이 조회된 게시물 - 특정 카테고리에 속하는 게시물 중 가장 많이 조회된 게시물의 제목과 조회수를 조회합니다.
SELECT title, view_count
  FROM (
  			SELECT P.title
  				  , P.view_count
  			  FROM POSTS			P
  	    INNER JOIN POSTCATEGORIES	PC
  	    		ON P.post_id		= PC.post_id
  	      	 WHERE PC.category_id	= 5
  	      ORDER BY P.view_count DESC 
  )
  WHERE ROWNUM = 1;

-- 10. 특정 기간 동안 작성된 게시물 조회 - 지난 한 달 동안 작성된 모든 게시물의 제목과 작성 시간을 조회합니다.
SELECT title
	 , created_at
  FROM POSTS
 WHERE created_at <= ADD_MONTHS(SYSDATE, -1);



---------- UPDATE ----------
-- 1. 특정 게시물의 조회수 증가 - 특정 게시물의 조회수를 1 증가시킵니다.
UPDATE POSTS
   SET view_count = 3
   	 , updated_at	= SYSDATE
 WHERE post_id = 8;

-- 2. 특정 카테고리의 모든 게시물 상태 변경 - '공지사항' 카테고리에 속한 모든 게시물을 '공개(public)' 상태로 변경합니다.
UPDATE POSTS
   SET status		= 'public'
   	 , updated_at	= SYSDATE
 WHERE post_id	IN (SELECT P.post_id
 					  FROM POSTS 			P
				INNER JOIN POSTCATEGORIES	PC
					     ON P.post_id		= PC.post_id
			    INNER JOIN CATEGORIES 		C
					     ON PC.category_id	= C.category_id
					  WHERE C.name			= '공지사항');

-- 3. 사용자의 마지막 로그인 시간 업데이트 - 특정 사용자의 마지막 로그인 시간을 현재 시간으로 업데이트합니다.
UPDATE USERPROFILE
   SET last_login	= SYSDATE
 WHERE user_id		= 3;

-- 4. 게시물의 상태에 따른 카테고리 변경  - draft 상태의 게시물전체를 '임시 저장' 카테고리로 이동합니다.
UPDATE POSTCATEGORIES
   SET category_id		= (SELECT category_id
   							 FROM CATEGORIES
   						    WHERE name = '임시저장')
 WHERE post_id IN (
 	SELECT post_id
 	  FROM POSTS
 	 WHERE status = 'draft'
 );



---------- DELETE ----------
-- 1. 특정 사용자의 모든 게시물 삭제
DELETE
  FROM POSTS
 WHERE user_id = 4;

-- 2. 특정 기간 동안 활동하지 않은 사용자 삭제
DELETE
  FROM USERPROFILE
 WHERE last_login <= ADD_MONTHS(SYSDATE, -1)
  	OR last_login IS NULL;

-- 3. 특정 카테고리에 속한 게시물 삭제
DELETE POSTS
 WHERE post_id IN (SELECT post_id
 					  FROM POSTCATEGORIES
 					 WHERE category_id	= 10);
 					
-- 4. 댓글이 없는 게시물 삭제
DELETE 
  FROM POSTS	P
 WHERE NOT EXISTS (
 	SELECT 1
 	  FROM COMMENTS				C
 	 WHERE P.post_id			= C.post_id
 	   AND C.parent_comment_id	IS NULL
 );

-- 5. 오래된 댓글 삭제 - 특정 기간 이전에 작성된 모든 댓글을 삭제합니다.
DELETE
  FROM COMMENTS
 WHERE created_at < ADD_MONTHS(SYSDATE, -1);

-- 6. 특정 상태의 게시물 삭제 - 비공개(private)' 상태인 게시물을 삭제합니다.
DELETE
  FROM POSTS
 WHERE status = 'private';
 
-- 7. 특정 사용자가 작성한 댓글 삭제
DELETE
  FROM COMMENTS
 WHERE user_id = 6;
 
-- 8. 조회수가 낮은 게시물 삭제 – 조회수가 10 미만인 게시물 전체를 삭제합니다.
DELETE
  FROM POSTS
 WHERE view_count < 10;
 
-- 9. 특정 날짜 이전에 작성된 게시물과 그 댓글 삭제
DELETE
  FROM POSTS
 WHERE created_at < TO_DATE('2024-01-01', 'YYYY-MM-DD');

-- 10. 특정 카테고리의 게시물과 댓글 삭제
DELETE POSTS
 WHERE post_id IN (SELECT post_id
 					  FROM POSTCATEGORIES
 					 WHERE category_id	= 5);

