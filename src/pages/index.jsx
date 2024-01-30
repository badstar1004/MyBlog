import React from 'react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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
    title: 'asc',
    view_count: 'asc',
    created_at: 'asc',
    page: 20,
    offset: 0
  });
  const [mostCommentsPosts, setMostCommentsPosts] = useState([]);
  const [mostViewCountPosts, setMostViewCountPosts] = useState([]);
  
  
  // 인기 게시물 조회
  useEffect(() => {
    const fetchPopularPosts = async () => {
      try {
        // 인기 게시물 가져오기
        const response = await postsService.getPopularPosts();
        setMostCommentsPosts(response.data.mostCommentsPosts);
        setMostViewCountPosts(response.data.mostViewCountPosts);

      } catch(error) {
        console.error('인기 게시물을 불러오는 데 실패했습니다.', error);
      }
    };

    if (router.isReady) {
      fetchPopularPosts();
    }

  }, [router.isReady]);


  useEffect(() => {
    const fetchSortedPosts = async () => {
      try {
        const sort = [];
        const order = [];
        Object.entries(sortCriteria).forEach(([key, value]) => {
          if (['title', 'view_count', 'created_at'].includes(key)) {
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
      ...prevState, [col]: prevState[col] === 'asc' ? 'desc' : 'asc'
    }));
  };

  return (
    <div style={{ paddingTop: '64px',  paddingBottom: '64px' }}>
      <Container>
        {/* popularPosts 데이터 바인딩 */}
          <Grid container spacing={3}>

          <Grid item xs={6} md={6}>
            <Typography variant="h6" sx={{ padding: '1px' }}>댓글이 많은 게시물</Typography>
            <Box sx={{ border: '2px solid #00BFFF', borderRadius: '5px', padding: '1px'}}>
              {/* mostCommentsPosts의 2개 게시물 렌더링 */}
              <Grid container spacing={3} padding={3}>
              {mostCommentsPosts.map(post => (
                <Grid item xs={10} sm={6} md={6} lg={6} key={post.postId}>
                  <CardActionArea onClick={() => handlePostClick(post)}>
                    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <CardMedia
                        component="img"
                        alt="미리보기 이미지"
                        height="140"
                        image={post.imageUrl}
                        sx={{ objectFit: 'cover' }}
                      />
                      <Box flexGrow={1} display="flex" flexDirection="column">
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography gutterBottom variant="h7" component="h2">{post.title}</Typography>
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
              </Box>
            </Grid>
            
            <Grid item xs={6} md={6}>
              <Typography variant="h6" sx={{ padding: '1px' }}>조회수가 많은 게시물</Typography>
              <Box sx={{ border: '2px solid #00BFFF', borderRadius: '5px', padding: '1px'}}>
              {/* mostViewCountPosts의 2개 게시물 렌더링 */}
              <Grid container spacing={3} padding={3}>
              {mostViewCountPosts.map(post => (
                <Grid item xs={10} sm={6} md={6} lg={6} key={post.postId}>
                  <CardActionArea onClick={() => handlePostClick(post)}>
                    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <CardMedia
                        component="img"
                        alt="미리보기 이미지"
                        height="140"
                        image={post.imageUrl}
                        sx={{ objectFit: 'cover' }}
                      />
                      <Box flexGrow={1} display="flex" flexDirection="column">
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography gutterBottom variant="h7" component="h2">{post.title}</Typography>
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
              </Box>
            </Grid>
            
          </Grid>
          </Container>

        <Container>
          <ButtonGroup variant="contained" aria-label="outlined info button group" color="info"
              sx={{
                margin: 1,
                padding: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}>
            <Button onClick={() => handleSort('title')} style={{ borderRadius: '10px' }}> 제목 {sortCriteria.title === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}</Button>
            <Button onClick={() => handleSort('view_count')} style={{ borderRadius: '10px' }}> 조회수 {sortCriteria.view_count === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}</Button>
            <Button onClick={() => handleSort('created_at')} style={{ borderRadius: '10px' }}> 업로드 일자 {sortCriteria.created_at === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}</Button>
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
