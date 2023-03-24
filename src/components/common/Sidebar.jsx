import { useSelector, useDispatch } from 'react-redux';
import { Box, Drawer, List, ListItemButton, IconButton, Typography, ListItem } from '@mui/material';
import assets from '../../assets/index';
import { useNavigate, useParams } from 'react-router-dom'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import taskApi from '../../apis/taskApi';
import { useEffect } from 'react';
import { setTasks } from '../../redux/features/taskSlice';

const Sidebar = () => {
    const user = useSelector((state) => state.user.value)
    const tasks = useSelector((state) => state.task.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { taskId } = useParams;
    const sidebarWidth = 250;

    useEffect(() => {
        const getTasks = async () => {
            try {
                const res = await taskApi.getAll();
                console.log(res);
                // dispatch(setTasks(res));
                if (res.length > 0 && taskId === undefined ) {
                    // navigate(`boards/${res[0]._id}`)
                }
            } catch (error) {
                alert(error.message);
            }
        }
        getTasks();
    }, [])
    
    useEffect(() => {
        console.log(tasks);
    }, [tasks])
    

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <Drawer
            container={window.document.body}
            variant='permanent'
            open={true}
            sx={{
                width: sidebarWidth,
                height: '100%',
                '& > div' : { borderRight: 'none'}
            }}
        >
            <List
                disablePadding
                sx={{
                    width: sidebarWidth,
                    height: '100vh',
                    backgroundColor: assets.colors.secondary
                }}
            >
                <ListItem>
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <Typography variant='body2' fontWeight='700'>
                            {user.name}
                        </Typography>
                        <IconButton onClick={logout}>
                            <LogoutOutlinedIcon fontSize='small' />
                        </IconButton>
                    </Box>
                </ListItem>
                <Box sx={{ paddingTop: '10px'}}/>
                <ListItem>
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <Typography variant='body2' fontWeight='700'>
                            Favorite
                        </Typography>
                    </Box>
                </ListItem>
                <Box sx={{ paddingTop: '10px'}}/>
                <ListItem>
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <Typography variant='body2' fontWeight='700'>
                            Private
                        </Typography>
                        <IconButton >
                            <AddBoxOutlinedIcon fontSize='small' />
                        </IconButton>
                    </Box>
                </ListItem>
                
            </List>
        </Drawer>
    )
}

export default Sidebar;
