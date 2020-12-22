import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: null,
    img: null,
    email: null,
};

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, {payload}) => {
            state.name = payload.name; state.img = payload.img; state.email = payload.email;
        },
    }
});


export const {
    setUser,
} = slice.actions;

export default slice.reducer;
