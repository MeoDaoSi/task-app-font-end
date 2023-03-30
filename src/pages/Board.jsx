import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import boardApi from '../apis/boardApi';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import { Box, IconButton, TextField } from '@mui/material'
import { setBoards } from '../redux/features/boardSlice'
// import { setFavouriteList } from '../redux/features/favouriteSlice'
import { useDispatch, useSelector } from 'react-redux'

let timer;
const timeout = 500;

const Board = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { boardId } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [sessions, setSessions] = useState([]);
    const [isFavourite, setIsFavourite] = useState(false);
    const [icon, setIcon] = useState('');

    const boards = useSelector((state) => state.board.value)

    useEffect(() => {
        const getBoard = async () => {
            try {
                const res = await boardApi.getOne(boardId);
                console.log(res);
                setTitle(res.data.title);
                setDescription(res.data.description);
                setSessions(res.data.sessions);
                setIsFavourite(res.data.isFavourite);
                setIcon(res.data.icon);
            } catch (error) {
                alert(error.message);
            }
        }
        getBoard();
    }, [boardId])

    const updateTitle = async (e) => {
        clearTimeout(timer);
        const newTitle = e.target.value;
        setTitle(newTitle);

        let temp = [...boards];
        const index = temp.findIndex(e => e._id === boardId);
        temp[index] = { ...temp[index], title: newTitle };
        
        dispatch(setBoards(temp));

        timer = setTimeout(async () => {
            try {
                await boardApi.update(boardId, { title: newTitle })
            } catch (err) {
                alert(err)
            }
        }, timeout);
    }

    const updateDescription = async (e) => {
        clearTimeout(timer)
        const newDescription = e.target.value
        setDescription(newDescription)
        timer = setTimeout(async () => {
            try {
                await boardApi.update(boardId, { description: newDescription })
            } catch (err) {
                alert(err)
            }
        }, timeout);
    }
    
    return (
        <>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%'
            }}>
                <IconButton variant='outlined'>
                    {
                        isFavourite ? (
                            <StarOutlinedIcon color='warning'/>
                        ) : (
                            <StarBorderOutlinedIcon/>
                        )
                    }
                </IconButton>
                <IconButton variant='outlined' color='error'>
                    <DeleteOutlinedIcon/>
                </IconButton>
            </Box>
            <Box sx={{ padding: '10px 50px' }} >
                <Box>
                    
                </Box>
                <TextField
                    value={title}
                    placeholder='Untitled'
                    variant='outlined'
                    onChange={updateTitle}
                    fullWidth
                    sx={{
                        '& .MuiOutlinedInput-input': { padding: 0 },
                        '& .MuiOutlinedInput-notchedOutline': { border: 'unset ' },
                        '& .MuiOutlinedInput-root': { fontSize: '2rem', fontWeight: '700' }
                    }}
                />
                <TextField
                    value={description}
                    placeholder='Add a description'
                    variant='outlined'
                    fullWidth
                    onChange={updateDescription}
                    multiline
                    sx={{
                        '& .MuiOutlinedInput-input': { padding: 0 },
                        '& .MuiOutlinedInput-notchedOutline': { border: 'unset ' },
                        '& .MuiOutlinedInput-root': { fontSize: '0.8rem' }
                    }}
                />
            </Box>
            {/* <Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <Button>
                        Add section
                    </Button>
                    <Typography >
                        
                    </Typography>
                </Box>
            </Box> */}
        </>
    )
}

export default Board;

