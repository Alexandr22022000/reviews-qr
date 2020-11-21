import HTTP from "../../core/HTTPS/index";
import setForms from "../actions/setForms";
import getForms from "./getForms";

const action = (id) => (dispatch, getState) => {
    dispatch(setForms(null));
    HTTP.post("/api/forms/restore", { id }, dispatch).then((data) => {
        dispatch(getForms());
    });
};

export default action;
