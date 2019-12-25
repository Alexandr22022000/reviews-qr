import ACTIONS from './types';

const action = (status) => ({
    type: ACTIONS.SET_ADD_BUTTON_STATUS,
    status,
});

export default action;