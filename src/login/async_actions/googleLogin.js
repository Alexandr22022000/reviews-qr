import HTTP from '../../core/HTTPS/index';
import setUser from '../../users/actions/setUser';
import addError from '../actions/addError';

const login = (email, name, img, token) => (dispatch, getState) => {
    HTTP.post('/api/google_login', {email, name, img, token}, dispatch)
        .then(data => {
            if (data.message === "User already exist") return dispatch(addError('login', 'google_login', 'User with this email already exist, please login by password'));

            dispatch(setUser(data.name, data.email, data.img));
        });
};

export default login;