import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';



const ProgressTable = ({index, parentValue, childValue, userList}) => {

    const navigate = useNavigate();
    const [indexKey] = useState(index);
    const parent = parentValue;
    const children = childValue;

    const statusBox = [
        { label : "未着手", value : 0 },
        { label : "取り組み中", value : 1 },
        { label : "待機", value : 2 },
        { label : "レビュー待ち", value : 3 },
        { label : "処理待ち", value : 4 },
        { label : "完了", value : 5 },
    ];

    const handleEditSubmit = async (element) => {
    
        navigate('/progress/edit',{state: {progress: element}});
    };

    const handleNewSubmit = async (parentId) => {
    
        navigate('/progress/register',{state: {parentId: parentId}});
    };


    const renderRow = (item, isChild = false) => (
        <TableRow
            key={item.managementId}
            sx={{ '&:last-child td, &:last-child th': { border: 0 }, border: isChild ? undefined : '2px solid skyblue' }}
        >
            <TableCell component="th" scope="row">
                {new Date(item.createAt).toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' })}
            </TableCell>
            <TableCell align="right">
                {userList.find(user => user.userId === item.userId)?.username || "不明なユーザー"}
            </TableCell>
            <TableCell align="left">{item.title}</TableCell>
            <TableCell align="left" sx={{ whiteSpace: 'pre' }}>{item.contents}</TableCell>
            <TableCell align="left" sx={{ whiteSpace: 'pre' }}>{item.link}</TableCell>
            <TableCell align="right">
                {statusBox.find(status => status.value === item.status)?.label || "不明なステータス"}
            </TableCell>
            <TableCell align="right">
                {new Date(item.updateAt ?? item.createAt).toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' })}
            </TableCell>
            <TableCell align="right">
                {new Date(item.completionScheduleAt).toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' })}
            </TableCell>
            <TableCell align="right">

                    {parent.deleteAt === null &&
                        <Button variant="outlined" type="submit" onClick={() => handleEditSubmit(item)}>
                            Edit
                        </Button>
                    }
                    {parent.deleteAt !== null && item.deleteAt !== null &&
                        new Date(item.deleteAt).toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' })
                    }
                    {parent.deleteAt !== null && item.deleteAt === null &&
                        '未完了'
                    }
            </TableCell>
        </TableRow>
    );

    return (
        <>
        <Typography variant="h5" component="h3" gutterBottom>
            グループ{parent.managementId}
        </Typography>
        <TableContainer component={Paper} >
            <Table key={indexKey} sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>作成日</TableCell>
                    <TableCell align="right">担当者</TableCell>
                    <TableCell align="right">TITLE</TableCell>
                    <TableCell align="right">CONTENTS</TableCell>
                    <TableCell align="right">LINK</TableCell>
                    <TableCell align="right">STATUS</TableCell>
                    <TableCell align="right">最終更新日</TableCell>
                    <TableCell align="right">完了予定日</TableCell>

                    {parent.deleteAt === null &&
                        <TableCell align="right">操作</TableCell>
                    }
                    {parent.deleteAt !== null &&
                        <TableCell align="right">完了日</TableCell>
                    }


                </TableRow>
                </TableHead>
                <TableBody>
                {renderRow(parent)}
                {children
                    .filter(child => String(child.parentId) === String(parent.managementId))
                    .map(child => renderRow(child, true))
                }
                </TableBody>
            </Table>
        </TableContainer>
        
        <br />
        {parent.deleteAt === null &&
            <>
            <Button variant="outlined" type="submit" onClick={() => handleNewSubmit(parent.managementId)}>
                グループに進捗を追加
            </Button>
            <br />
            <br />
            </>
        }


        </>
  );
};

export default ProgressTable;