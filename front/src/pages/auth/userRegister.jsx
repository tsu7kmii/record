import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Alert, OutlinedInput, InputAdornment, IconButton, InputLabel, FormControl } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { registerUser } from '../../api/userApi';
import { handleApiError } from '../../api/errorHandler';

/**
 * UserRegisterコンポーネント
 * 
 * 新規ユーザーがアカウントを作成するためのフォームを提供します。
 * アカウント作成が成功した場合、成功ページにリダイレクトされます。
 * 
 * @returns {JSX.Element} ユーザー登録フォームを含むコンテナ
 */
const UserRegister = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  
  // パスワードを表示/非表示の切り替え
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // パスワードを表示/非表示の切り替え
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // パスワードを表示/非表示の切り替え
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  /**
   * フォーム送信時のハンドラー
   * 
   * @param {Event} e - フォーム送信イベント
   */
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
          <p>パスワードには、半角英数字で6文字以上設定する必要があります</p>
          <div className="mb-3">
          <FormControl variant="outlined" required fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">パスワード</InputLabel>
              <OutlinedInput
                id="filled-adornment-password"
                type={showPassword ? 'text' : 'password'}
                label="パスワード"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword ? 'hide the password' : 'display the password'
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
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