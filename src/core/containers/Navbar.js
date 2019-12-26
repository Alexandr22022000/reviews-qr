import Navbar from '../components/Navbar';
import {connect} from 'react-redux';
import getCompanies from '../../companies/async-actions/getCompanies';
import logout from '../../login/async_actions/logout';
import addCompany from '../../companies/async-actions/addCompany';
import setAddButtonStatus from '../../companies/actions/setAddButtonStatus';

const mapStateToProps = (state) => ({
    request_error: state.statuses.request_error,
    companies: state.companies.companies,
    addButtonStatus: state.companies.addButtonStatus,
});

const mapDispatchToProps = {
    getCompanies,
    addCompany,
    setAddButtonStatus,
    logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);