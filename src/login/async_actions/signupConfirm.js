import HTTP from '../../core/HTTPS/index';
import setUser from '../../users/actions/setUser';

const login = (token) => (dispatch, getState) => {
    HTTP('/api/signup_confirm', {token}, dispatch)
        .then(data => {
            dispatch(setUser(data.name, data.email, data.img));
        });
};

export default login;