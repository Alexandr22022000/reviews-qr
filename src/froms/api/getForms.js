import HTTP from "../../core/HTTPS/index";
import {setForms} from "../redux/viewFormsSlice";

const action = () => (dispatch, getState) => {
    dispatch(setForms({forms: null}));
    HTTP.get(
        "/api/forms/search",
        { company_id: getState().companies.activeCompanyId, type: getState().forms.searchType },
        dispatch
    ).then((data) => {
        dispatch(setForms({forms: data.forms}));
    });
};

export default action;
