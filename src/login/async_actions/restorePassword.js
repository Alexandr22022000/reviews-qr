import HTTP from '../../core/HTTPS/index';
import setUser from '../../users/actions/setUser';

const login = (password, token) => (dispatch, getState) => {
    HTTP.post('/api/restore_password', {token, password}, dispatch)
        .then(data => {
            //FIXME add token outdated case
            dispatch(setUser(data.name, data.email, data.img));
        });
};

export default login;