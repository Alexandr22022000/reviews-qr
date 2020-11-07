import ACTIONS from './types';

const action = (id) => ({
    type: ACTIONS.SET_ACTIVE_COMPANY_ID,
    id,
});

export default action;