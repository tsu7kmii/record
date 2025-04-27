import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Alert } from '@mui/material';
import VoteForm from '../../components/voteForm';
import { registerQuestion, registerAnswer } from '../../api/voteApi';
import { handleApiError } from '../../api/errorHandler';
import { UserContext } from "../../components/userProvider";


const VoteRegister = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const { userData } = useContext(UserContext);


    const initialValues = {
        voteQuestionId: null,
        userId: userData.userId,
        title: '',
        period: null,
    };

    const initAnswerValueList = Array.from({ length: 2 }, () => ({
        voteAnswerId: null,
        voteQuestionId: null,
        userId: userData.userId,
        answer: '',
    }));

    const handleSubmit = async (formValues, answerValueList) => {
        setError(null);

        try {
            const response = await registerQuestion(formValues);
            if (response.status === 200) {
                for (const answer of answerValueList) {
                    answer.voteQuestionId = response.data.voteQuestionId;
                }
            } else {
                setError(`登録に失敗しました: ${response.data.message}`);
            }
        } catch (error) {
            setError(handleApiError(error));
        }

        if (error === null){
            try {
                const response = await registerAnswer(answerValueList);
                if (response.status === 200) {
                    navigate('/vote/view');
                } else {
                    setError(`登録に失敗しました: ${response.data.message}`);
                }
            } catch (error) {
                setError(handleApiError(error));
            }
        }
    };



    return (
        <Container maxWidth="sm" sx={{ minHeight: '100vh' }}>
        <Box mt={5}>
            <Typography variant="h4" component="h2" gutterBottom>
            投票を追加する
            </Typography>
            {error && (
            <>
                <Alert severity="error" className="mb-3">{error}</Alert>
                <br />
            </>
            )}
            <VoteForm 
                initialValues={initialValues}
                initAnswerValueList={initAnswerValueList}
                onSubmit={handleSubmit}
            />
            
        </Box>
        </Container>
    );
    };

export default VoteRegister;