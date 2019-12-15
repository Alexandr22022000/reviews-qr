import Navbar from '../components/Navbar';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
    request_error: state.statuses.request_error,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);