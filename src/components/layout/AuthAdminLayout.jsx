import { Container, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import authAdminUtils from '../../utils/authUtils';
import Loading from '../common/Loading';
import image from '../../assets/images/imageedit_1_6003449786.png';
import Header from '../../assets/js/Header';
import Footer from '../../assets/js/Footer';
import Typography from '@mui/material/Typography';

const AuthAdminLayout = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuthAdmin = async () => {
            const isAuth = await authAdminUtils.isAuthenticated();
            
            if (!isAuth) {
                setLoading(false);
            }else{
                navigate('/admin');
            }
        }
        checkAuthAdmin();
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
                        <img src={image} style={{width: '100px'}} alt='' />
                        <Typography
                            variant="h5"
                            color="inherit"
                            align="center"
                            noWrap
                            sx={{
                                display: 'flex',
                                flex: 1,
                            }}
                        >
                            ADMIN
                        </Typography>
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

export default AuthAdminLayout;
