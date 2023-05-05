import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from 'react';
import taskApi from '../../apis/taskApi'

export default function BasicDatePicker(props) {
    const [value, setValue] = useState();
    console.log(props.taskId);
    const handleDate = async (e) => {
        const Date = e.$d.getTime();
        console.log(Date);
        try {
            await taskApi.update(props.taskId, { dueDate: Date})
        } catch (error) {
            alert(error);
        }
    }
    // const updateTitle = async (e) => {
    //     clearTimeout(timer)
    //     const newTitle = e.target.value
    //     timer = setTimeout(async () => {
    //         try {
    //             await taskApi.update(task._id, { title: newTitle })
    //         } catch (err) {
    //             alert(err)
    //         }
    //     }, timeout)
    //     task.title = newTitle
    //     setTitle(newTitle)
    //     props.onUpdate(task)
    // }
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} >
        <DemoContainer components={['DatePicker']}>
            <DatePicker
                value={value}
                onChange={handleDate}
                // onChange={(newValue) => setValue(newValue)}
            />
        </DemoContainer>
        </LocalizationProvider>
    );
}