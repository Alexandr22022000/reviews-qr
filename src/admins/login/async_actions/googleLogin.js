import HTTP from '../../core/HTTPS/index';
import setUser from '../../users/actions/setUser';
import addError from '../actions/addError';

const login = (email, name, img, token) => (dispatch, getState) => {
    HTTP.post('/api/google_login', {email, name, img, token}, dispatch)
        .then(data => {
            if (data.message === "Incorrect google token") return dispatch(addError('login', 'google_login', 'Incorrect google token, please login by password'));

            dispatch(setUser(data.name, data.email, data.img));
        });
};

export default login;