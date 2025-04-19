import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import { updateUsername, logoutUser } from '../../api/userApi';
import { handleApiError } from '../../api/errorHandler';
import { UserContext } from '../../components/userProvider';


const UpdateUsername = () => {
  const [newUsername, setNewUsername] = useState('');
  const [error, setError] = useState(null);
  const { setUserData } = useContext(UserContext);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    updateUsername({ newUsername })
      .then(response => {
        if (response.status === 200) {
          return logoutUser({});
        } else {
          throw new Error(`ユーザーネームの変更に失敗しました: ${response.data.message}`);
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
          ユーザーネームを変更する
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
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
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

export default UpdateUsername;