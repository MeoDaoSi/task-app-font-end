import { Box, Button, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';
import axiosClient from '../apis/axiosClient';
import authApi from '../apis/authApi';

const Login = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [emailErrText, setEmailErrText] = useState('');
    const [passwordErrText, setPasswordErrText] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault()
        setEmailErrText('')
        setPasswordErrText('')

        const data = new FormData(e.target);
        const email = data.get('email').trim();
        const password = data.get('password').trim();

        let err = false

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
        
        // try {
            // const res = await authApi.signup({
                
            // })
            // axiosClient.post('/users', { 
            //     name,email,password
            // })
            //     .then(res => {
            //         if(res.errors){
            //             console.log('errror roi!');
            //         }else{
            //             console.log(res);
            //         }
            //     })
            //     .catch((error)=>{
            //         console.log(error);
            //     })
            try {
                const response = await authApi.login({ 
                    email,password
                })
                // console.log(response.data);
                setLoading(false);
                navigate('/');  
            } catch (error) {
                alert('tai khoan hoac mat khau khong dung')
                setLoading(false);
            }
            // localStorage.setItem('token')
        // } catch (error) {
            // const errors = error.data.errors
            // errors.forEach(err => {
            //     if(err.param === 'name'){
            //         setNameErrText(err.msg)
            //     }
            //     if(err.param === 'email'){
            //         setEmailErrText(err.msg)
            //     }
            //     if(err.param === 'password'){
            //         setPasswordErrText(err.msg)
            //     }
            // })
            // setLoading(false);
        // }
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
                    Login
                </LoadingButton>
            </Box>
            <Button
                component={Link}
                to='/signup'
                sx={{textTransform: 'none'}}
            >
                Chua co tai khoan? signup
            </Button>
        </>
    )
}

export default Login;

