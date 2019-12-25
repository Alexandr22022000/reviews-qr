import ACTIONS from './types';

const action = (companies) => ({
    type: ACTIONS.SET_COMPANIES,
    companies,
});

export default action;