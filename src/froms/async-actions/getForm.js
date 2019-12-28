import HTTP from '../../core/HTTPS/index';
import setActiveForm from '../actions/setActiveForm';

const action = (id) => (dispatch, getState) => {
    HTTP.get('/api/forms/search', {id}, dispatch)
        .then(data => {
            dispatch(setActiveForm(data.form));
        });
};

export default action;