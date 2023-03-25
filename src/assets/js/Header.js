import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Header(props) {
    const { sections, title } = props;

    return (
        <React.Fragment>
        <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Button component="a" href="#" size="medium">PlanET</Button>
            <Button component="a" href="#" size="medium">Workspace</Button>
            <Typography
                component="a"
                variant="h5"
                color="inherit"
                align="center"
                noWrap
                sx={{ flex: 1 }}
            >

            </Typography>
            <Button variant="outlined" size="small" component="a" href="#">
                Sign up
            </Button>
        </Toolbar>
        </React.Fragment>
    );
}

export default Header;