import HTTP from "../../core/HTTPS/index";
import {setActiveCompanyId, setActiveCompany} from "../redux/viewCompaniesSlice";

const action = (id) => (dispatch, getState) => {
    dispatch(setActiveCompanyId({id}));
    dispatch(setActiveCompany({company : null}));
    HTTP.get("/api/companies/get", { id }, dispatch).then((company) => {
        dispatch(setActiveCompany({company}));
    });
};

export default action;
