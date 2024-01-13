import React, { useEffect, useState } from 'react';
import { useRouter} from "next/router";
import allPosts from '../data/posts';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import withLayout from '../layout/withLayout';


function PostDetail() {
    const [curPost, setCurPost] = useState(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        // URL에서 id가 제대로 로드되었는지 확인
        if(id) {
            // url에서 받은 id는 문자열이므로, 정수로 변환
            const post = allPosts.find(post => post.id === parseInt(id, 10));
            setCurPost(post);
        }
    }, [id, allPosts]);

    // URL에서 id가 제대로 로드되지 않았거나 posts 배열이 undefined인 경우 처리
    if (!id || !curPost) {
        return <p>Loading...</p>;
    }

    return(
        <Box display={"flex"} justifyContent="center" alignItems={"center"} minHeight="100vh">
            <Card sx={{ maxWidth: 600, m: 2 }}>
                {curPost ? (
                    <>
                        <CardMedia
                            component="img"
                            height="300"
                            image={curPost.imageUrl}
                            alt={curPost.title}
                            sx={{ objectFit: 'cover' }}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {curPost.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {curPost.content}
                            </Typography>
                        </CardContent>
                    </>
                ) : (
                    <Typography variant="body1" p={2}>
                        게시물을 찾을 수 없습니다.
                    </Typography>
                )}
            </Card>
        </Box>
    );
}

export default withLayout(PostDetail);