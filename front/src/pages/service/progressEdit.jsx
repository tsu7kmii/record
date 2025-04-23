import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Container, Typography, Box, Alert } from '@mui/material';
import ProgressForm from '../../components/progressForm';
import { updateProgress } from '../../api/progressApi';
import { handleApiError } from '../../api/errorHandler';


const ProgressEdit = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState(null);

    const initValues = {
        parentId: null,
        userId: null,
        title: '',
        contents: '',
        link: '',
        status: '',
        completionScheduleAt: null,
    };

    const initialValues = location.state?.progress || initValues;


    const statusBox = [
        { label : "未着手", value : 0 },
        { label : "取り組み中", value : 1 },
        { label : "待機", value : 2 },
        { label : "レビュー待ち", value : 3 },
        { label : "処理待ち", value : 4 },
        { label : "完了", value : 5 },
    ];

    const handleSubmit = async (formValues) => {
        setError(null);

        try {
        const response = await updateProgress(formValues);
        if (response.status === 200) {
            navigate('/progress/view');
        } else {
            setError(`更新に失敗しました: ${response.data.message}`);
        }
        } catch (error) {
        setError(handleApiError(error));
        }
    };


    useEffect(() => {
        if (initialValues === initValues){
            setError("編集内容をロストしました")
        } else {
            setError(null);
        }
    
    }, [initialValues]);



    return (
        <Container maxWidth="sm" sx={{ minHeight: '100vh' }}>
        <Box mt={5}>
            <Typography variant="h4" component="h2" gutterBottom>
            進捗を編集する
            </Typography>
            {error && (
            <>
                <br />
                <Alert severity="error" className="mb-3">{error}</Alert>
                <br />
                <Link to='/progress/view'>
                    一覧に戻る
                </Link>
            </>
            )}
            {!error && (
                <ProgressForm 
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    statusBox={statusBox}
                />
            )}
            
            
        </Box>
        </Container>
    );
    };

export default ProgressEdit;