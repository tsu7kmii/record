import React, { useState, useEffect } from 'react';
import { getUserList, deleteUser, updateRoleToAdmin, updateRoleToUser } from '../../api/userApi';
import { handleApiError } from '../../api/errorHandler';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const UserList = () => {

    const [error, setError] = useState(null);
    const [rows, setRows] = useState([]);

    const handleChangeRole = async (user) => {
        setError(null);

        const userId = parseInt(user.userId, 10);
        let response;
    
        try {

            if (user.permissionLevel === 2){
                response = await updateRoleToAdmin({'userId':userId});
            } else {
                response = await updateRoleToUser({'userId':userId});
            }

          if (response.status === 200) {
            fetchUserList();
          } else {
            setError(`権限の変更に失敗しました: ${response.data.message}`);
          }
        } catch (error) {
            setError(handleApiError(error));
        }
          
    };

    const handleDeleteUser = async (userId) => {
        setError(null);
    
        try {
          const response = await deleteUser({'userId':userId});
          if (response.status === 200) {
            fetchUserList();
          } else {
            setError(`ユーザーの削除に失敗しました: ${response.data.message}`);
          }
        } catch (error) {
            setError(handleApiError(error));
        }
          
    };

    const fetchUserList = async () => {
        setError(null);

        try {
            const response = await getUserList({});
            if (response.status === 200) {
                setRows(response.data);
            } else {
                setError(`ユーザーが存在しません: ${response.data.message}`);
            }
        } catch (error) {
            setError(handleApiError(error));
        }
    };

    useEffect(() => {
        fetchUserList();
    }, []);

    useEffect(() => {
        if (error !== null){
            console.error(error);
        };
    }, [error]);


    return (
        <>
        <br /><br />
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell align="right">username</TableCell>
                    <TableCell align="right">email</TableCell>
                    <TableCell align="right">role</TableCell>
                    <TableCell align="right">change-role</TableCell>
                    <TableCell align="right">delete-user</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow
                    key={row.userId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {row.userId}
                        </TableCell>
                        <TableCell align="right">{row.username}</TableCell>
                        <TableCell align="right">{row.email}</TableCell>
                        <TableCell align="right">{row.permissionLevel === 1 ? 'ADMIN' : row.permissionLevel === 2 ? 'USER' : 'OTHER'}</TableCell>
                        <TableCell align="right">
                            <Button variant="outlined"
                                    type="submit" 
                                    onClick={() => handleChangeRole(row)}
                            >
                                change
                            </Button>
                        </TableCell>
                        <TableCell align="right">
                            <Button variant="outlined" sx={{ color: 'red', borderColor: 'red' }}
                                    type="submit" 
                                    onClick={() => handleDeleteUser(row.userId)}
                            
                            >
                                delete
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    );
};

export default UserList;