import HTTP from "../../core/HTTPS/index";
import SEARCH from "../../core/constants/search";

const action = (name,callback) => (dispatch, getState) => {
    let company_id = getState().companies.activeCompanyId;
    if (company_id === SEARCH.COMPANY_SHARED || company_id === SEARCH.COMPANY_MY || company_id === SEARCH.COMPANY_ALL)
        company_id = null;

    HTTP.post("/api/forms/add", { company_id, name }, dispatch).then((data) => {
        if (callback) callback(data.id)
    });
};

export default action;
