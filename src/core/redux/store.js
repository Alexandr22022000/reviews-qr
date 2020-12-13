import { configureStore, combineReducers } from '@reduxjs/toolkit'
import thunkMiddleware from "redux-thunk";

import statuses from "./viewStatusesSlice";
import user from "../../users/reducers/user";
import login from "../../login/redux/viewLoginSlice";
import companies from "../../companies/redux/viewCompaniesSlice";
import forms from "../../froms/reducers/forms";
import admins from "../../admins/reducers/admins";

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
    middleware: [thunkMiddleware]
});
