import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { getQuestionList } from '../../api/voteApi';
import { handleApiError } from '../../api/errorHandler';
import VoteModal from '../../components/voteModal';

/**
 * 投票一覧を表示するコンポーネント
 * @returns {JSX.Element} 投票一覧のビュー
 */
const VoteView = () => {
    const navigate = useNavigate();
    const [voteQuestions, setvoteQuestions] = useState([]);
    const [error, setError] = useState(null);

    /**
     * 投票質問を取得する非同期関数
     */
    const fetchVoteQuestion = async () => {
        setError(null);

        try {
            const response = await getQuestionList();
            if (response.status === 200) {
                setvoteQuestions(response.data);
            } else {
                setError(`取得に失敗しました: ${response.data.message}`);
            }
        } catch (error) {
            setError(handleApiError(error));
        }
    };

    /**
     * 新しい投票を登録するためのナビゲーションを行う関数
     */
    const handleNewSubmit = async () => {
        navigate('/vote/register');
    };

    useEffect(() => {
        fetchVoteQuestion();
    }, []);

    useEffect(() => {
        if (error !== null) {
            console.log(error);
        }
    }, [error]);

    return (
        <Container sx={{ minHeight: '100vh', width: '100%' }}>
            <Box mt={5}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h4" component="h2" gutterBottom>
                        投票一覧
                    </Typography>

                    <Button variant="outlined" type="submit" size="large" onClick={() => handleNewSubmit()}>
                        新しく登録
                    </Button>
                </Box>
                {voteQuestions.length < 1 &&
                    <Typography variant="h4" component="h2" gutterBottom>
                        投票が存在しません
                    </Typography>
                }
                {voteQuestions.length > 0 &&
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">作成日</TableCell>
                                    <TableCell align="center">TITLE</TableCell>
                                    <TableCell align="center">期限</TableCell>
                                    <TableCell align="center">作成者</TableCell>
                                    <TableCell align="center">状態</TableCell>
                                    <TableCell align="center">詳細</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {voteQuestions.map((question) => (
                                    <TableRow
                                        key={question.voteQuestionId}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align='center'>
                                            {new Date(question.createAt).toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' })}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {question.title}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {new Date(question.period).toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {question.username}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {question.deleteAt === null ? "開催中" : "結果公開中"}
                                        </TableCell>
                                        <TableCell align='center'>
                                            <VoteModal question={question} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
            </Box>
        </Container>
    );
};

export default VoteView;