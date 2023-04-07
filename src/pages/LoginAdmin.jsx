import { Box, Button, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';
import axiosClient from '../apis/axiosClient';
import authAdminApi from '../apis/authAdminApi';

const LoginAdmin = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [usernameErrText, setUsernameErrText] = useState('');
    const [passwordErrText, setPasswordErrText] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault()
        setUsernameErrText('')
        setPasswordErrText('')

        const data = new FormData(e.target);
        const username = data.get('username').trim();
        const password = data.get('password').trim();

        let err = false

        if (username === '') {
            err = true
            setUsernameErrText('Vui long nhap')
        }
        if (password === '') {
            err = true
            setPasswordErrText('Vui long nhap')
        }
        if (err) {
            return;
        }
        setLoading(true);
        try {
            const response = await authAdminApi.login({ 
                username,password
            })
            setLoading(false);
            localStorage.setItem('tokenAdmin', response.data.token);
            navigate('/admin');  
        } catch (error) {
            alert('tai khoan hoac mat khau khong dung')
            setLoading(false);
        }
    }

    return (
        <>
            <Box
                component='form'
                sx={{ mt:1 }}
                onSubmit={handleSubmit}
                noValidate
            >
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='username'
                    label='Username'
                    name='username'
                    type='username'
                    disabled={loading}
                    error={usernameErrText !== '' }
                    helperText={usernameErrText}
                />
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='password'
                    label='Password'
                    name='password'
                    type='password'
                    disabled={loading}
                    error={passwordErrText !== '' }
                    helperText={passwordErrText}
                />
                <LoadingButton
                    sx={{mt:3, mb:2}}
                    variant='outlined'
                    fullWidth
                    color='success'
                    type='submit'
                    loading={loading}
                >
                    Login
                </LoadingButton>
            </Box>
        </>
    )
}

export default LoginAdmin;

