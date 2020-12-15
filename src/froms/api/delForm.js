import HTTP from "../../core/HTTPS/index";
import {setForms} from "../redux/viewFormsSlice";
import getForms from "./getForms";

const action = (id) => (dispatch, getState) => {
    dispatch(setForms({forms: null}));
    HTTP.post("/api/forms/del", { id }, dispatch).then((data) => {
        dispatch(getForms());
    });
};

export default action;
