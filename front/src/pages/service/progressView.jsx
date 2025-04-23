import React, { useEffect, useState, Fragment } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import { getIncomplateParentList, getComplateParentList, getChildList } from '../../api/progressApi';
import { getuserIdUsernameList } from '../../api/userApi';
import { handleApiError } from '../../api/errorHandler';
import ProgressTable from '../../components/progressTable';


const ProgressView = () => {
    const navigate = useNavigate();
    const [incomplateParent, setIncomplateParent] = useState([]);
    const [complateParent, setComplateParent] = useState([]);
    const [child, setChild] = useState([]);
    const [userIdUsername, setUserIdUsername] = useState([]);
    const [error, setError] = useState(null);


    const fetchIncomplateParent = async () => {
        setError(null);

        try {
        const response = await getIncomplateParentList();
        if (response.status === 200) {
            setIncomplateParent(response.data);
        } else {
            setError(`取得に失敗しました: ${response.data.message}`);
        }
        } catch (error) {
        setError(handleApiError(error));
        }
    };

    const fetchComplateParent = async () => {
        setError(null);

        try {
        const response = await getComplateParentList();
        if (response.status === 200) {
            setComplateParent(response.data);
        } else {
            setError(`取得に失敗しました: ${response.data.message}`);
        }
        } catch (error) {
        setError(handleApiError(error));
        }
    };

    const fetchChild = async () => {
        setError(null);

        try {
        const response = await getChildList();
        if (response.status === 200) {
            setChild(response.data);
        } else {
            setError(`取得に失敗しました: ${response.data.message}`);
        }
        } catch (error) {
        setError(handleApiError(error));
        }
    };

    const fetchMenuItemUserList = async () => {
        setError(null);
        
        try {
            const response = await getuserIdUsernameList({});
            if (response.status === 200) {
                setUserIdUsername(response.data);
            } else {
                setError(`ユーザーリストの取得に失敗しました: ${response.data.message}`);
            }
        } catch (error) {
            setError(handleApiError(error));
        }
    };
    

    useEffect(() => {

        // ユーザー一覧の取得
        fetchMenuItemUserList();
        fetchIncomplateParent();
        fetchComplateParent();
        fetchChild();
    }, []);

    useEffect(() => {
        if (error !== null){
            console.log(error);
        }
    }, [error]);


    return (
        <Container sx={{ minHeight: '100vh', width: '100%' }}>
        <Box mt={5}>
            <Link to="/progress/register">
                新しく登録
            </Link>
            <br /><br />
            
            <Typography variant="h4" component="h2" gutterBottom>
                進捗一覧
            </Typography>
            {incomplateParent.length > 0 && (
            <>
                {incomplateParent.map((parent, index) => (
                    <Fragment key={index}>
                    <ProgressTable index={index} parentValue={parent} childValue={child} userList={userIdUsername} />
                    <br />
                    </Fragment>
                ))}
                
            </>
            )}

            {incomplateParent.length > 0 && (
            <>
            <Typography variant="h4" component="h2" gutterBottom>
                完了済の進捗一覧
            </Typography>
                {complateParent.map((parent, index) => (
                    <Fragment key={index}>
                    <ProgressTable index={index} parentValue={parent} childValue={child} userList={userIdUsername} />
                    <br />
                    </Fragment>
                ))}
                
            </>
            )}
            
        </Box>
        </Container>
    );
    };

export default ProgressView;