import { Box } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';

const Home = () => {
    return (
        <Box sx={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <LoadingButton
                variant='outlined'
                color='success'
            >
                Click here to create your first board
            </LoadingButton>
        </Box>
    )
}

export default Home;

