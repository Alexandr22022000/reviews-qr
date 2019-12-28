import ACTIONS from './types';

const action = (searchType) => ({
    type: ACTIONS.SET_SEARCH_TYPE,
    searchType,
});

export default action;