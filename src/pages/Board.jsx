import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import boardApi from '../apis/boardApi';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import { Box, IconButton, TextField } from '@mui/material'
import { setBoards } from '../redux/features/boardSlice'
import { setFavoriteList } from '../redux/features/favoriteSlice'
import { useDispatch, useSelector } from 'react-redux'
import Kanban from '../components/common/Kanban';

let timer;
const timeout = 500;

const Board = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { boardId } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [sections, setSections] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const [icon, setIcon] = useState('');

    const boards = useSelector((state) => state.board.value)
    const favoriteList = useSelector((state) => state.favorites.value )

    useEffect(() => {
        const getBoard = async () => {
            try {
                const res = await boardApi.getOne(boardId);
                setTitle(res.data.title);
                setDescription(res.data.description);
                setSections(res.data.sections);
                setIsFavorite(res.data.favorite);
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

        if (isFavorite) {
            let tempFavorite = [...favoriteList]
            const FavoriteIndex = tempFavorite.findIndex(e => e._id === boardId)
            tempFavorite[FavoriteIndex] = { ...tempFavorite[FavoriteIndex], title: newTitle }
            dispatch(setFavoriteList(tempFavorite))
        }
        
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

    const addFavorite = async () => {
        try {
            const board = await boardApi.update( boardId, { favorite: isFavorite ? false : true })
            let newFavoriteList = [...favoriteList];
            let newBoardList = [...boards];
            if (isFavorite) {
                newFavoriteList = newFavoriteList.filter(e => e._id !== boardId);
                newBoardList.unshift(board.data);
            } else {
                newFavoriteList.unshift(board.data);
                newBoardList = newBoardList.filter(e => e._id !== boardId);
            }
            dispatch(setBoards(newBoardList));
            dispatch(setFavoriteList(newFavoriteList))
            setIsFavorite(!isFavorite)
        } catch (error) {
            alert(error.message)
        }
    }

    const deleteBoard = async () => {
        try {
            await boardApi.delete(boardId)
            if (isFavorite) {
                const newFavoriteList = favoriteList.filter(e => e._id !== boardId)
                dispatch(setFavoriteList(newFavoriteList))
            }
        
            const newList = boards.filter(e => e._id !== boardId)
            if( newList.length === 0 ) {
                navigate('/boards')
            }else {
                navigate(`/boards/${newList[0]._id}`)
            }
            dispatch(setBoards(newList))
        }catch (err) {
            alert(err)
        }
    }
    
    return (
        <>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%'
            }}>
                <IconButton variant='outlined' onClick={addFavorite}>
                    {
                        isFavorite ? (
                            <StarOutlinedIcon color='warning'/>
                        ) : (
                            <StarBorderOutlinedIcon/>
                        )
                    }
                </IconButton>
                <IconButton variant='outlined' color='error' onClick={deleteBoard}>
                    <DeleteOutlinedIcon/>
                </IconButton>
            </Box>
            <Box sx={{ padding: '10px 50px' }} >
                <Box>
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
                <Box>
                    <Kanban data={sections} boardId={boardId}/>
                </Box>
            </Box>
        </>
    )
}

export default Board;

