import HTTP from '../../core/HTTPS/index';
import setUser from '../../users/actions/setUser';

const login = (token) => (dispatch, getState) => {
    HTTP.post('/api/signup_confirm', {token}, dispatch)
        .then(data => {
            //FIXME add token outdated case
            dispatch(setUser(data.name, data.email, data.img));
        });
};

export default login;