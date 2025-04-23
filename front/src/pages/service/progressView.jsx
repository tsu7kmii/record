import React, { useEffect, useState, Fragment } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import { getIncomplateParentList, getIncomplateChildList, getComplateParentList, getComplateChildList } from '../../api/progressApi';
import { getuserIdUsernameList } from '../../api/userApi';
import { handleApiError } from '../../api/errorHandler';
import ProgressTable from '../../components/progressTable';


const ProgressView = () => {
    const navigate = useNavigate();
    const [incomplateParent, setIncomplateParent] = useState([]);
    const [incomplateChild, setIncomplateChild] = useState([]);
    const [complateParent, setComplateParent] = useState([]);
    const [complateChild, setComplateChild] = useState([]);
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

    const fetchIncomplateChild = async () => {
        setError(null);

        try {
        const response = await getIncomplateChildList();
        if (response.status === 200) {
            setIncomplateChild(response.data);
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

    const fetchComplateChild = async () => {
        setError(null);

        try {
        const response = await getComplateChildList();
        if (response.status === 200) {
            setComplateChild(response.data);
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
        fetchIncomplateChild();
        fetchComplateParent();
        fetchComplateChild();
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
                新しく登録する
            </Link>
            <Typography variant="h4" component="h2" gutterBottom>
                進捗一覧
            </Typography>
            {incomplateParent.length > 0 && (
            <>
                {incomplateParent.map((parent, index) => (
                    <Fragment key={index}>
                    <ProgressTable index={index} parentValue={parent} childValue={incomplateChild} userList={userIdUsername} />
                    <br />
                    </Fragment>
                ))}
                
            </>
            )}

            <Typography variant="h4" component="h2" gutterBottom>
                完了済の進捗一覧
            </Typography>


            
        </Box>
        </Container>
    );
    };

export default ProgressView;