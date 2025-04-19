import { useState, useEffect, useContext } from "react";
import { getAuth } from '../api/userApi';
import { handleApiError } from '../api/errorHandler';
import { UserContext } from "./userProvider";


const GenAuth = () => {

    const [error, setError] = useState(null);
    const { setUserData } = useContext(UserContext);

    const fetchAuth = async () => {
        setError(null);

        try {
            const response = await getAuth({});
            if (response.status === 200) {
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

    return (
        <>    
        </>
    );
}

export default GenAuth;