import HTTP from "../../core/HTTPS/index";
import {setAddButtonStatus} from "../redux/viewCompaniesSlice";
import getCompanies from "./getCompanies";

const action = (name) => (dispatch, getState) => {
    dispatch(setAddButtonStatus({addButtonStatus: -1}));
    HTTP.post("/api/companies/add", { name }, dispatch).then((data) => {
        dispatch(getCompanies());
    });
};

export default action;
