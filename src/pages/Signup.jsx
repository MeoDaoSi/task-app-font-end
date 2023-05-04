import { Box, Button, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';
import axiosClient from '../apis/axiosClient';
import authApi from '../apis/authApi';

const Signup = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [nameErrText, setNameErrText] = useState('');
    const [emailErrText, setEmailErrText] = useState('');
    const [passwordErrText, setPasswordErrText] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault()
        setNameErrText('')
        setEmailErrText('')
        setPasswordErrText('')

        const data = new FormData(e.target);
        const name = data.get('name').trim();
        const email = data.get('email').trim();
        const password = data.get('password').trim();

        let err = false

        if (name === '') {
            err = true
            setNameErrText('Vui long nhap')
        }
        if (email === '') {
            err = true
            setEmailErrText('Vui long nhap')
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
            const response = await authApi.signup({ 
                name,email,password
            })
            localStorage.setItem('token', response.data.token);
            setLoading(false);
            navigate('/boards');  
        } catch (error) {
            const errorMessage = error?.response?.data?.errors;
            if(errorMessage?.name){
                setNameErrText(errorMessage?.name?.message)
            }
            if(errorMessage?.email || error.response.data?.code){
                setEmailErrText(errorMessage?.email?.message || 'Email da ton tai!');
            }
            if(errorMessage?.password){
                setPasswordErrText(errorMessage?.password?.message)
            }
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
                    id='name'
                    label='Full Name'
                    name='name'
                    disabled={loading}
                    error={nameErrText !== '' }
                    helperText={nameErrText}
                />
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    type='email'
                    disabled={loading}
                    error={emailErrText !== '' }
                    helperText={emailErrText}
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
                    Signup
                </LoadingButton>
            </Box>
            <Button
                component={Link}
                to='/login'
                sx={{textTransform: 'none'}}
            >
                Da Co Tai Khoan? Login
            </Button>
        </>
    )
}

export default Signup;


