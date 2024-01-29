import { useRouter } from 'next/router';
import { useEffect, userState, useState } from 'react';
import { Box } from '@mui/system';
import { Container, Grid, Typography, Card, CardMedia, CardContent, Chip, CardActionArea, ButtonGroup, Button } from '@mui/material';
import withLayout from './layout/withLayout';
import { postsService } from './../service/postService';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


function BlogHome() {

  const router = useRouter(); // useRouter 훅을 사용하여 router 객체를 생성합니다.
  const [posts, setPosts] = useState([]);  // 게시물 목록을 저장할 state
  const [sortCriteria, setSortCriteria] = useState({  // 조회 조건
    view_count: 'asc',
    created_at: 'asc',
    title: 'asc',
    page: 20,
    offset: 0
  });
  

  useEffect(() => {
    const fetchSortedPosts = async () => {
      try {
        const sort = [];
        const order = [];
        Object.entries(sortCriteria).forEach(([key, value]) => {
          if (['view_count', 'created_at', 'title'].includes(key)) {
            sort.push(key);
            order.push(value);
          }
        });

        const requestData = {
          sort: sort,
          order: order,
          page: sortCriteria.page,
          offset: sortCriteria.offset
        };

        const response = await postsService.getPostsPaging(requestData);
        setPosts(response.data);

      } catch(error) {
        console.error('게시물을 불러오는 데 실패했습니다.', error);
      }
    };
  
    fetchSortedPosts();
    
  }, [sortCriteria]);


  // board/[id] 경로로 라우팅합니다.
  const handlePostClick = (post) => {
    router.push(`/board/${post.postId}`);
  };

  // 조회 조건
  const handleSort = (col) => {
    setSortCriteria(prevState => ({
      ...prevState,[col]: prevState[col] === 'asc' ? 'desc' : 'asc'
    }));
  };

  return (
    <div style={{ paddingTop: '64px',  paddingBottom: '64px' }}>
      <Container>
        {/* 정렬 버튼들 */}
        <ButtonGroup variant="contained" aria-label="outlined info button group" color="info"
            sx={{ // 추가적인 스타일링 옵션
              margin: 1,
              padding: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1, // 아이콘과 텍스트 사이의 간격
            }}>
          <Button onClick={() => handleSort('view_count')} style={{ borderRadius: '10px' }}> 조회수 {sortCriteria.view_count === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}</Button>
          <Button onClick={() => handleSort('created_at')} style={{ borderRadius: '10px' }}> 업로드 일자 {sortCriteria.created_at === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}</Button>
          <Button onClick={() => handleSort('title')} style={{ borderRadius: '10px' }}> 제목 {sortCriteria.title === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}</Button>
        </ButtonGroup>
        
        <Grid container spacing={3}>
          {posts.map(post => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={post.postId}>
              <CardActionArea onClick={() => handlePostClick(post)}>
                <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <CardMedia
                    component="img"
                    alt="미리보기 이미지"
                    height="140"
                    image={post.imageUrl}
                    sx={{ objectFit: 'cover' }} // 이미지가 카드 크기에 맞게 채워지도록 조정합니다.
                  />
                  <Box flexGrow={1} display="flex" flexDirection="column">
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">{post.title}</Typography>
                      <Typography variant="body2" color="textSecondary" component="p">{post.content}</Typography>
                    </CardContent>
                    <Box p={1} display="flex" justifyContent="flex-start" flexWrap="wrap">
                      <Chip label={post.categoryName} sx={{ m: 0.5 }} />
                    </Box>
                  </Box>
                </Card>
              </CardActionArea>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default withLayout(BlogHome);
