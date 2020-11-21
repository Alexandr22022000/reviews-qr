import SignUp from "../components/SignUp";
import { connect } from "react-redux";
import addError from "../actions/addError";
import signup from "../async_actions/signup";

const mapStateToProps = (state) => ({
    checkEmail: state.login.checkEmail,
    errors: state.login.signup_errors,
});

const mapDispatchToProps = {
    addError,
    signup,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
