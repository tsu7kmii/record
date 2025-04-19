import { Link } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';



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