import { Link } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';

/**
 * AccessDeniedコンポーネント
 * ユーザーがアクセス権限のないページにアクセスした際に表示されるメッセージを提供します。
 * トップページに戻るためのリンクを含んでいます。
 */
const AccessDenied = () => {

    return (
        <Container maxWidth="sm" sx={{ minHeight: '100vh', justifyContent:"center" }}>
            <Box mt={5}>
                <Typography variant="h4" component="h2" gutterBottom>
                    アクセス権限がありません
                </Typography>
                <Link to="/">
                    トップページに戻る
                </Link>
            </Box>
        </Container>
    )
}

export default AccessDenied;