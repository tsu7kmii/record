import React, {useContext} from 'react';
import { Routes, Route } from 'react-router-dom';
import Top from './pages/top';
import Login from './pages/auth/login';
import UserRegister from './pages/auth/userRegister';
import ForgetPassword from './pages/auth/forgotPassword';
import UpdatePassword from './pages/auth/updatePassword';
import UpdateEmail from './pages/auth/updateEmail';
import UpdateUsername from './pages/auth/updateUsername';
import UserList from './pages/auth/userList';
import Success from './pages/util/success';
import NotFound from './pages/util/notFound';
import AccessDenied from './pages/util/accessDenied';
import PleaseSignin from './pages/util/pleaseSignin';
import ProgressRegister from './pages/service/progressRegister';
import ProgressView from './pages/service/progressView';
import ProgressEdit from './pages/service/progressEdit';
import VoteView from './pages/service/voteView';
import VoteRegister from './pages/service/voteRegistr';
import VoteEdit from './pages/service/voteEdit';
import { UserContext } from './components/userProvider';
import Header from './components/header';


function App() {
  return (
    <>
      <Header/>
      <Routes>

        <Route path="/" element={<Top />} />
        <Route path="/success" element={<Success />} />

        {/* auth : not login */}
        <Route path="/signin" element={<Login />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/password_forget" element={<ForgetPassword />} />
        <Route path="/user/password" element={<UpdatePassword />} />

        {/* auth : need login */}
        <Route path="/auth/username" element={<ProtectedLoginRoute><UpdateUsername /></ProtectedLoginRoute>} />
        <Route path="/auth/email" element={<ProtectedLoginRoute><UpdateEmail /></ProtectedLoginRoute>} />
        <Route path="/admin/users" element={<ProtectedRoleRoute><UserList /></ProtectedRoleRoute>} />

        {/* progress : need login */}
        <Route path='/progress/view' element={<ProtectedLoginRoute><ProgressView /></ProtectedLoginRoute>}/>
        <Route path='/progress/register' element={<ProtectedLoginRoute><ProgressRegister /></ProtectedLoginRoute>}/>
        <Route path='/progress/edit' element={<ProtectedLoginRoute><ProgressEdit /></ProtectedLoginRoute>}/>

        {/* vote : need login */}
        <Route path='/vote/view' element={<ProtectedLoginRoute><VoteView /></ProtectedLoginRoute>}/>
        <Route path='/vote/register' element={<ProtectedLoginRoute><VoteRegister /></ProtectedLoginRoute>}/>
        <Route path='/vote/edit' element={<ProtectedLoginRoute><VoteEdit /></ProtectedLoginRoute>}/>

        {/* error */}
        <Route path="/error/access-denied" element={<AccessDenied />} />
        <Route path="/error/not-found" element={<NotFound />} />
        <Route path="/error/not-signin" element={<PleaseSignin />} />


        <Route path="*" element={<NotFound />} />

      </Routes>
    </>
  );
}

/**
 * ProtectedLoginRouteコンポーネント
 * 
 * ユーザーがログインしているかどうかを確認し、ログインしていない場合はサインインページにリダイレクトします。
 * 
 * @param {Object} props - コンポーネントのプロパティ
 * @param {JSX.Element} props.children - ログインが必要なコンポーネント
 * @returns {JSX.Element} ログインしている場合は子コンポーネント、していない場合は<Navigate />コンポーネント
 */
function ProtectedLoginRoute({children}){
  const { userData } = useContext(UserContext);

  return userData ? children : <PleaseSignin />;
}

/**
 * ProtectedRoleRouteコンポーネント
 * 
 * ユーザーが管理者権限を持っているかどうかを確認し、持っていない場合はアクセス拒否ページを表示します。
 * 
 * @param {Object} props - コンポーネントのプロパティ
 * @param {JSX.Element} props.children - 管理者権限が必要なコンポーネント
 * @returns {JSX.Element} 管理者権限がある場合は子コンポーネント、ない場合は<AccessDenied />コンポーネント
 */
function ProtectedRoleRoute({children}){
  const { userData } = useContext(UserContext);

  return userData && userData.permissionLevel === 1 ? children : <AccessDenied />;
}

export default App;