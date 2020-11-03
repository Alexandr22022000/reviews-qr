import CompanyEditor from '../components/CompanyEditor';
import {connect} from 'react-redux';
import updateCompany from '../../companies/async-actions/updateCompany';
import delCompany from '../../companies/async-actions/delCompany';

const mapStateToProps = (state) => ({
    company: state.companies.activeCompany,
});

const mapDispatchToProps = {
    updateCompany,
    delCompany,
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyEditor);