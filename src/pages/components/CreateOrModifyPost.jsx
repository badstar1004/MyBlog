import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import withLayout from './../layout/withLayout';
import { postsService } from './../../service/postService';


function CreateOrModifyPost({ postId, mode, initialData }) {
    const [postData, setPostData] = useState({ title: '', content: '', userId: '10', status: 'public' });
    const [error, setError] = useState(false);  // 유효성 검사
    const router = useRouter();

    useEffect(() => {
        if (mode === 'edit' && initialData) {
            setPostData({...initialData, postId:postId})
            
        } else if(mode === 'new' && initialData) {
            // initialData에 userId가 있으면 사용하고, 없으면 기본값인 postData.userId를 사용
            const userId = initialData.userId || postData.userId;
            const status = initialData.status || postData.status;
            setPostData({...initialData, userId:userId, status:status})
        }
    }, [mode, initialData, postId]);


    const updatePost = async () => {
        try {
            const response = await postsService.updatePost(postId, postData);
            router.push(`/board/${postId}`);

        } catch(error) {
            alert('게시글 수정에 실패했습니다.');
            console.error(error);
        }
    };

    const createPost = async () => {
        try {
            const response = await postsService.createPost(postData);
            router.push(`/board/${response.data.postId}`);

        } catch(error) {
            alert('게시글 생성에 실패했습니다.');
            console.error(error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if(name === 'title') {
            if(value !== '') {
                setError(false);

            } else {
                setError(true);
            }
        }
        setPostData({ ...postData, [name]: value });
    };

    // 저장 버튼 이벤트
    const submit = () => {
        // mode에 따른 분기 처리
        if (mode === 'edit' && postId) {
            console.log('수정 데이터:', postData);
            updatePost()

        } else {
            console.log('새 게시물 데이터:', postData);
            createPost()
        }

        setError(false);
    }
    
    return (
        <Container style={{paddingTop: "64px", paddingBottom: "64px", display: "flex", justifyContent: "center", alignItems: "center", height: "80vh"}}>
            <Box p={3}>
                <Typography variant="h4" mb={2} style={{ textAlign: 'center' }}>
                    {mode === 'edit' ? '게시물 수정' : '새 게시물 작성'}
                </Typography>
                <TextField
                    name="title"
                    fullWidth
                    label="제목"
                    value={postData.title}
                    onChange={handleInputChange}
                    error={error}
                    helperText={error ? '제목을 작성해주세요' : ''}
                    margin="normal"
                />
                <TextField
                    name='content'
                    fullWidth
                    label="내용"
                    value={postData.content}
                    onChange={handleInputChange}
                    multiline
                    rows={4}
                    margin="normal"
                />
                <Box display={"flex"} justifyContent="flex-end">
                    <Button variant="contained" color="primary" onClick={submit} sx={{ mt: 2 }}>
                        {mode === 'edit' ? '수정' : '저장'}
                    </Button>
                </Box>
            </Box>
        </Container>
        
    );
}

export default withLayout(CreateOrModifyPost);