import RestorePasswordRequest from "../components/RestorePasswordRequest";
import { connect } from "react-redux";
import {addError} from "../redux/viewLoginSlice";
import restorePasswordRequest from "../api/restorePasswordRequest";

const mapStateToProps = (state) => ({
    checkEmail: state.login.checkEmail,
    errors: state.login.restore_request_errors,
});

const mapDispatchToProps = {
    addError,
    restorePasswordRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(RestorePasswordRequest);
