import { useRouter } from 'next/router';
import { Box } from '@mui/system';
import { Container, Grid, Typography, Card, CardMedia, CardContent, Chip, CardActionArea } from '@mui/material';
import posts from '../pages/data/posts';
import withLayout from './layout/withLayout';


function BlogHome() {

  const router = useRouter(); // useRouter 훅을 사용하여 router 객체를 생성합니다.

  // board/[id] 경로로 라우팅합니다.
  const handlePostClick = (post) => {
    router.push(`/board/${post.id}`);
  };

  return (
    <div style={{ paddingTop: '64px',  paddingBottom: '64px' }}>
      <Container>
        <Grid container spacing={3}>
          {posts.map(post => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={post.id}>
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
                      {post.categories.map(category => (
                        <Chip label={category} key={category} sx={{ m: 0.5 }} />
                      ))}
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
