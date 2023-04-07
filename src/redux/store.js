import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import boardReducer from './features/boardSlice';
import favoriteReducer from './features/favoriteSlice';
import adminReducer from './features/adminSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        board: boardReducer,
        favorites: favoriteReducer,
        admin: adminReducer
    }
})
