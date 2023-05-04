import { Box, Button, Typography, Divider, TextField, IconButton, Card } from '@mui/material';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import sectionApi from '../../apis/sectionApi';
import taskApi from '../../apis/taskApi';
import Task from './Task'
import AlarmIcon from '@mui/icons-material/Alarm';

let timer
const timeout = 500

const Kanban = props => {
    const boardId = props.boardId;
    const [data, setData] = useState([]);
    const [selectedTask, setSelectedTask] = useState(undefined);

    useEffect( () => {
        setData(props.data);
    },[props.data])

    const onDragEnd = async ({ source, destination }) => {
        if (!destination) return;
        if (!source) return;

        const sourceIndex = data.findIndex(e => e._id === source?.droppableId)
        const destIndex = data.findIndex(e => e._id === destination?.droppableId)

        const sourceSection = data[sourceIndex]
        const destSection = data[destIndex]
    
        const sourceId = sourceSection._id
        const destId = destSection._id
    
        const sourceTasks = [...sourceSection.tasks]
        const destTasks = [...destSection.tasks]
    
        if ( source?.droppableId !== destination?.droppableId ) {
            const [removed] = sourceTasks.splice(source?.index, 1)
            destTasks.splice(destination?.index, 0, removed)
            data[sourceIndex].tasks = sourceTasks
            data[destIndex].tasks = destTasks
        } else {
            const [removed] = destTasks.splice(source?.index, 1)
            destTasks.splice(destination?.index, 0, removed)
            data[destIndex].tasks = destTasks
        }
        try {
            await taskApi.updatePriority({
                sourceList: sourceTasks,
                destList: destTasks,
                sourceSectionId: sourceId,
                destSectionId: destId
            })
            setData(data)
        }catch (err) {
            alert(err)
        }
    }
    const createSection = async () => {
        try {
            const section = await sectionApi.create(boardId)
            setData([...data, section.data])
        } catch (err) {
            alert(err)
        }
    }
    const deleteSection = async (sectionId) => {
        try {
            await sectionApi.delete(boardId, sectionId);
            const newData = [...data].filter(e => e._id !== sectionId );
            setData(newData);
        } catch (err) {
            alert(err);
        }
    }
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        // setSelectedDate(date);
    };

    const updateSectionTitle = async (e, sectionId) => {
        clearTimeout(timer)
        const newTitle = e.target.value
        const newData = [...data]
        const index = newData.findIndex(e => e._id === sectionId)
        newData[index].title = newTitle
        setData(newData)
        timer = setTimeout(async () => {
            try {
                await sectionApi.update(boardId, sectionId, { title: newTitle })
            } catch (err) {
                alert(err)
            }
        }, timeout);
    }

    const createTask = async (sectionId) => {
        try {
            const task = await taskApi.create({ sectionId })
            const newData = [...data]
            const index = newData.findIndex(e => e._id === sectionId)
            newData[index].tasks.unshift(task.data)
            setData(newData)
        } catch (err) {
            alert(err)
        }
    }

    const onUpdateTask = (task) => {
        const newData = [...data]
        const sectionIndex = newData.findIndex(e => e._id === task?.section)
        const taskIndex = newData[sectionIndex]?.tasks.findIndex(e => e._id === task._id)
        if(taskIndex){
            newData[sectionIndex].tasks[taskIndex] = task
        }
        setData(newData)
    }

    const onDeleteTask = (task) => {
        const newData = [...data]
        const sectionIndex = newData.findIndex(e => e._id === task.section)
        const taskIndex = newData[sectionIndex].tasks.findIndex(e => e._id === task._id)
        newData[sectionIndex].tasks.splice(taskIndex, 1)
        setData(newData)
    }

    return (
        <>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Button onClick={createSection} >
                    Add section
                </Button>
                <Typography >
                    {data.length} Sections
                </Typography>
            </Box>
            
            <Divider sx={{ margin: '10px 0'}} />
            <DragDropContext onDragEnd={onDragEnd}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    width: 'calc(100vw - 400px)',
                    overflowX: 'auto'
                }}>
                    {
                        data.map( section => (
                            <div key={section?._id} style={{ width: '300px' }}>
                                <Droppable key={section?._id} droppableId={section?._id} >
                                    {(provided) => (
                                        <Box
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            sx={{
                                                width: '300px',
                                                padding: '10px',
                                                marginRight: '10px'
                                            }}
                                        >
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                marginBottom: '10px'
                                            }}>
                                                <TextField
                                                    value={section?.title}
                                                    onChange={(e) => updateSectionTitle(e, section._id)}
                                                    placeholder='untitled'
                                                    variant='outlined'
                                                    sx={{
                                                        flexGrow: 1,
                                                        '& .MuiOutlinedInput-input': { padding: 0 },
                                                        '& .MuiOutlinedInput-notchedOutline': { border: 'unset ' },
                                                        '& .MuiOutlinedInput-root': { fontSize: '1rem', fontWeight: '700' }
                                                    }}
                                                />
                                                <IconButton
                                                    variant='outlined'
                                                    size='small'
                                                    sx={{
                                                        color: 'gray',
                                                        '&:hover': { color: 'green' }
                                                    }}
                                                    onClick={() => createTask(section._id)}
                                                >
                                                    <AddOutlinedIcon />
                                                </IconButton>
                                                    <IconButton
                                                    variant='outlined'
                                                    size='small'
                                                    sx={{
                                                        color: 'gray',
                                                        '&:hover': { color: 'red' }
                                                    }}
                                                    onClick={() => deleteSection(section._id)}
                                                >
                                                    <DeleteOutlinedIcon />
                                                </IconButton>
                                            </Box>
                                            {
                                                section.tasks.map((task, index) => (
                                                <Draggable key={task?._id} draggableId={task?._id} index={index}>
                                                    {(provided, snapshot) => (
                                                    <Card
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        sx={{
                                                            padding: '10px',
                                                            marginBottom: '10px',
                                                            cursor: snapshot.isDragging ? 'grab' : 'pointer!important'
                                                        }}
                                                        onClick={() => setSelectedTask(task)}
                                                    >
                                                        <Typography>
                                                            {task?.title === '' ? 'Untitled' : task?.title}
                                                            
                                                        </Typography>
                                                        <IconButton size="small">
                                                            <AlarmIcon />
                                                        </IconButton>
                                                        5/4/2023
                                                    </Card>
                                                    )}
                                                </Draggable>
                                                ))
                                            }
                                            {provided.placeholder}
                                        </Box>
                                    )}
                                </Droppable>
                            </div>
                        ))
                    }
                </Box>
            </DragDropContext>
            <Task
                task={selectedTask}
                boardId={boardId}
                onClose={() => setSelectedTask(undefined)}
                onUpdate={onUpdateTask}
                onDelete={onDeleteTask}
            />
        </>
    )
}

export default Kanban;
