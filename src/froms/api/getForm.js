import HTTP from "../../core/HTTPS/index";
import { setActiveForm, setActiveFormId } from "../redux/viewFormsSlice";

const action = (id) => (dispatch, getState) => {
    dispatch(setActiveForm({ form: null }));
    dispatch(setActiveFormId({ id }));
    HTTP.get("/api/forms/get", { id }, dispatch).then((data) => {
        dispatch(setActiveForm({ form: data.form }));
    });
};

export default action;
