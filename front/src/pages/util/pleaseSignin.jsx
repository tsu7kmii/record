import { Link } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';


const PleaseSignin = () => {

    return (
        <Container maxWidth="sm" sx={{ minHeight: '100vh', justifyContent:"center" }}>
            <Box mt={5}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Please Login
                </Typography>
                <Link to="/signin">
                    ログイン画面に戻る
                </Link>
            </Box>
        </Container>
    )
}

export default PleaseSignin;