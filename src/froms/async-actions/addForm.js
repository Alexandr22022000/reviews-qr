import HTTP from '../../core/HTTPS/index';
import setActiveFormId from '../actions/setActiveFormId';
import SEARCH from '../../core/constants/search';

const action = (name) => (dispatch, getState) => {
    let company_id = getState().companies.activeCompanyId;
    if (company_id === SEARCH.COMPANY_SHARED || company_id === SEARCH.COMPANY_MY || company_id === SEARCH.COMPANY_ALL)
        company_id = null;

    HTTP.post('/api/forms/add', {company_id, name}, dispatch)
        .then(data => {
            dispatch(setActiveFormId(data.id));
        });
};

export default action;