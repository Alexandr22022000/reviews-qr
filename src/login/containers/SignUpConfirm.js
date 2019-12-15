import SignUpConfirm from '../components/SignUpConfirm';
import {connect} from 'react-redux';
import signupConfirm from '../async_actions/signupConfirm';

const mapStateToProps = (state) => ({
    user_name: state.user.name,
});

const mapDispatchToProps = {
    signupConfirm
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpConfirm);