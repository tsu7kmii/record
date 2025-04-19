import { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { logoutUser } from '../api/userApi';
import { handleApiError } from '../api/errorHandler';
import { UserContext } from "./userProvider";
import ProtectedView from "./protectedView";
import GenAuth from "./genAuth";
import '../css/header.css';
import favicon from '../img/favicon.ico'


const Header = () => {

    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef();
    const [error, setError] = useState(null);
    const { userData, setUserData } = useContext(UserContext);

    const logoutHandleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await logoutUser({});
            if (response.status === 200) {
                setUserData(null);

                // 認証情報をリセットするために再読み込みを伴うリダイレクトを使用
                window.location.href = '/signin';
            } else {
                setUserData(null);
                setError(`失敗しました: ${response.data.message}`);
            }
        } catch (error) {
            setUserData(null);
            setError(handleApiError(error));
        }
    };

    useEffect(() => {
        
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    useEffect(() => {
        if (error !== null){
            console.log(error);
        }
      }, [error]);


    return (
        <>        
        <header className="header">
            <GenAuth />
            <Link to="/" className="logo">
                <img src={favicon} style={{ width: '48px', height: '48px' }}/> 
                Record
            </Link>
            <nav className="nav-right-box">
                <ul className="nav-links">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/">Menu</Link>
                    </li>
                    <li>
                        <Link to="/">Locations</Link>
                    </li>
                    <li>
                        {userData ? (
                            <span>Welcome to <br /> {userData.username} </span>
                        ) : (
                            <Link to="/signin">Login</Link>
                        )}
                    </li>
                </ul>
                <div style={{ marginLeft: '1.5rem' }} />
                <div>
                    <CiMenuFries onClick={() => setIsOpen(!isOpen)} />
                    {isOpen && (
                        <ul
                            ref={menuRef}
                            tabIndex={1}
                            className='popup-menu nav-side-links'
                        >
                            <li>
                                <ProtectedView><Link to="/auth/username"><FaUserEdit />ユーザーネームを変更</Link></ProtectedView>
                            </li>
                            <li>
                                <ProtectedView><Link to="/auth/email"><MdEmail />メールアドレスを変更</Link></ProtectedView>
                            </li>
                            <li>
                                <Link to="/user/password_forget"><RiLockPasswordLine />パスワードを変更</Link>
                            </li>
                            <li>
                                <ProtectedRoleView><Link to="/admin/users"><FaUsers />ユーザー管理</Link></ProtectedRoleView>
                            </li>
                            <ProtectedView><li onClick={logoutHandleSubmit}><IoIosLogOut />ログアウト</li></ProtectedView>
                        </ul>
                    )}
                </div>
            </nav>
        </header>
        </>
    );
}

export default Header;


const  ProtectedRoleView = ({children}) => {
    const { userData } = useContext(UserContext);
  
    return userData && userData.permissionLevel === 1 ? children : null;
  
}