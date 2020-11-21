import ACTIONS from "../actions/types";

const defaultState = {
    request_error: null,
};

const statuses = (state = defaultState, action) => {
    switch (action.type) {
        case ACTIONS.REQUEST_ERROR:
            return { ...state, request_error: action.msg };

        default:
            return state;
    }
};

export default statuses;
