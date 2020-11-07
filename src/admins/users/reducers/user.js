import ACTIONS from '../actions/types';

const defaultState = {
    name: null,
    img: null,
    email: null,
};

const statuses = (state = defaultState, action) => {
    switch (action.type) {
        case ACTIONS.SET_USER:
            return {...state, name: action.name, img: action.img, email: action.email};

        default:
            return state;
    }
};

export default statuses;