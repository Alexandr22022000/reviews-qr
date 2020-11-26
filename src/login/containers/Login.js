import Login from "../components/Login";
import { connect } from "react-redux";
import login from "../api/login";
import googleLogin from "../api/googleLogin";
import {addError} from "../redux/viewLoginSlice";

const mapStateToProps = (state) => ({
    user_name: state.user.name,
    errors: state.login.login_errors,
});

const mapDispatchToProps = {
    login,
    addError,
    googleLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
