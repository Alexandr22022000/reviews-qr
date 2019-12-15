import ACTIONS from './types';

const action = (form, field, msg) => ({
    type: ACTIONS.ADD_ERROR,
    form,
    field,
    msg,
});

export default action;