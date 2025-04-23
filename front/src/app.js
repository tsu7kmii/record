import React, {useContext} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
import ProgressRegister from './pages/service/progressRegister';
import ProgressView from './pages/service/progressView';
import ProgressEdit from './pages/service/progressEdit';
import { UserContext } from './components/userProvider';
import Header from './components/header';


function App() {
  return (
    <>
      <Header/>
      <Routes>

        <Route path="/" element={<Top />} />
        <Route path="/success" element={<Success />} />

        <Route path="/signin" element={<Login />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/password_forget" element={<ForgetPassword />} />
        <Route path="/user/password" element={<UpdatePassword />} />

        <Route path="/auth/username" element={<ProtectedLoginRoute><UpdateUsername /></ProtectedLoginRoute>} />
        <Route path="/auth/email" element={<ProtectedLoginRoute><UpdateEmail /></ProtectedLoginRoute>} />
        <Route path="/admin/users" element={<ProtectedRoleRoute><UserList /></ProtectedRoleRoute>} />

        <Route path='/progress/view' element={<ProtectedRoleRoute><ProgressView /></ProtectedRoleRoute>}/>
        <Route path='/progress/register' element={<ProtectedRoleRoute><ProgressRegister /></ProtectedRoleRoute>}/>
        <Route path='/progress/edit' element={<ProtectedRoleRoute><ProgressEdit /></ProtectedRoleRoute>}/>

        <Route path="*" element={<NotFound />} />

      </Routes>
    </>
  );
}

function ProtectedLoginRoute({children}){
  const { userData } = useContext(UserContext);

  return userData ? children : <Navigate to="/signin" />;

}

function ProtectedRoleRoute({children}){
  const { userData } = useContext(UserContext);

  return userData && userData.permissionLevel === 1 ? children : <AccessDenied />;

}

export default App;