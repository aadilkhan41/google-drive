import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'userProfile',
    initialState: { 
        uid: null,
        profile: null,
        name: null,
        email: null,
        docid: null
    },
    reducers: {
        updateProp: (state, action) => {
            state[action.payload.propName] = action.payload.data;
        }
    }
});

export const { updateProp } = userSlice.actions;
export default userSlice.reducer;