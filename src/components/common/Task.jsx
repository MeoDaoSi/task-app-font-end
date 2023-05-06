import { Backdrop, Fade, IconButton, Modal, Box, TextField, Typography, Divider } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import Moment from 'moment'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import taskApi from '../../apis/taskApi'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BasicDatePicker from '../common/Date'
import notificationApi from '../../apis/notificationApi';

import '../../css/custom_editor.css'

let timer
const timeout = 500
let isModalClosed = false

const modalStyle = {
    outline: 'none',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 24,
    p: 1,
    height: '80%'
}

const Task = props => {
    const boardId = props.boardId;
    const [task, setTask] = useState(props.task);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [expiringTasks, setExpiringTasks] = useState([]);

    const editorWrapperRef = useRef()

    useEffect(() => {
        setTask(props.task)
        setTitle(props.task !== undefined ? props.task.title : '')
        setDescription(props.task !== undefined ? props.task.description : '')
        if (props.task !== undefined) {
            isModalClosed = false;
            updateEditorHeight()
        }
    }, [props.task])
    useEffect(  () => {
        const interval = setInterval(() => {
            const getTasks = async () => {
                try {
                    const res = await taskApi.getAll();
                    const tasks = res.data;
                    const now = new Date();
                    const expiringTasks = tasks.filter((task) => {
                        const exprDate = new Date(task.dueDate);
                        const timeRemaining = exprDate.getTime() - now.getTime();
                        const hoursRemaining = timeRemaining / (1000 * 60 * 60);
                        return hoursRemaining <= 24
                    })
                    setExpiringTasks(expiringTasks);
                } catch (error) {
                    alert(error.message);
                }
                return;
            }
            getTasks();
        }, 1000 * 60 * 60 * 24);
    
        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        expiringTasks.forEach((task) => {
            const now = new Date();
            const createNoti = async () => {
                const exprDate = new Date(task.dueDate);
                const timeRemaining = exprDate.getTime() - now.getTime();
                const hoursRemaining = timeRemaining / (1000 * 60 * 60);
                try {
                    await notificationApi.create({taskId: task._id,content: `${task.title} due in tomorrow`});
                } catch (error) {
                    alert(error.message);
                }
            }
            createNoti();
        });
    }, [expiringTasks]);

    const updateEditorHeight = () => {
        setTimeout(() => {
            if (editorWrapperRef.current) {
                const box = editorWrapperRef.current
                box.querySelector('.ck-editor__editable_inline').style.height = (box.offsetHeight - 50) + 'px'
            }
        }, timeout)
    }
    
    const onClose = () => {
        isModalClosed = true;
        props.onUpdate(task);
        props.onClose();
    }
    const deleteTask = async () => {
        try {
            await taskApi.delete(task._id);
            props.onDelete(task);
            setTask(undefined);
        } catch (error) {
            alert(error);
        }
    }

    const updateTitle = async (e) => {
        clearTimeout(timer)
        const newTitle = e.target.value
        timer = setTimeout(async () => {
            try {
                await taskApi.update(task._id, { title: newTitle })
            } catch (err) {
                alert(err)
            }
        }, timeout)
        task.title = newTitle
        setTitle(newTitle)
        props.onUpdate(task)
    }
    const updateDescription = async (event, editor) => {
        clearTimeout(timer)
        const stringWithHtml = editor.getData()
        const data = '';
        
        if (!isModalClosed) {
            timer = setTimeout(async () => {
                try {
                    // convert html to string
                    const data = stringWithHtml.replace(/<\/?[^>]+(>|$)/g, "");
                    await taskApi.update(task._id, { description: data })
                } catch (err) {
                    alert(err)
                }
            }, timeout);
    
            task.description = data
            setDescription(data)
            props.onUpdate(task)
        }
    }

    return (
        <Modal
            open={task !== undefined}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500 }}
        >
            <Fade in={task !== undefined}>
                <Box sx={modalStyle}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        width: '100%'
                    }}>
                        <IconButton variant='outlined' color='error' onClick={deleteTask}>
                            <DeleteOutlinedIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        height: '100%',
                        flexDirection: 'column',
                        padding: '2rem 5rem 5rem'
                    }}>
                        <TextField
                            value={title}
                            onChange={updateTitle}
                            variant='outlined'
                            fullWidth
                            sx={{
                                width: '100%',
                                '& .MuiOutlinedInput-input': { padding: 0 },
                                '& .MuiOutlinedInput-notchedOutline': { border: 'unset ' },
                                '& .MuiOutlinedInput-root': { fontSize: '2.5rem', fontWeight: '700' },
                                marginBottom: '10px'
                            }}
                        />
                        <Box>
                            <BasicDatePicker
                                taskId={task?._id}
                                task={task}
                                onUpdateTask={props.onUpdate}
                            />
                        </Box>
                        
                        <Divider sx={{ margin: '1.5rem 0' }} />
                        <Box
                            ref={editorWrapperRef}
                            sx={{
                                position: 'relative',
                                height: '80%',
                                overflowX: 'hidden',
                                overflowY: 'auto'
                            }}
                        >
                            <CKEditor
                                editor={ClassicEditor}
                                data={description}
                                onChange={updateDescription}
                                onFocus={updateEditorHeight}
                                onBlur={updateEditorHeight}
                            />
                        </Box>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    )
}

export default Task
