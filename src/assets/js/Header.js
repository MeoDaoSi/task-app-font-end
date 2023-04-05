import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import image from '../images/logo_size.jpg';
import Grid from '@mui/material/Grid';

function Header(props) {
    const { sections, title } = props;
    console.log(image);

    return (
        <React.Fragment>
        <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Grid item xs={12} md={12}>
                <CardActionArea component="a" href="#" inline='block' >
                        <CardMedia
                            component="img"
                            sx={{ width: 70, display: { xs: 'none', sm: 'block' }, mt: 2, mb: 2, ml: 2, mr: 2 }}
                            image={image}
                        />
                </CardActionArea>
            </Grid>
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