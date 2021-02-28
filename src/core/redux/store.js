import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";

import statuses from "./viewStatusesSlice";
import user from "../../users/redux/user";
import login from "../../login/redux/viewLoginSlice";
import companies from "../../companies/redux/viewCompaniesSlice";
import forms from "../../froms/redux/viewFormsSlice";
import admins from "../../admins/redux/viewAdminsSlice";

const mainReducer = combineReducers({
    statuses,
    user,
    login,
    companies,
    forms,
    admins,
});

export default configureStore({
    reducer: mainReducer,
    middleware: [thunkMiddleware],
});
