import HTTP from '../../core/HTTPS/index';
import setActiveCompanyId from '../actions/setActiveCompanyId';
import setActiveCompany from '../actions/setActiveCompany';

const action = (id) => (dispatch, getState) => {
    dispatch(setActiveCompanyId(id));
    HTTP.get('/api/companies/get', {id}, dispatch)
        .then(data => {
            dispatch(setActiveCompany(data));
        });
};

export default action;