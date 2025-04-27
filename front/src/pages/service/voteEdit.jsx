import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Container, Typography, Box, Alert } from '@mui/material';
import VoteForm from '../../components/voteForm';
import { updateQuestion, updateAnswer } from '../../api/voteApi';
import { handleApiError } from '../../api/errorHandler';


const VoteEdit = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState(null);

    const initValues = {
        voteQuestionId: null,
        userId: null,
        title: '',
        period: null,
    };

    const initAnswerValueList = Array.from({ length: 2 }, () => ({
        voteAnswerId: null,
        voteQuestionId: null,
        userId: null,
        answer: '',
    }));

    const initialValues = location.state?.question || initValues;
    const initialAnswerValueList = location.state?.answerList || initAnswerValueList;

    const handleSubmit = async (formValues, answerValueList) => {
        setError(null);

        try {
            const response = await updateQuestion(formValues);
            if (response.status === 200) {
                for (const answer of answerValueList) {
                    answer.voteQuestionId = response.data.voteQuestionId;
                }
            } else {
                setError(`更新に失敗しました: ${response.data.message}`);
            }
        } catch (error) {
            setError(handleApiError(error));
        }

        if (error === null){
            try {
                const response = await updateAnswer(answerValueList);
                if (response.status === 200) {
                    navigate('/vote/view');
                } else {
                    setError(`更新に失敗しました: ${response.data.message}`);
                }
            } catch (error) {
                setError(handleApiError(error));
            }
        }
    };


    useEffect(() => {
        if (initialValues === initValues){
            setError("編集内容をロストしました")
        } else {
            setError(null);
        }
    
    }, [initialValues]);

    useEffect(() => {
        if (initialAnswerValueList === initAnswerValueList){
            setError("編集内容をロストしました")
        } else {
            setError(null);
        }
    
    }, [initialAnswerValueList]);



    return (
        <Container maxWidth="sm" sx={{ minHeight: '100vh' }}>
        <Box mt={5}>
            <Typography variant="h4" component="h2" gutterBottom>
            投票を編集する
            </Typography>
            {error && (
            <>
                <br />
                <Alert severity="error" className="mb-3">{error}</Alert>
                <br />
                <Link to='/vote/view'>
                    一覧に戻る
                </Link>
            </>
            )}
            {!error && (
                <VoteForm 
                    initialValues={initialValues}
                    initAnswerValueList={initialAnswerValueList}
                    onSubmit={handleSubmit}
                />
            )}
            
        </Box>
        </Container>
    );
    };

export default VoteEdit;