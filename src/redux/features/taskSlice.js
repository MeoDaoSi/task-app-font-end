import { createSlice } from '@reduxjs/toolkit';

const initialState = { value : [{}] };

export const taskSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setTasks: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setTasks } = taskSlice.actions;

export default taskSlice.reducer