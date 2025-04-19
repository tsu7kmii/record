import { useContext } from "react";
import { UserContext } from "./userProvider";

/**
 * ログイン状態による表示制限
 */
const  ProtectedView = ({children}) => {
    const { userData } = useContext(UserContext);
  
    return userData ? children : null;
  
}

export default ProtectedView;
  