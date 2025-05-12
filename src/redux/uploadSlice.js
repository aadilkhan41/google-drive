import { createSlice } from '@reduxjs/toolkit';

const uploadSlice = createSlice({
    name: 'uploader',
    initialState: { file: null, fileType: null, percentage: null },
    reducers: {
        updateFile: (state, action) => { state.file = action.payload },
        updateFileType: (state, action) => { state.fileType = action.payload },
        updatePercentage: (state, action) => { state.percentage = action.payload }
    }
});

export const { updateFile, updateFileType, updatePercentage } = uploadSlice.actions;
export default uploadSlice.reducer;