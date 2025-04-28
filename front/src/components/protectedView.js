import { useContext } from "react";
import { UserContext } from "./userProvider";

/**
 * ProtectedViewコンポーネント
 * 
 * ログイン状態に基づいて子コンポーネントの表示を制限します。
 * 
 * @param {Object} props - コンポーネントのプロパティ
 * @param {JSX.Element} props.children - ログイン時に表示する子コンポーネント
 * @returns {JSX.Element|null} ログインしている場合は子コンポーネントを返し、そうでない場合はnullを返します。
 */
const ProtectedView = ({children}) => {
    const { userData } = useContext(UserContext);
  
    return userData ? children : null;
}

export default ProtectedView;