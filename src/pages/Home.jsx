import { Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch } from "react-redux";
import { setTasks } from "../redux/features/taskSlice";
import { useNavigate } from "react-router-dom";
import taskApi from "../apis/taskApi";
import { useState } from "react";


const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const createTask = async () => {
        setLoading(true);
        try {
            const res = taskApi.create();
            console.log(res);
            // dispatch(setTasks([res]));
            navigate(`/boards/${res._id}`);
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
                onClick={createTask}
                loading={loading}
            >
                Click here to create your first board
            </LoadingButton>
        </Box>
    )
}

export default Home;

