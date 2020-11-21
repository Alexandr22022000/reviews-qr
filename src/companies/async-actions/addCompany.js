import HTTP from "../../core/HTTPS/index";
import setAddButtonStatus from "../actions/setAddButtonStatus";
import getCompanies from "./getCompanies";

const action = (name) => (dispatch, getState) => {
    dispatch(setAddButtonStatus(-1));
    HTTP.post("/api/companies/add", { name }, dispatch).then((data) => {
        dispatch(getCompanies());
    });
};

export default action;
