import ACTIONS from "../actions/types";
import SEARCH from "../../core/constants/search";

const defaultState = {
    companies: null,
    activeCompanyId: SEARCH.COMPANY_ALL,
    activeCompany: null,
    addButtonStatus: -1,
};

const statuses = (state = defaultState, action) => {
    switch (action.type) {
        case ACTIONS.SET_COMPANIES:
            return { ...state, companies: action.companies };

        case ACTIONS.SET_ACTIVE_COMPANY_ID:
            return { ...state, activeCompanyId: action.id };

        case ACTIONS.SET_ACTIVE_COMPANY:
            return { ...state, activeCompany: action.company };

        case ACTIONS.SET_ADD_BUTTON_STATUS:
            return { ...state, addButtonStatus: action.status };

        default:
            return state;
    }
};

export default statuses;
