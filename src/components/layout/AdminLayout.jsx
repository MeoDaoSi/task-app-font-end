import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import authAdminUtils from '../../utils/authAdminUtils';
import Loading from '../common/Loading';
import Sidebar from '../common/Sidebar';
import { setAdmin } from '../../redux/features/adminSlice'
// import Header from '../../assets/js/Header';
// import Footer from '../../assets/js/Footer';

const AdminLayout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const admin = await authAdminUtils.isAuthenticated();
            // console.log(admin);
            if (!admin) {
                console.log('hello1');
                navigate('/admin/login');
            }else{
                dispatch(setAdmin(admin));
                setLoading(false);
            }
        }
        checkAuth();
    }, [navigate]);
    return (
        loading ? (
            <Loading fullHeight/>
        ) :    
        (
            <Box sx={{
                display: 'flex',
            }}>
                <Box sx={{
                    flexGrow: 1,
                    p: 1,
                    width: 'max-content'
                }}>
                    <Outlet/>
                </Box>
            </Box>
        
        )
    )
}

export default AdminLayout;
