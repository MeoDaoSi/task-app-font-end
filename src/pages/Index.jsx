import { Box, Button, Container, Typography } from '@mui/material';
import assets from '../assets/index';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import MainFeaturedPost from '../assets/js/MainFeaturedPost';
import FeaturedPost from '../assets/js/FeaturedPost';
import Footer from '../assets/js/Footer';
import Header from '../assets/js/Header';

const Home = () => {

    const theme = createTheme();

    const mainFeaturedPost = {
        title: 'Introducing PlanET',
        icon: <ExpandMoreIcon/>, 
        image: 'https://images.ctfassets.net/rz1oowkt5gyp/75rDABL8fyMtNLlUAtBxrg/c5e145977a86c41c47e17c69410c64f7/TrelloUICollage_4x.png?w=1140&fm=webp',
    };

    const featuredPosts = [
        {
            title: 'Integrations',
            description:
                'This is a wider card with supporting text below as a natural lead-in to additional content.',
            image: 'https://images.ctfassets.net/rz1oowkt5gyp/gMfkjoA3yWYG3kat3qjpW/3902bfdfccf08869e33d63bbc9d1969b/Integrations_Puzzle.svg',
        },
        {
            title: 'Butler Automation',
            description:
                'This is a wider card with supporting text below as a natural lead-in to additional content.',
            image: 'https://images.ctfassets.net/rz1oowkt5gyp/7wxRW93hvb7858bMsK4LSs/f6fc44fb23dbc6ee9bc6a7f6e2af0fb7/Gears.svg',
            imageLabel: 'Image Text',
        },
    ];

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header />
                <main>
                <MainFeaturedPost post={mainFeaturedPost} />
                <Grid container spacing={4}>
                    {featuredPosts.map((post) => (
                    <FeaturedPost key={post.title} post={post} />
                    ))}
                </Grid>
                {/* <Grid container spacing={5} sx={{ mt: 3 }}>
                    <Main title="From the firehose" posts={posts} />
                    <Sidebar
                    title={sidebar.title}
                    description={sidebar.description}
                    archives={sidebar.archives}
                    social={sidebar.social}
                    />
                </Grid> */}
                </main>
            </Container>
            <Footer
                title="Footer"
                description="Something here to give the footer a purpose!"
            />
        </ThemeProvider>
    );
};

export default Home;
