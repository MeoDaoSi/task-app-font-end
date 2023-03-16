import { Box, Button, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';

const Signup = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [usernameErrText, setUsernameErrText] = useState('');
    const [passwordErrText, setPasswordErrText] = useState('');
    const [confirmPasswordErrText, setConfirmPasswordErrText] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault()
        setUsernameErrText('')
        setPasswordErrText('')
        setConfirmPasswordErrText('')

        const data = new FormData(e.target);
        const username = data.get('username').trim();
        const password = data.get('password').trim();
        const confirmPassword = data.get('confirmPassword').trim();

        let err = false

        if (username === '') {
            err = true
            setUsernameErrText('Vui long nhap')
        }
        if (password === '') {
            err = true
            setPasswordErrText('Vui long nhap')
        }
        if (confirmPassword === '') {
            err = true
            setConfirmPasswordErrText('Vui long nhap')
        } 
        if (password!== confirmPassword) {
            err = true
            setConfirmPasswordErrText('Mật khẩu không khớp')
        }
        if (err) {
            return;
        }
        setLoading(true);
        
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
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='confirmPassword'
                    label='Confirm Password'
                    name='confirmPassword'
                    type='password'
                    disabled={loading}
                    error={confirmPasswordErrText !== '' }
                    helperText={confirmPasswordErrText}
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


