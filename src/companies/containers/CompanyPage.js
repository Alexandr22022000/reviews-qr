import CompanyPage from '../components/CompanyPage';
import {connect} from 'react-redux';
import getCompany from '../../companies/async-actions/getCompany';
import getForms from '../../froms/async-actions/getForms';
import addForm from '../../froms/async-actions/addForm';
import delForm from '../../froms/async-actions/delForm';
import setSearchType from '../../froms/actions/setSearchType';

const mapStateToProps = (state) => ({
    company: state.companies.activeCompany,
    companyId: state.companies.activeCompanyId,
    forms: state.forms.forms,
    searchType: state.forms.searchType,
});

const mapDispatchToProps = {
    getCompany,
    getForms,
    addForm,
    delForm,
    setSearchType,
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyPage);