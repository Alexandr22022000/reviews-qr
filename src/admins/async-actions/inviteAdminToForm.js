import HTTP from '../../core/HTTPS/index';
import setAdminsProcessing from '../actions/setAdminsProcessing';

const action = (email) => (dispatch, getState) => {
    dispatch(setAdminsProcessing(1));
    HTTP.post('/api/forms/invite_admin', {email, id: getState().forms.activeFormId}, dispatch)
        .then(data => {
            dispatch(setAdminsProcessing(-1));
        });
};

export default action;