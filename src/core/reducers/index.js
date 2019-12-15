import {combineReducers} from 'redux';
import statuses from './statuses';
import user from '../../users/reducers/user';
import login from '../../login/reducers/login';

const mainReducer = combineReducers({
    statuses,
    user,
    login,
});

export default mainReducer;