import { Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch } from "react-redux";
import { setBoards } from "../redux/features/boardSlice";
import { useNavigate } from "react-router-dom";
import boardApi from "../apis/boardApi";
import { useState } from "react";


const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const createBoard = async () => {
        setLoading(true);
        try {
            const res = await boardApi.create();
            console.log(res);
            dispatch(setBoards([res.data]));
            navigate(`/boards/${res.data._id}`);
        } catch (error) {
            alert(error.message);
        }finally{
            setLoading(false);
        }
    }


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
                onClick={createBoard}
                loading={loading}
            >
                Click here to create your first board
            </LoadingButton>
        </Box>
    )
}

export default Home;

