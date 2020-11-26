import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    login_errors: {
        email: null,
        password: null,
        google_login: null,
    },
    signup_errors: {
        email: null,
        name: null,
        password: null,
        confirm_password: null,
        recaptcha: null,
    },
    restore_request_errors: {
        email: null,
        recaptcha: null,
    },
    restore_errors: {
        password: null,
        confirm_password: null,
    },
    checkEmail: false,
    inProcess: false, //FIXME add process controller support
};

const slice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        addError: (state, {payload}) => {
            if (!payload.form) return initialState;

            const form = state[payload.form + "_errors"];
            if (!payload.field) {
                for (let key in form) form[key] = payload.msg;
            } else {
                form[payload.field] = payload.msg;
            }
        },
        setCheckEmail: state => {
            state.checkEmail = true;
        },
    }
});

export const {
    addError,
    setCheckEmail,
} = slice.actions;

export default slice.reducer;
