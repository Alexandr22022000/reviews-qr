import HTTP from "../../core/HTTPS/index";
import { setActiveForm } from "../redux/viewFormsSlice";
import getForm from "./getForm";

const action = (id, name, img, style, msg) => (dispatch, getState) => {
    dispatch(setActiveForm({ form: null }));
    HTTP.post("/api/forms/update", { id, name, img, style, msg }, dispatch).then((data) => {
        dispatch(getForm());
    });
};

export default action;
