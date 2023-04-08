import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';


function MainFeaturedPost(props) {
    const { post } = props;

    return (
        <Paper
            sx={{
                position: 'relative',
                backgroundColor: 'grey.800',
                color: '#fff',
                mb: 4,
                mt: 2,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url(${post.image})`,
                width: '100%',
                height: '100vh',
                
            }}
        >
            {<img style={{ display: 'none' }} src={post.image} />}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    backgroundColor: 'rgba(0,0,0,.3)',
                }}
            />
            <Typography
                variant='h6'
                color="inherit"
                align="center"
                noWrap
                sx={{
                    display: 'flex',
                    flex: 1,
                    textDecoration: 'underline',
                    fontStyle: 'italic',
                    pt: 1, pl: 3, 
                }}
            >
                <Button color="inherit" component="a" href="/boards" size="large">{post.title} {post.icon}</Button>
            </Typography>
        </Paper>
    );
}

export default MainFeaturedPost;