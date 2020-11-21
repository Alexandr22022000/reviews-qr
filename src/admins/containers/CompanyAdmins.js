import Admins from "../components/Admins";
import { connect } from "react-redux";
import invite from "../async-actions/inviteAdminToCompany";
import reject from "../async-actions/rejectCompanyAdmin";
import setAdminsProcessing from "../actions/setAdminsProcessing";

const mapStateToProps = (state) => ({
    object: state.companies.activeCompany,
    processingStatus: state.admins.processingStatus,
});

const mapDispatchToProps = {
    invite,
    reject,
    setAdminsProcessing,
};

export default connect(mapStateToProps, mapDispatchToProps)(Admins);
