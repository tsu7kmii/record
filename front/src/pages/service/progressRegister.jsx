import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Alert } from '@mui/material';
import ProgressForm from '../../components/progressForm';
import { registerProgress } from '../../api/progressApi';
import { handleApiError } from '../../api/errorHandler';


const ProgressRegister = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const initialValues = {
        parentId: null,
        userId: null,
        title: '',
        contents: '',
        link: '',
        status: '',
        completionScheduleAt: null,
    };

    const handleSubmit = async (formValues) => {
        setError(null);

        try {
        const response = await registerProgress(formValues);
        if (response.status === 200) {
            navigate('/progress/view');
        } else {
            setError(`登録に失敗しました: ${response.data.message}`);
        }
        } catch (error) {
        setError(handleApiError(error));
        }
    };



    return (
        <Container maxWidth="sm" sx={{ minHeight: '100vh' }}>
        <Box mt={5}>
            <Typography variant="h4" component="h2" gutterBottom>
            進捗を追加する
            </Typography>
            {error && (
            <>
                <Alert severity="error" className="mb-3">{error}</Alert>
                <br />
            </>
            )}
            <ProgressForm 
                initialValues={initialValues}
                onSubmit={handleSubmit}
            />
            
        </Box>
        </Container>
    );
    };

export default ProgressRegister;