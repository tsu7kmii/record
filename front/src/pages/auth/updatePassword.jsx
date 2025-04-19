import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import { updatePassword, logoutUser } from '../../api/userApi';
import { handleApiError } from '../../api/errorHandler';
import { UserContext } from '../../components/userProvider';

const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [againNewPassword, setAgainNewPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState(null);
  const { setUserData } = useContext(UserContext);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tokenValue = queryParams.get('token');
    setToken(tokenValue);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    updatePassword({ newPassword, againNewPassword, token })
      .then(response => {
        if (response.status === 200) {
          return logoutUser({});
        } else {
          throw new Error(`パスワード変更に失敗しました: ${response.data.message}`);
        }
      })
      .then(response => {
        if (response.status === 200) {
          setUserData(null);
          // 認証情報をリセットするために再読み込みを伴うリダイレクトを使用
          window.location.href = '/success';
        } else {
          throw new Error(`失敗しました: ${response.data.message}`);
        }
      })
      .catch(error => {
        setError(handleApiError(error));
      });
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh' }}>
      <Box mt={5}>
        <Typography variant="h4" component="h2" gutterBottom>
          パスワード変更する
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
              label="パスワード"
              variant="outlined"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <br />
          <div className="mb-3">
            <TextField
              fullWidth
              label="パスワード(確認)"
              variant="outlined"
              type="password"
              value={againNewPassword}
              onChange={(e) => setAgainNewPassword(e.target.value)}
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
              変更する
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

export default UpdatePassword;