import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Box } from '@mui/material';
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers-pro";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ja } from 'date-fns/locale';
import { MdDeleteOutline } from "react-icons/md";

/**
 * VoteFormコンポーネント
 * @param {Object} props - コンポーネントのプロパティ
 * @param {Object} props.initialValues - 初期フォーム値
 * @param {Array} props.initAnswerValueList - 初期回答リスト
 * @param {Function} props.onSubmit - フォーム送信時のコールバック関数
 */
const VoteForm = ({initialValues,  initAnswerValueList, onSubmit}) => {

    const [formValues, setFormValues] = useState(initialValues);
    const [answerList, setAnswerList] = useState(initAnswerValueList); 
    const [error, setError] = useState(null);

    const minDate = new Date();

    const oneWeekLater = new Date();
    oneWeekLater.setDate(oneWeekLater.getDate() + 7);

    /**
     * 回答を削除するハンドラー
     * @param {number} index - 削除する回答のインデックス
     */
    const handleDeleteAnswer = (index) => {
        // 先頭2個は削除禁止
        if (index < 2) return;
        
        setAnswerList((prevList) => prevList.filter((_, i) => i !== index));
    };

    /**
     * 回答を変更するハンドラー
     * @param {number} index - 変更する回答のインデックス
     * @returns {Function} イベントハンドラー
     */
    const handleAnswerChange = (index) => (event) => {
        const updatedAnswers = [...answerList];
        updatedAnswers[index].answer = event.target.value; 
        setAnswerList(updatedAnswers);
    };

    /**
     * 回答を追加するハンドラー
     */
    const handleAddAnswer = () => {
        setAnswerList([...answerList, {
            voteAnswerId: null,
            voteQuestionId: null,
            userId: formValues.userId,
            answer: ''
        }]);
    };

    /**
     * フォームのフィールドを変更するハンドラー
     * @param {string} field - 変更するフィールド名
     * @returns {Function} イベントハンドラー
     */
    const handleChange = (field) => (event) => {
        setFormValues({
        ...formValues,
        [field]: event.target.value,
        });
    };

    /**
     * 日付を変更するハンドラー
     * @param {Date} newDate - 新しい日付
     */
    const handleDateChange = (newDate) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            period: newDate,
        }));
    };

    /**
     * フォーム送信時のハンドラー
     * @param {Event} e - イベントオブジェクト
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit(formValues, answerList);
    };

    useEffect(() => {
        // 期限日時がnullの場合、一週間後の日付を入れる
        if (formValues.period === '' || formValues.period === null){
            setFormValues((prevValues) => ({
                ...prevValues,
                period: oneWeekLater,
            }));
        }
    }, [formValues.period]);

    // 文字列をDateオブジェクトに変換
    useEffect(() => {
        if (typeof formValues.period === 'string') {
            setFormValues((prevValues) => ({
                ...prevValues,
                period: new Date(formValues.period),
            }));
        }
    }, [formValues.period]);

    useEffect(() => {
        if (error !== null){
            console.log(error);
        }
    }, [error]);

    return (
        <>
        <Box mt={5}>
        <form onSubmit={handleSubmit}>
           
            <br />
            <div className="mb-3">
                <TextField
                    fullWidth
                    label="タイトル"
                    id='title'
                    variant="outlined"
                    type="text"
                    value={formValues.title}
                    onChange={handleChange('title')}
                    autoComplete='off'
                    multiline
                    required
                />
            </div>
            <br />
            <div className="mb-3">
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
                    <DateTimePicker
                        id='period'
                        label="期限日時"
                        minDate={ minDate }
                        value={formValues.period}
                        onChange={handleDateChange}
                        slotProps={{
                            textField: {
                            fullWidth: true,
                            variant: 'outlined',
                            required: true,
                            },
                        }}
                    />
                </LocalizationProvider>
            </div>
            <br />
            {/* 必須個数 */}
            {answerList.slice(0, 2).map((answer, index) => (
                <div className="mb-3" key={`top-${index}`}>
                    <TextField
                        fullWidth
                        label={`回答 ${index + 1}`}
                        id={`answer-${index}`}
                        variant="outlined"
                        type="text"
                        value={answer.answer}
                        onChange={handleAnswerChange(index)}
                        autoComplete="off"
                        required
                        multiline
                        rows={2}
                    />
                    <br /><br />
                </div>
            ))}

            {/* 自由追加枠 */}
            {answerList.slice(2).map((answer, index) => (
                <div className="mb-3" key={`bottom-${index}`}>
                    <TextField
                        fullWidth
                        label={`回答 ${index + 3}`}
                        id={`answer-${index + 2}`}
                        variant="outlined"
                        type="text"
                        value={answer.answer}
                        onChange={handleAnswerChange(index + 2)}
                        autoComplete="off"
                        multiline
                        rows={2}
                        InputProps={{
                            endAdornment: (
                                <MdDeleteOutline
                                    style={{ cursor: 'pointer' }}
                                    size={24}
                                    onClick={() => handleDeleteAnswer(index + 2)}
                                />
                            )
                        }}
                    />
                    <br /><br />
                </div>
            ))}
            
            <Button variant="outlined" onClick={handleAddAnswer}>回答を追加する</Button>

            <br /><br />
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Button 
                type="submit" 
                variant="contained" 
                startIcon={<i className="fa fa-sign-in" />}
                sx={{ 
                    backgroundColor: 'black', 
                    color: 'white',
                    '&:hover': {
                    backgroundColor: 'white !important',
                    color: 'black !important'
                    }
                }}
                className="col-auto align-self-stretch"
                >
                登録する
                </Button>
                <Link to="/vote/view">
                    一覧に戻る
                </Link>
            </Box>
        </form>
        </Box>
        </>
  );
};

export default VoteForm;