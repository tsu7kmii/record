import React, { useEffect, useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@mui/material';
import { getIncomplateParentList, getComplateParentList, getChildList } from '../../api/progressApi';
import { getuserIdUsernameList } from '../../api/userApi';
import { handleApiError } from '../../api/errorHandler';
import ProgressTable from '../../components/progressTable';

/**
 * ProgressViewコンポーネント
 * 進捗の一覧を表示し、新しい進捗の登録を行うためのビューを提供する。
 */
const ProgressView = () => {
    const navigate = useNavigate();
    const [incomplateParent, setIncomplateParent] = useState([]);
    const [complateParent, setComplateParent] = useState([]);
    const [child, setChild] = useState([]);
    const [userIdUsername, setUserIdUsername] = useState([]);
    const [error, setError] = useState(null);

    /**
     * 未完了の親タスクを取得する非同期関数
     */
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

    /**
     * 完了済の親タスクを取得する非同期関数
     */
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

    /**
     * 子タスクを取得する非同期関数
     */
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

    /**
     * ユーザーIDとユーザー名のリストを取得する非同期関数
     */
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

    /**
     * 新しい進捗を登録するためのナビゲーションを行う関数
     */
    const handleNewSubmit = async () => {
        setError(null);
        
        navigate('/progress/register');
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
            <Box display="flex" justifyContent="space-between" alignItems="center">
                
                <Typography variant="h4" component="h2" gutterBottom>
                    進捗一覧
                </Typography>

                <Button variant="outlined" type="submit" size="large"  onClick={() => handleNewSubmit()}>
                    新しく登録
                </Button>
            </Box>
            <br />
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