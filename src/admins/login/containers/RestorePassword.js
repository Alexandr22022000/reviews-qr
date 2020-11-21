import RestorePassword from "../components/RestorePassword";
import { connect } from "react-redux";
import addError from "../actions/addError";
import restorePassword from "../async_actions/restorePassword";

const mapStateToProps = (state) => ({
    user_name: state.user.name,
    errors: state.login.restore_errors,
});

const mapDispatchToProps = {
    addError,
    restorePassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(RestorePassword);
