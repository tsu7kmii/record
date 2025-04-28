import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Typography, Box, Alert } from '@mui/material';
import ProgressForm from '../../components/progressForm';
import { registerProgress } from '../../api/progressApi';
import { handleApiError } from '../../api/errorHandler';

/**
 * ProgressRegisterコンポーネントは、進捗登録フォームを表示し、
 * ユーザーが進捗を登録できるようにします。
 * 
 * @returns {JSX.Element} 進捗登録フォームを含むコンテナ
 */
const ProgressRegister = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState(null);

    const parentId = location.state?.parentId || null;

    /**
     * フォームの初期値を設定します。
     */
    const initialValues = {
        parentId: parentId,
        userId: null,
        title: '',
        contents: '',
        link: '',
        status: '',
        completionScheduleAt: null,
    };

    /**
     * ステータスの選択肢を定義します。
     */
    const statusBox = [
        { label : "未着手", value : 0 },
        { label : "取り組み中", value : 1 },
        { label : "待機", value : 2 },
        { label : "レビュー待ち", value : 3 },
        { label : "処理待ち", value : 4 },
        // { label : "完了", value : 5 },
    ];

    /**
     * フォーム送信時の処理を行います。
     * 
     * @param {Object} formValues - フォームの入力値
     */
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
                    statusBox={statusBox}
                />
            </Box>
        </Container>
    );
};

export default ProgressRegister;