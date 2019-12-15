import HTTP from '../../core/HTTPS/index';
import addError from "../actions/addError";
import setCheckEmail from "../actions/setCheckEmail";

const login = (email, recaptcha) => (dispatch, getState) => {
    HTTP('/api/restore_password_request', {email, recaptcha}, dispatch)
        .then(data => {
            if (data.message === "Proof that you are not robot") return dispatch(addError('restore_request', 'recaptcha', "Proof that you are not robot"));
            if (data.message === "User not found") return dispatch(addError('restore_request', 'email', "User not found"));

            dispatch(setCheckEmail());
        });
};

export default login;