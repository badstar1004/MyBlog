import React, {useState, useEffect} from "react";
import { useRouter } from 'next/router';
import { AppBar, Button, Grid, Toolbar, Typography, Link } from '@mui/material';


function AppBars() {
    const router = useRouter();
    const [appBarHeight, setAppBarHeight] = useState(0);

    useEffect(() => {
        // AppBar 요소를 선택합니다.
        const appBar = document.querySelector('.MuiAppBar-root');
        if (appBar) {
            // AppBar의 높이를 상태에 저장합니다.
            setAppBarHeight(appBar.clientHeight);
        }
      }, []); // 의존성 배열이 빈 배열이므로, 컴포넌트 마운트 시에만 실행됩니다.

    // 새 글 작성 페이지로 이동
    const handleCreatePost = () => {
        router.push('/board/create');
    };

    return(
        <AppBar position="fixed">
            <Toolbar>
                <Grid container spacing={1} alignItems="center" justifyContent="center">
                    <Grid item xs={12} sm={true}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "center" }}>
                        <Link href="/" color="inherit" style={{ textDecoration: 'none' }}>
                            이너프의 블로그
                        </Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={true} container justifyContent="center">
                        <Button color="inherit">홈</Button>
                        <Button color="inherit">울룰루</Button>
                        <Button color="inherit">쿼카</Button>
                        <Button color="inherit">캥거루</Button>
                    </Grid>
                    <Grid item>
                        <Button color="inherit" onClick={handleCreatePost}>
                            새 글 작성
                        </Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default AppBars;
