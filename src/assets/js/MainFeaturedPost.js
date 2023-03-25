import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';

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
        <Grid container>
            <Grid item md={3} mt= {2} mb= {2} ml= {4} mr= {2}>
                <CardActionArea component="a" href="#">
                        <Typography component="h7" variant="h5" sx={{textDecoration: 'underline', fontStyle: 'italic'}}>
                            {post.title}
                        </Typography>
                        <Typography component="h7" variant="h5" sx={{textDecoration: 'underline', fontStyle: 'italic'}} ml= {1} >
                            {post.icon}
                        </Typography>
                </CardActionArea>
            </Grid>
        </Grid>
        </Paper>
    );
}

export default MainFeaturedPost;