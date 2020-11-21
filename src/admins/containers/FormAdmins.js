import Admins from "../components/Admins";
import { connect } from "react-redux";
import invite from "../async-actions/inviteAdminToForm";
import reject from "../async-actions/rejectFormAdmin";

const mapStateToProps = (state) => ({
    object: state.forms.activeForm,
    processingStatus: state.admins.processingStatus,
});

const mapDispatchToProps = {
    invite,
    reject,
};

export default connect(mapStateToProps, mapDispatchToProps)(Admins);
