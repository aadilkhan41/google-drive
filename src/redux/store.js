import { configureStore } from '@reduxjs/toolkit';
import uploadReducer from './uploadSlice';
import userReducer from './userSlice';
import homeReducer from './homeSlice';

const store = configureStore({
    reducer: {
        uploader: uploadReducer,
        userProfile: userReducer,
        homeStorage: homeReducer,
    }
});

export default store;