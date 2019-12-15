import ACTIONS from './types';

const action = (msg) => ({
    type: ACTIONS.REQUEST_ERROR,
    msg,
});

export default action;