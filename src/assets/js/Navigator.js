import * as React from 'react';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import TimerIcon from '@mui/icons-material/Timer';
import SettingsIcon from '@mui/icons-material/Settings';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Box, Drawer, List, ListItemButton, IconButton, Typography, ListItem } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom'


import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import image from '../images/imageedit_1_6003449786.png';
import Grid from '@mui/material/Grid';
import authAdminApi from '../../apis/authAdminApi'

const categories = [
    {
        id: 'Overview',
        children: [
            {
                id: 'User',
                icon: <PeopleIcon />,
                active: true,
            },
            // { id: 'Database', icon: <DnsRoundedIcon /> },
            // { id: 'Storage', icon: <PermMediaOutlinedIcon /> },
            // { id: 'Hosting', icon: <PublicIcon /> },
            // { id: 'Functions', icon: <SettingsEthernetIcon /> },
            // {
            //     id: 'Machine learning',
            //     icon: <SettingsInputComponentIcon />,
            // },
        ],
    },
    // {
    //     id: 'Quality',
    //     children: [
    //         { id: 'Analytics', icon: <SettingsIcon /> },
    //         { id: 'Performance', icon: <TimerIcon /> },
    //         { id: 'Test Lab', icon: <PhonelinkSetupIcon /> },
    //     ],
    // },
];

    const item = {
    py: '2px',
    px: 3,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover, &:focus': {
        bgcolor: 'rgba(255, 255, 255, 0.08)',
    },
    };

    const itemCategory = {
    boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
    py: 1.5,
    px: 3,
};

export default function Navigator(props) {
    const navigate = useNavigate();
    const { ...other } = props;
    const logout = async () => {
        try {
            await authAdminApi.logout();
            localStorage.removeItem('tokenAdmin');
            navigate('/admin/login');
        } catch (error) {
            alert(error.message);
        }
    }
    return (
        <Drawer variant="permanent" {...other} sx={{ width: 100, display: 'flex' }}>
            <List disablePadding>
                <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff', display: 'flex' }}>
                    <Grid>
                        <CardActionArea >
                            <CardMedia
                                component="img"
                                sx={{ width: 100, display: 'flex' }}
                                image={image}
                            />
                        </CardActionArea>
                    </Grid>
                        <CardActionArea component='h5' >
                            ADMIN
                        </CardActionArea>
                        
                    
                </ListItem>
                <ListItem sx={{ ...item, ...itemCategory }}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText>
                        Admin
                    </ListItemText>
                    <IconButton onClick={logout} color=''>
                            <LogoutOutlinedIcon style={{ color: 'ffffff' }} fontSize='small' />
                    </IconButton>
                </ListItem>
                {categories.map(({ id, children }) => (
                    <Box key={id} sx={{ bgcolor: '#101F33' }}>
                        <ListItem sx={{ py: 2, px: 3 }}>
                        <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
                        </ListItem>
                        {children.map(({ id: childId, icon, active }) => (
                        <ListItem disablePadding key={childId}>
                            <ListItemButton selected={active} sx={item}>
                            <ListItemIcon>{icon}</ListItemIcon>
                            <ListItemText>{childId}</ListItemText>
                            </ListItemButton>
                        </ListItem>
                        ))}

                        <Divider sx={{ mt: 2 }} />
                    </Box>
                ))}
            </List>
        </Drawer>
    );
}