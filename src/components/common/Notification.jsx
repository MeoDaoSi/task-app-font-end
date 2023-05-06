import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import notificationApi from '../../apis/notificationApi';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setNotifications } from '../../redux/features/notificationSlice';
import { Box, Typography, Badge } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings';

const ITEM_HEIGHT = 48;

export default function LongMenu() {
    const dispatch = useDispatch();
    const notifications = useSelector((state) => state.notification.value);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
        const getNotifications = async () => {
            try {
                const res = await notificationApi.getAll();
                console.log(res);
                dispatch(setNotifications(res.data));
            } catch (error) {
                alert(error.message);
            }
        }
        getNotifications();
    }, [dispatch])
    const options = [...notifications]

    return (
        <div>
        <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
        >
            <Badge badgeContent={options.length} color="primary">
                <NotificationsNoneIcon />
            </Badge>
        </IconButton>
        <Menu
            id="long-menu"
            MenuListProps={{
            'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
            style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: '30ch',
            },
            }}
        >
            <Typography
                sx={{ 
                    borderBottom: 1,
                    borderColor: 'divider',
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '2px 5px 0px 14px'
                }}
            >
                Notifications
                <IconButton size="small" sx={{
                    padding: '0px',
                    margin: '0px 2px 5px 0px'
                }}>
                    <SettingsIcon  />
                </IconButton>
            </Typography>
            {
            options.map((option) => (
            <MenuItem key={option._id} selected={option === 'Pyxis'} onClick={handleClose} size="small">
                {option.content}
            </MenuItem>
            ))}
        </Menu>
        </div>
    );
}