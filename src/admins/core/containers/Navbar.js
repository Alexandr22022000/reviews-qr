import Navbar from "../components/Navbar";
import { connect } from "react-redux";
import getCompanies from "../../companies/async-actions/getCompanies";
import logout from "../../login/async_actions/logout";
import addCompany from "../../companies/async-actions/addCompany";
import setAddButtonStatus from "../../companies/actions/setAddButtonStatus";
import setActiveCompanyId from "../../companies/actions/setActiveCompanyId";

const mapStateToProps = (state) => ({
    request_error: state.statuses.request_error,
    companies: state.companies.companies,
    activeCompanyId: state.companies.activeCompanyId,
    addButtonStatus: state.companies.addButtonStatus,
});

const mapDispatchToProps = {
    getCompanies,
    addCompany,
    setAddButtonStatus,
    logout,
    setActiveCompanyId,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
