import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import { DataGrid } from '@mui/x-data-grid';
import authApi from '../../apis/authApi';
import { useEffect, useRef, useState } from 'react'

export default function Users() {
    const [users, setUsers] = useState([]);
    const [selectionModel, setSelectionModel] = useState([]);
    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await authApi.getAll();
                const data = res.data;
                setUsers(data);
            } catch (error) {
                alert(error.message);
            }
            return;
        }
        getUsers();
    },[])
    const columns = [
        { field: 'id', headerName: 'STT', width: 70 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'email', headerName: 'Email', width: 430 },
        { field: 'createdAt', headerName: 'Registration Date', width: 130 },
    ];
    const rows = users.map((user,index) => {
        return { id: index+1, name: user.name, email: user.email, createdAt: (new Date(user.createdAt).toLocaleDateString())}
    });
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    );
}