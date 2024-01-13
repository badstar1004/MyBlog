import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import posts from "../data/posts";
import withLayout from './../layout/withLayout';


function CreateOrModifyPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState(false);  // 유효성 검사
    const [isLoading, setLoading] = useState(true);  // 로딩 상태 관리
    const router = useRouter();
    const { id } = router.query; // URL에서 id 추출

    useEffect(() => {
        if (id) {
            const postModify = posts.find(post => post.id === parseInt(id, 10));
            if(postModify) {
                setTitle(postModify.title);
                setContent(postModify.content);
                setLoading(false);  // 로딩 완료
            } else {
                alert("해당 게시물이 없습니다.");
                router.push('/');
                setLoading(true);
            }
        } else {
            setLoading(false);
        }
    }, [id, router]);

    if(isLoading) {
        return null;    // 로딩 중에는 아무것도 렌더링하지 않음
    }

    // 제목이 변경되면 저장
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
        setError(false);
    };

    // 내용이 변경되면 저장
    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    // 저장 버튼 이벤트
    const submit = () => {
        // 제목 작성을 안했을 경우
        if(!title.trim()) {
            setError(true);
            return;
        }

        console.log({title, content});
        setError(false);
    }
    
    return (
        <Container style={{paddingTop: "64px", paddingBottom: "64px", display: "flex", justifyContent: "center", alignItems: "center", height: "80vh"}}>
            <Box p={3}>
                <Typography variant="h4" mb={2} style={{ textAlign: 'center' }}>
                    {id ? '글 수정' : '새 글 작성'}
                </Typography>
                <TextField
                    fullWidth
                    label="제목"
                    value={title}
                    onChange={handleTitleChange}
                    error={error}
                    helperText={error ? '제목을 작성해주세요' : ''}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="내용"
                    value={content}
                    onChange={handleContentChange}
                    multiline
                    rows={4}
                    margin="normal"
                />
                <Box display={"flex"} justifyContent="flex-end">
                    <Button variant="contained" color="primary" onClick={submit} sx={{ mt: 2 }}>
                        저장
                    </Button>
                </Box>
            </Box>
        </Container>
        
    );
}

export default withLayout(CreateOrModifyPost);