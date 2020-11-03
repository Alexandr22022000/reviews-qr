import HTTP from '../../core/HTTPS/index';

const login = () => (dispatch, getState) => {
    HTTP.post('/api/logout', {}, dispatch);
};

export default login;