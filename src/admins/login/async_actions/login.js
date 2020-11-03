import HTTP from '../../core/HTTPS/index';
import setUser from '../../users/actions/setUser';
import addError from "../actions/addError";

const login = (email, password) => (dispatch, getState) => {
    HTTP.post('/api/login', {email, password}, dispatch)
        .then(data => {
            if (data.message === "Invalid email") return dispatch(addError('login', 'email', 'User not found'));
            if (data.message === "Invalid password") return dispatch(addError('login', 'password', 'Incorrect password'));

            dispatch(setUser(data.name, data.email, data.img));
        })
};

export default login;