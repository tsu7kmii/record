import { useState, useEffect, useContext } from "react";
import { getAuth } from '../api/userApi';
import { handleApiError } from '../api/errorHandler';
import { UserContext } from "./userProvider";

/**
 * GenAuthコンポーネント
 * ユーザーの認証情報を取得し、コンテキストに設定します。
 */
const GenAuth = () => {

    const [error, setError] = useState(null);
    const { setUserData } = useContext(UserContext);

    /**
     * 認証情報を取得する非同期関数
     * 成功時にはユーザーデータを設定し、失敗時にはエラーメッセージを設定します。
     */
    const fetchAuth = async () => {
        setError(null);

        try {
            const response = await getAuth({});
            if (response.status === 200 && response.data && response.data.userId && response.data.username) {
                setUserData(response.data);
            } else {
                setUserData(null);
                setError(`認証情報が存在しません: ${response.data.message}`);
            }
        } catch (error) {
            setUserData(null);
            setError(handleApiError(error));
        }
    };

    useEffect(() => {
        fetchAuth();
    }, []);

    useEffect(() => {
        if (error !== null){
            console.log(error);
        }
    }, [error]);

    return (
        <>    
        </>
    );
}

export default GenAuth;