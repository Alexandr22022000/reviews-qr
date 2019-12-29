import ACTIONS from '../actions/types';

const defaultState = {
    processingStatus: 0,
};

const statuses = (state = defaultState, action) => {
    switch (action.type) {
        case ACTIONS.SET_ADMINS_PROCESSING:
            return {...state, processingStatus: action.processingStatus};

        default:
            return state;
    }
};

export default statuses;