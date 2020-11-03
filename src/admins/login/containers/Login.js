import Login from '../components/Login';
import {connect} from 'react-redux';
import login from '../async_actions/login';
import googleLogin from '../async_actions/googleLogin';
import addError from '../actions/addError';

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