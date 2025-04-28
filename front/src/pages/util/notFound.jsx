import { Link } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';

/**
 * NotFoundコンポーネント
 * 
 * このコンポーネントは、404エラーページを表示します。
 * ユーザーが存在しないページにアクセスした際に表示され、
 * トップページに戻るためのリンクを提供します。
 */
const NotFound = () => {

    return (
        <Container maxWidth="sm" sx={{ minHeight: '100vh', justifyContent:"center" }}>
            <Box mt={5}>
                <Typography variant="h4" component="h2" gutterBottom>
                    404 Not Found
                </Typography>
                <Link to="/">
                    トップページに戻る
                </Link>
            </Box>
        </Container>
    )
}

export default NotFound;