import RestorePassword from "../components/RestorePassword";
import { connect } from "react-redux";
import { addError } from "../redux/viewLoginSlice";
import restorePassword from "../api/restorePassword";

const mapStateToProps = (state) => ({
    user_name: state.user.name,
    errors: state.login.restore_errors,
});

const mapDispatchToProps = {
    addError,
    restorePassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(RestorePassword);
