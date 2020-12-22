import HTTP from "../../core/HTTPS/index";
import { setActiveCompanyId, setActiveCompany } from "../redux/viewCompaniesSlice";

const action = (id) => (dispatch, getState) => {
    dispatch(setActiveCompanyId({ id }));
    dispatch(setActiveCompany({ activeCompany: null }));
    HTTP.get("/api/companies/get", { id }, dispatch).then((data) => {
        dispatch(setActiveCompany({ activeCompany: data }));
    });
};

export default action;
