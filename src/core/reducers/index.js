import {combineReducers} from 'redux';
import statuses from './statuses';
import user from '../../users/reducers/user';
import login from '../../login/reducers/login';
import companies from '../../companies/reducers/companies';

const mainReducer = combineReducers({
    statuses,
    user,
    login,
    companies,
});

export default mainReducer;