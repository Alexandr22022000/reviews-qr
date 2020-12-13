import HTTP from "../../core/HTTPS/index";
import {setActiveCompanyId, setActiveCompany, setCompanies} from "../redux/viewCompaniesSlice";
import getCompanies from "./getCompanies";
import SEARCH from "../../core/constants/search";

const action = (id) => (dispatch, getState) => {
    //FIXME add getting forms
    dispatch(setCompanies({companies: null}));
    dispatch(setActiveCompany({company: null}));
    HTTP.post("/api/companies/del", { id }, dispatch).then((data) => {
        dispatch(getCompanies());
        dispatch(setActiveCompanyId({id : SEARCH.COMPANY_ALL}));
    });
};

export default action;
