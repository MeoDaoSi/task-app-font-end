import { Container, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import authUtils from '../../utils/authUtils';
import Loading from '../common/Loading';
import assets from '../../assets';
import Header from '../../assets/js/Header';
import Footer from '../../assets/js/Footer';

const AuthLayout = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const isAuth = await authUtils.isAuthenticated();
            
            if (!isAuth) {
                setLoading(false);
            }else{
                navigate('/boards');
            }
        }
        checkAuth();
    }, [navigate]);
    return (
        loading ? (
                <Loading fullHeight/>
        ) :
        (
            <Box>
                <Header />
                <Container component='main' maxWidth='xs'>       
                    <Box sx={{
                        marginTop: 8,
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}>
                        <h1>Plannet</h1>
                        <Outlet/>
                    </Box>
                </Container>
                <Footer
                    title="Plannet"
                    description="Do Not Sell or Share My Info"
                />
            </Box>
        )
    )
}

export default AuthLayout;
