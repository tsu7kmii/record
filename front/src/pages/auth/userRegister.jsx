import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import { registerUser } from '../../api/userApi';
import { handleApiError } from '../../api/errorHandler';

const UserRegister = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await registerUser({ username, email, password });
      if (response.status === 200) {
        navigate('/success');
      } else {
        setError(`アカウント作成に失敗しました: ${response.data.message}`);
      }
    } catch (error) {
      setError(handleApiError(error));
    }
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh' }}>
      <Box mt={5}>
        <Typography variant="h4" component="h2" gutterBottom>
          新規会員登録
        </Typography>
        {error && (
          <>
            <Alert severity="error" className="mb-3">{error}</Alert>
            <br />
          </>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <TextField
              fullWidth
              label="ユーザーネーム"
              variant="outlined"
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <br />
          <div className="mb-3">
            <TextField
              fullWidth
              label="メールアドレス"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <br />
          <div className="mb-3">
            <TextField
              fullWidth
              label="パスワード"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <br />
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Button 
              type="submit" 
              variant="contained" 
              startIcon={<i className="fa fa-sign-in" />}
              sx={{ 
                backgroundColor: 'black', 
                color: 'white',
                '&:hover': {
                  backgroundColor: 'white !important',
                  color: 'black !important'
                }
              }}
              className="col-auto align-self-stretch"
            >
              登録する
            </Button>
            <Link to="/signin">
              ログイン画面に戻る
            </Link>
          </Box>
          
        </form>
      </Box>
    </Container>
  );
};

export default UserRegister;