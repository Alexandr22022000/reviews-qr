import SEARCH from "../../core/constants/search";
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    companies: null,
    activeCompanyId: SEARCH.COMPANY_ALL,
    activeCompany: null,
    addButtonStatus: -1,
};

const slice = createSlice({
    name: 'companies',
    initialState,
    reducers: {
        setCompanies: (state, {payload}) => {
            state.companies = payload.companies;
        },
        setActiveCompanyId:  (state, {payload} ) => {
            state.activeCompanyId = payload.id
        },
        setActiveCompany: (state, {payload}) => {
            state.activeCompany = payload.company
        },
        setAddButtonStatus: (state, {payload}) => {
            state.addButtonStatus = payload.status
        }

    }
});

export const {
    setCompanies,
    setActiveCompanyId,
    setActiveCompany,
    setAddButtonStatus
} = slice.actions;

export default slice.reducer;
