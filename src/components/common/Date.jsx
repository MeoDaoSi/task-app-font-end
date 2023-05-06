import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from 'react';
import taskApi from '../../apis/taskApi'
import dayjs from 'dayjs';

export default function BasicDatePicker(props) {
    const [value, setValue] = React.useState(dayjs(props.task?.dueDate));
    const handleDate = async (e) => {
        const date = e.$d.getTime();
        try {
            await taskApi.update(props.taskId, { dueDate: date})
        } catch (error) {
            alert(error);
        }
        props.task.dueDate = date
        props.onUpdateTask(props.task)
    }
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} >
        <DemoContainer components={['DatePicker']}>
            <DatePicker
                value={value}
                onChange={handleDate}
                minDate={dayjs((new Date()).getTime() + (1000 * 60 * 60 * 24))}
            />
        </DemoContainer>
        </LocalizationProvider>
    );
}