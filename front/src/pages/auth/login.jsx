import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Alert, OutlinedInput, InputAdornment, IconButton, InputLabel, FormControl } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { loginUser } from '../../api/userApi';
import { handleApiError } from '../../api/errorHandler';

/**
 * Loginコンポーネント
 * 
 * ユーザーがログインするためのフォームを提供します。
 * 
 * @returns {JSX.Element} ログインフォームを含むコンテナ
 */
const Login = () => {
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
      const response = await loginUser({ email, password });
      if (response.status === 200) {
        window.location.href = '/';
      } else {
        setError(`ログインに失敗しました: ${response.data.message}`);
      }
    } catch (error) {
      setError(handleApiError(error));
    }
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh' }}>
      <Box mt={5}>
        <Typography variant="h4" component="h2" gutterBottom>
          ログイン
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
              ログイン
            </Button>
            <Link to="/user/password_forget">
              パスワードを忘れた
            </Link>
          </Box>
          <Box mt={4} mb={2} display="flex" justifyContent="center">
            <Link to="/user/register" >
              新規会員登録はこちら
            </Link>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Login;