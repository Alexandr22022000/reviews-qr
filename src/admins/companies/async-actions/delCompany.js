import HTTP from '../../core/HTTPS/index';
import setCompanies from '../actions/setCompanies';
import setActiveCompanyId from '../actions/setActiveCompanyId';
import setActiveCompany from '../actions/setActiveCompany';
import getCompanies from './getCompanies';
import SEARCH from '../../core/constants/search';

const action = (id) => (dispatch, getState) => { //FIXME add getting forms
    dispatch(setCompanies(null));
    dispatch(setActiveCompany(null));
    HTTP.post('/api/companies/del', {id}, dispatch)
        .then(data => {
            dispatch(getCompanies());
            dispatch(setActiveCompanyId(SEARCH.COMPANY_ALL));
        });
};

export default action;