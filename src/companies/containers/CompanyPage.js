import CompanyPage from '../components/CompanyPage';
import {connect} from 'react-redux';
import getCompany from '../../companies/async-actions/getCompany';

const mapStateToProps = (state) => ({
    company: state.companies.activeCompany,
});

const mapDispatchToProps = {
    getCompany,
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyPage);