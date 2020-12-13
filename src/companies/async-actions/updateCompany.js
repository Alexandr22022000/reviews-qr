import HTTP from "../../core/HTTPS/index";
import {setActiveCompany} from "../redux/viewCompaniesSlice";
import getCompany from "./getCompany";

const action = (company) => (dispatch, getState) => {
    dispatch(setActiveCompany({company}));
    HTTP.post("/api/companies/update", { ...company }, dispatch).then((data) => {
        dispatch(getCompany(company.id));
    });
};

export default action;
