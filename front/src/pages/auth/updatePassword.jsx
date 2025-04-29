import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Alert, OutlinedInput, InputAdornment, IconButton, InputLabel, FormControl } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { updatePassword, logoutUser } from '../../api/userApi';
import { handleApiError } from '../../api/errorHandler';
import { UserContext } from '../../components/userProvider';

/**
 * UpdatePasswordコンポーネント
 * 
 * ユーザーがパスワードを変更するためのフォームを提供します。
 * パスワードの変更が成功した場合、ユーザーはログアウトされ、成功ページにリダイレクトされます。
 * 
 * @returns {JSX.Element} パスワード変更フォームを含むコンテナ
 */
const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [againNewPassword, setAgainNewPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState(null);
  const { setUserData } = useContext(UserContext);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showAgainNewPassword, setShowAgainNewPassword] = useState(false);
  
  // パスワードを表示/非表示の切り替え
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowAgainNewPassword = () => setShowAgainNewPassword((show) => !show);

  // パスワードを表示/非表示の切り替え
  const handleMouseDownNewPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownAgainNewPassword = (event) => {
    event.preventDefault();
  };

  // パスワードを表示/非表示の切り替え
  const handleMouseUpNewPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseUpAgainNewPassword = (event) => {
    event.preventDefault();
  };

  /**
   * コンポーネントのマウント時にトークンをURLから取得します。
   */
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tokenValue = queryParams.get('token');
    setToken(tokenValue);
  }, []);

  /**
   * フォーム送信時のハンドラー
   * 
   * @param {Event} e - フォーム送信イベント
   */
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
          <p>パスワードには、半角英数字で6文字以上設定する必要があります</p>
          <div className="mb-3">
            <FormControl variant="outlined" required fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">パスワード</InputLabel>
              <OutlinedInput
                id="filled-adornment-password"
                type={showNewPassword ? 'text' : 'password'}
                label="パスワード"
                variant="outlined"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showNewPassword ? 'hide the password' : 'display the password'
                      }
                      onClick={handleClickShowNewPassword}
                      onMouseDown={handleMouseDownNewPassword}
                      onMouseUp={handleMouseUpNewPassword}
                      edge="end"
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
          <br />
          <div className="mb-3">
            <FormControl variant="outlined" required fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">パスワード(確認)</InputLabel>
              <OutlinedInput
                id="filled-adornment-password"
                type={showAgainNewPassword ? 'text' : 'password'}
                label="パスワード"
                variant="outlined"
                value={againNewPassword}
                onChange={(e) => setAgainNewPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showAgainNewPassword ? 'hide the password' : 'display the password'
                      }
                      onClick={handleClickShowAgainNewPassword}
                      onMouseDown={handleMouseDownAgainNewPassword}
                      onMouseUp={handleMouseUpAgainNewPassword}
                      edge="end"
                    >
                      {showAgainNewPassword ? <VisibilityOff /> : <Visibility />}
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