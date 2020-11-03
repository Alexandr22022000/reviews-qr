import HTTP from '../../core/HTTPS/index';
import setActiveForm from '../actions/setActiveForm';
import getForm from './getForm';

const action = (id, name, img, style, msg) => (dispatch, getState) => {
    dispatch(setActiveForm(null));
    HTTP.post('/api/forms/update', {id, name, img, style, msg}, dispatch)
        .then(data => {
            dispatch(getForm());
        });
};

export default action;