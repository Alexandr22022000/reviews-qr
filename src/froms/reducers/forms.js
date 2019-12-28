import ACTIONS from '../actions/types';
import SEARCH from '../../core/constants/search'

const defaultState = {
    forms: null,
    activeForm: null,
    questions: null,
    activeFormId: null,
    searchType: SEARCH.FORMS,
};

const statuses = (state = defaultState, action) => {
    switch (action.type) {
        case ACTIONS.SET_FORMS:
            return {...state, forms: action.forms};

        case ACTIONS.SET_ACTIVE_FORM:
            return {...state, activeForm: action.form, questions: action.form.questions};

        case ACTIONS.SET_ACTIVE_FORM_ID:
            return {...state, activeFormId: action.id};

        case ACTIONS.SET_SEARCH_TYPE:
            return {...state, searchType: action.searchType};

        default:
            return state;
    }
};

export default statuses;