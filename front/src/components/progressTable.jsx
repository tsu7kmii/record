import React, {useState} from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';



const ProgressTable = ({index, parentValue, childValue, userList}) => {

    const [indexKey] = useState(index);
    const [parent] = useState(parentValue);
    const [children] = useState(childValue);


    
    const statusBox = [
        { label : "未着手", value : 0 },
        { label : "取り組み中", value : 1 },
        { label : "待機", value : 2 },
        { label : "レビュー待ち", value : 3 },
        { label : "処理待ち", value : 4 },
        { label : "完了", value : 5 },
    ];

    

    return (
        <>
        <Typography variant="h5" component="h3" gutterBottom>
                グループ{indexKey +1}
            </Typography>
        <TableContainer component={Paper}>
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
                    <TableCell align="right">操作</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow
                        key={parent.managementId}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {new Date(parent.createAt).toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' })}
                        </TableCell>
                        <TableCell align="right">
                            {userList.find(user => user.userId === parent.userId)?.username || "不明なユーザー"}

                        </TableCell>
                        <TableCell align="right">{parent.title}</TableCell>
                        <TableCell align="right" sx={{ whiteSpace: 'pre' }}>{parent.contents}</TableCell>
                        <TableCell align="right" sx={{ whiteSpace: 'pre' }}>{parent.link}</TableCell>
                        <TableCell align="right">
                            {statusBox.find(status => status.value === parent.status)?.label || "不明なステータス"}
                        </TableCell>
                        <TableCell align="right">
                            {parent.updateAt === null &&
                                new Date(parent.createAt).toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' })
                            }
                            {parent.updateAt !== null &&
                                new Date(parent.updateAt).toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' })
                            }
                        </TableCell>
                        <TableCell align="right">
                            {new Date(parent.completionScheduleAt).toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' })}
                        </TableCell>
                        <TableCell align="right">
                            <Button variant="outlined" sx={{ color: 'red', borderColor: 'red' }}
                                    type="submit" 
                                    onClick={() => handleDeleteUser(parent.userId)}
                            
                            >
                                操作
                            </Button>
                        </TableCell>
                    </TableRow>
                    {children.length > 0 &&  children.map((child) => (
                        child.parentId == parent.managementId && (
                            <TableRow
                                key={child.userId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {new Date(child.createAt).toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' })}
                                </TableCell>
                                <TableCell align="right">
                                    {userList.find(user => user.userId === child.userId)?.username || "不明なユーザー"}
                                </TableCell>
                                <TableCell align="right">{child.title}</TableCell>
                                <TableCell align="right" sx={{ whiteSpace: 'pre' }}>{child.contents}</TableCell>
                                <TableCell align="right" sx={{ whiteSpace: 'pre' }}>{child.link}</TableCell>
                                <TableCell align="right">
                                    {statusBox.find(status => status.value === child.status)?.label || "不明なステータス"}
                                </TableCell>
                                <TableCell align="right">
                                    {child.updateAt === null &&
                                        new Date(child.createAt).toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' })
                                    }
                                    {child.updateAt !== null &&
                                        new Date(child.updateAt).toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' })
                                    }
                                </TableCell>
                                <TableCell align="right">
                                    {new Date(child.completionScheduleAt).toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' })}
                                </TableCell>
                                <TableCell align="right">
                                    <Button variant="outlined" sx={{ color: 'red', borderColor: 'red' }}
                                            type="submit" 
                                            onClick={() => handleDeleteUser(child.userId)}
                                    
                                    >
                                        操作
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
  );
};

export default ProgressTable;