import React from "react";
import { Instagram, Twitter, LinkedIn, Facebook } from '@mui/icons-material';
import { Container, Grid, IconButton, Link, Typography } from '@mui/material';
import { Box } from '@mui/system';


function Footer() {
    return(
        <footer style={{ textAlign: 'center', padding: '2em 0', background: '#333', color: 'white' }}>
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>회사 정보</Typography>
                        <Typography>주소: 서울특별시 강남구 </Typography>
                        <Typography>전화: 02-1234-5678</Typography>
                        <Typography>Email: info@myblog.com</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>링크</Typography>
                            <Link href="#" color="inherit">홈</Link><br />
                            <Link href="#" color="inherit">블로그</Link><br />
                            <Link href="#" color="inherit">포트폴리오</Link><br />
                            <Link href="#" color="inherit">연락처</Link>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>소셜 미디어</Typography>
                        <IconButton color="inherit">
                        <Facebook />
                        </IconButton>
                        <IconButton color="inherit">
                        <Instagram />
                        </IconButton>
                        <IconButton color="inherit">
                        <Twitter />
                        </IconButton>
                        <IconButton color="inherit">
                        <LinkedIn />
                        </IconButton>
                    </Grid>
                </Grid>
                <Box mt={3}>
                    <Typography variant="body2">© 2023 나의 블로그. 모든 권리 보유.</Typography>
                </Box>
            </Container>
        </footer>
    );
    
}

export default Footer;