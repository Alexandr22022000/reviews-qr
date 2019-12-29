import HTTP from '../../core/HTTPS/index';
import getForm from '../../froms/async-actions/getForm';

const action = (admin_id) => (dispatch, getState) => {
    HTTP.post('/api/forms/reject_admin', {admin_id, id: getState().forms.activeFormId}, dispatch)
        .then(data => {
            dispatch(getForm(getState().forms.activeFormId));
        });
};

export default action;