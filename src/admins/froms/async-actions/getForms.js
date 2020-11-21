import HTTP from "../../core/HTTPS/index";
import setForms from "../actions/setForms";

const action = () => (dispatch, getState) => {
    dispatch(setForms(null));
    HTTP.get(
        "/api/forms/search",
        { company_id: getState().companies.activeCompanyId, type: getState().forms.searchType },
        dispatch
    ).then((data) => {
        dispatch(setForms(data.forms));
    });
};

export default action;
