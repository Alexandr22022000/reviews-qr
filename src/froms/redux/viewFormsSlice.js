
import SEARCH from "../../core/constants/search";
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    forms: null,
    activeForm: null,
    questions: null,
    activeFormId: null,
    searchType: SEARCH.FORMS,
};


const slice = createSlice({
    name: 'forms',
    initialState,
    reducers: {
        setForms: (state, {payload}) => {
            state.forms = payload.forms;
        },
        setActiveForm: (state, {payload}) => {
            state.activeForm = payload.form; state.questions = payload.form.questions;
        },
        setActiveFormId: (state, {payload}) =>{
            state.activeFormId = payload.id;
        },
        setSearchType: (state , {payload}) =>{
            state.searchType = payload.searchType;
        }


    }
});

export const {
    setForms,
    setActiveForm,
    setActiveFormId,
    setSearchType
} = slice.actions;

export default slice.reducer;


