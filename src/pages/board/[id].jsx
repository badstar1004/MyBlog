import React, { useEffect, useState } from 'react';
import { useRouter} from "next/router";
import { Card, Button, CardContent, CardMedia, Typography, Box, IconButton, Tooltip } from '@mui/material';
import withLayout from '../layout/withLayout';
import { postsService } from '../../service/postService';
import CancelIcon from '@mui/icons-material/Remove'; // Material-UI 아이콘 가져오기


function PostDetail() {
    const [curPost, setCurPost] = useState({title: '', content: '',imageUrl: '', viewCount: 0});
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchPost = async() => {
            try {
                const response = await postsService.getPost(id);
                setCurPost(response.data);
                console.log(response.data);

                // 조회수 증가 로직
                if (!sessionStorage.getItem(`viewed-${id}`)) {
                    const response = await postsService.increaseViewCount(id);
                    setCurPost(prevPost => ({ ...prevPost, viewCount: response.data.viewCount }));
                    sessionStorage.setItem(`viewed-${id}`, 'true');
                }
                
            } catch(err) {
                console.log('게시글을 불러오는데 실패했습니다.');
                console.error(err);
            }
        }

        if(router.isReady) {
            fetchPost()
        }
    }, [id, router.isReady]);


    // 메인으로 돌아가는 함수
    const handelBack = () => {
        router.push('/');
    };

    // 게시물 수정 페이지 이동 함수
    const handelEdit = () => {
        router.push(`./edit/${id}`);
    };


    const handleDelete = async () => {
        const confirmDelete = window.confirm('삭제하시겠습니까?');
    
        if (confirmDelete) {
            try {
                await postsService.deletePost(id);
                router.push('/');

            } catch (error) {
                console.error('삭제 중 오류 발생:', error);
                alert('삭제를 실패했습니다.');
            }
        }
    };


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
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Typography gutterBottom variant='h6' component="h6">
                                    Post id : {id}
                                </Typography>
                                <Tooltip title="삭제">
                                    <IconButton onClick={handleDelete} color="error">
                                        <CancelIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Typography gutterBottom variant="h5" component="h2">
                                    {curPost.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    조회 {curPost.viewCount}
                                </Typography>
                            </Box>
                            <Typography variant="body1" color="textSecondary" component="p">
                                {curPost.content}
                            </Typography>

                            <Button variant="contained" color="primary" onClick={handelBack} sx={{ mt: 2 }}>
                                메인으로 돌아가기
                            </Button>
                            <Button variant="contained" color="secondary" onClick={handelEdit} sx={{ mt: 2, ml: 30 }}>
                                게시물 수정
                            </Button>
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