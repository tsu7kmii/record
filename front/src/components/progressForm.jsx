import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Box, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers-pro";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ja } from 'date-fns/locale';
import { getMenuItemUserList } from '../api/userApi';
import { handleApiError } from '../api/errorHandler';
import { UserContext } from "./userProvider";

/**
 * ProgressFormコンポーネント
 * 
 * 進捗を管理するためのフォームを提供します。
 * 初期値、送信時の処理、ステータスボックスを受け取ります。
 * 
 * @param {Object} props - コンポーネントのプロパティ
 * @param {Object} props.initialValues - フォームの初期値
 * @param {Function} props.onSubmit - フォーム送信時のコールバック関数
 * @param {Array} props.statusBox - ステータス選択肢の配列
 * @returns {JSX.Element} 進捗フォームコンポーネント
 */
const ProgressForm = ({initialValues, onSubmit, statusBox}) => {

    // const initlValues = {
    //     managementId: '', // 編集等の場合、managementIdをjsonで事前に含めておく
    //     parentId: '',
    //     userId: '',
    //     title: '',
    //     contents: '',
    //     link: '',
    //     status: '',
    //     completionScheduleAt: null,
    // };

    const [formValues, setFormValues] = useState(initialValues);
    const [userMenuItem, setUserMenuItem] = useState([]);
    const [error, setError] = useState(null);
    const { userData } = useContext(UserContext);

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const oneWeekLater = new Date();
    oneWeekLater.setDate(oneWeekLater.getDate() + 7);

    // const statusBox = [
    //     { label : "未着手", value : 0 },
    //     { label : "取り組み中", value : 1 },
    //     { label : "待機", value : 2 },
    //     { label : "レビュー待ち", value : 3 },
    //     { label : "処理待ち", value : 4 },
    //     { label : "完了", value : 5 },
    // ];

    /**
     * フォームのフィールド変更時のハンドラー
     * 
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
     * 日付変更時のハンドラー
     * 
     * @param {Date} newDate - 新しい日付
     */
    const handleDateChange = (newDate) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            completionScheduleAt: newDate,
        }));
    };

    /**
     * フォーム送信時のハンドラー
     * 
     * @param {Event} e - フォーム送信イベント
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit(formValues);
    };

    /**
     * ユーザーリストを取得する非同期関数
     */
    const fetchMenuItemUserList = async () => {
        setError(null);
        
        try {
            const response = await getMenuItemUserList({});
            if (response.status === 200) {
                setUserMenuItem(response.data);
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

    }, []);

    useEffect(() => {

        // 完了予定日がnullの場合、一週間後の日付を入れる
        if (formValues.completionScheduleAt === '' || formValues.completionScheduleAt === null){
            setFormValues((prevValues) => ({
                ...prevValues,
                completionScheduleAt: oneWeekLater,
            }));
        }

        // ユーザーが指定されていない場合、ログインユーザーのuserIdを入れる
        if (formValues.userId === '' || formValues.userId === null) {
            setFormValues((prevValues) => ({
                ...prevValues,
                userId: userData.userId, 
            }));
        }
    }, [userMenuItem]);

    // 文字列をDateオブジェクトに変換
    useEffect(() => {
        if (typeof formValues.completionScheduleAt === 'string') {
            setFormValues((prevValues) => ({
                ...prevValues,
                completionScheduleAt: new Date(formValues.completionScheduleAt),
            }));
        }
    }, [formValues.completionScheduleAt]);

    useEffect(() => {
        if (error !== null){
            console.log(error);
        }
    }, [error]);

    return (
        <>
        <Box mt={5}>
        <form onSubmit={handleSubmit}>

            <div className="mb-3">
                {formValues.parentId &&
                    <TextField
                        fullWidth
                        id='parentId'
                        label="進捗グループ"
                        variant="outlined"
                        type="number"
                        value={formValues?.parentId || ''}
                        onChange={handleChange('parentId')}
                        autoComplete='off'
                        disabled
                    />
                }
                
            </div>
            <br />
            <div className="mb-3">
                {/* APIを叩いてuserMenuItemにデータを入れる前に
                    コンポーネント呼び出し元でID指定しているとMUI警告が出るため、
                    userMenuItemにデータが入ってから表示する */}
                {userMenuItem.length > 0 && (
                    <FormControl fullWidth required>
                        <InputLabel id='userId-label' >担当者</InputLabel>
                        <Select
                            labelId='userId-label'
                            id='userId'
                            label='担当者'
                            value={formValues.userId}
                            onChange={handleChange('userId')}
                            autoComplete="off"
                            MenuProps={{
                            PaperProps: {
                                style: {
                                    maxHeight: 150,
                                    overflowY: 'auto',
                                },
                            },
                            }}
                        >
                            {userMenuItem.map((item, index) => (
                                <MenuItem key={index} value={item.userId}>
                                    {item.username}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
            </div>
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
                <TextField
                    fullWidth
                    label="コンテンツ"
                    id='contents'
                    variant="outlined"
                    type="text"
                    value={formValues.contents}
                    onChange={handleChange('contents')}
                    autoComplete='off'
                    multiline
                    rows={5}
                    required
                />
            </div>
            <br />
            <div className="mb-3">
                <TextField
                    fullWidth
                    label="Link"
                    id='link'
                    variant="outlined"
                    type="text"
                    value={formValues.link}
                    onChange={handleChange('link')}
                    autoComplete='off'
                    multiline
                    rows={2}
                />
            </div>
            <br />
            <div className="mb-3">
                <FormControl fullWidth required>
                    <InputLabel id='status-label'>ステータスを選択</InputLabel>
                    <Select
                        labelId='status-label'
                        id='status'
                        label='ステータスを選択'
                        value={formValues.status}
                        onChange={handleChange('status')}
                        autoComplete="off"
                    >
                        {statusBox.map((item, index) =>(
                            <MenuItem key={index} value={item.value}>
                                {item.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <br />
            <div className="mb-3">
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
                    <DatePicker
                        id='completionScheduleAt'
                        label="完了予定日"
                        minDate={ oneWeekAgo }
                        value={formValues.completionScheduleAt}
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
                <Link to="/progress/view">
                    一覧に戻る
                </Link>
            </Box>
        </form>
        </Box>
        </>
  );
};

export default ProgressForm;