import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import notificationApi from '../../apis/notificationApi';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setNotifications } from '../../redux/features/notificationSlice';

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
    const options = notifications.map((element) => {
        return element['content'];
    })

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
            <NotificationsNoneIcon />
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
                width: '25ch',
            },
            }}
        >
            {options.map((option) => (
            <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                {option}
            </MenuItem>
            ))}
        </Menu>
        </div>
    );
}