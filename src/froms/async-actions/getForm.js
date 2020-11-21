import HTTP from "../../core/HTTPS/index";
import setActiveForm from "../actions/setActiveForm";
import setActiveFormId from "../actions/setActiveFormId";

const action = (id) => (dispatch, getState) => {
    dispatch(setActiveForm(null));
    dispatch(setActiveFormId(id));
    HTTP.get("/api/forms/get", { id }, dispatch).then((data) => {
        dispatch(setActiveForm(data.form));
    });
};

export default action;
