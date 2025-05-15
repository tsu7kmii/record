import { Link } from 'react-router-dom';
import { Container, Typography, Box, ListItemButton, ListItemText } from '@mui/material';

const Top = () => {
    document.title = 'top';
    return (
        <>
        <Container maxWidth="sm" sx={{ minHeight: '100vh' }}>
            <Box mt={5}>
                <Typography variant="h4" component="h2" gutterBottom>
                    トップページ
                </Typography>
                <Typography variant="body1" gutterBottom>
                    チーム運用を想定した進捗管理サービスです。<br />
                    プライベート環境にデプロイ、利用(VPN接続等)を想定しています。<br />
                    現在利用可能なサービス
                </Typography>

                <ListItemButton component="a" href="/progress/view">
                    <ListItemText primary="・進捗管理機能" />
                </ListItemButton>

                <ListItemButton component="a" href="/vote/view">
                    <ListItemText primary="・投票機能" />
                </ListItemButton>
                
                <br />

                <Typography variant="h5" component="h2" gutterBottom>
                    お知らせ
                </Typography>
                <Typography variant="body1" gutterBottom>
                    アカウントを作成してログインし、ご利用ください。<br />
                    現在メールサーバー休止中のため、パスワード変更機能はご利用いただけません。
                </Typography>

                <br />

                <Link to="/signin"> 
                    ログインページ
                </Link>

                <br />
                <br />

                <Link to="/user/register"> 
                    アカウント作成
                </Link>

                <br />
                <br />
                <br />
                <br />
                <br />

                <Typography variant="body1" gutterBottom>
                    dev by github
                </Typography>

                <Link to="https://github.com/tsu7kmii/record"> 
                    github repository
                </Link>

            </Box>
        </Container>
        </>
    )
}

export default Top;