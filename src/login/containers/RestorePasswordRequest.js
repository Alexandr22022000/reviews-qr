import RestorePasswordRequest from "../components/RestorePasswordRequest";
import { connect } from "react-redux";
import addError from "../actions/addError";
import restorePasswordRequest from "../async_actions/restorePasswordRequest";

const mapStateToProps = (state) => ({
    checkEmail: state.login.checkEmail,
    errors: state.login.restore_request_errors,
});

const mapDispatchToProps = {
    addError,
    restorePasswordRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(RestorePasswordRequest);
