import {combineReducers} from 'redux';
import statuses from './statuses';
import user from '../../users/reducers/user';
import login from '../../login/reducers/login';
import companies from '../../companies/reducers/companies';
import forms from '../../froms/reducers/forms';
import admins from '../../admins/reducers/admins';

const mainReducer = combineReducers({
    statuses,
    user,
    login,
    companies,
    forms,
    admins,
});

export default mainReducer;