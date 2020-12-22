import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    processingStatus: 0,
};

const slice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setAdminsProcessing: (state, {payload}) => {
            state.processingStatus = payload.processingStatus;
        },
    }
});

export const {
    setAdminsProcessing,
} = slice.actions;

export default slice.reducer;
