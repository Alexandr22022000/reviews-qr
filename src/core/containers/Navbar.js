import Navbar from '../components/Navbar';
import {connect} from 'react-redux';
import getCompanies from '../../companies/async-actions/getCompanies';
import addCompany from '../../companies/async-actions/addCompany';

const mapStateToProps = (state) => ({
    request_error: state.statuses.request_error,
    companies: state.companies.companies,
});

const mapDispatchToProps = {
    getCompanies,
    addCompany,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);