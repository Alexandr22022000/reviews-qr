import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    request_error: null,
};

const slice = createSlice({
    name: "statuses",
    initialState,
    reducers: {
        requestError: (state, { payload }) => {
            state.request_error = payload;
        },
    },
});

export const { requestError } = slice.actions;

export default slice.reducer;
