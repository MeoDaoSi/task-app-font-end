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

function Header() {
    return (
        <React.Fragment>
            <Toolbar sx={{ 
                borderBottom: 1,
                borderColor: 'divider',
                display: 'flex',
            }}>
                <Grid>
                    <CardActionArea component="a" href="#" inline='block' >
                            <CardMedia
                                component="img"
                                sx={{ width: 70, mt: 2, mb: 2, ml: 2, mr: 2 }}
                                image={image}
                            />
                    </CardActionArea>
                </Grid>
                <Typography
                    color="inherit"
                    align="center"
                    noWrap
                    sx={{
                        display: 'flex',
                        flex: 1,
                    }}
                >
                    <Button component="a" href="#" size="large">Home</Button>
                    <Button component="a" href="#" size="large">Workspace</Button>
                    <Button component="a" href="#" size="large">Workspace</Button>
                    <Button component="a" href="#" size="large">Workspace</Button>
                    <Button component="a" href="#" size="large">Workspace</Button>
                </Typography>
                <Button variant="outlined" size="medium" component="a" href="#">
                    Sign up
                </Button>
            
            </Toolbar>
        </React.Fragment>
    );
}

export default Header;