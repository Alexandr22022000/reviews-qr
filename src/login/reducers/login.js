import ACTIONS from '../actions/types';

const defaultState = {
    login_errors: {
        email: null,
        password: null,
        google_login: null,
    },
    signup_errors: {
        email: null,
        name: null,
        password: null,
        confirm_password: null,
        recaptcha: null,
    },
    restore_request_errors: {
        email: null,
        recaptcha: null,
    },
    restore_errors: {
        password: null,
        confirm_password: null,
    },
    checkEmail: false,
};

const statuses = (state = defaultState, action) => {
    switch (action.type) {
        case ACTIONS.ADD_ERROR:
            if (!action.form) return defaultState;

            const form = state[action.form + "_errors"];
            if (!action.field) {
                for (let key in form) form[key] = action.msg;
            }
            else {
                form[action.field] = action.msg;
            }

            return {...state, [action.form + "_errors"]: {...form}};

        case ACTIONS.SET_CHECK_EMAIL:
            return {...state, checkEmail: true};

        default:
            return state;
    }
};

export default statuses;