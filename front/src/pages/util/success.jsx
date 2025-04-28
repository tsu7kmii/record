import { Link } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';

/**
 * Successコンポーネント
 * 
 * このコンポーネントは、処理が正常に完了したことを示すメッセージを表示します。
 * また、ユーザーをログイン画面に戻すためのリンクを提供します。
 * 
 * @returns {JSX.Element} 成功メッセージとリンクを含むコンテナ
 */
const Success = () => {

    return (
        <Container maxWidth="sm" sx={{ minHeight: '100vh', justifyContent:"center" }}>
            <Box mt={5}>
                <Typography variant="h4" component="h2" gutterBottom>
                    正常に処理されました
                </Typography>
                <Link to="/signin">
                    ログイン画面に戻る
                </Link>
            </Box>
        </Container>
    )
}

export default Success;