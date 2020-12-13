import HTTP from "../../core/HTTPS/index";
import {setCompanies, setAddButtonStatus} from "../redux/viewCompaniesSlice";


const action = () => (dispatch, getState) => {
    HTTP.get("/api/companies/get_all", {}, dispatch).then((data) => {
        dispatch(setCompanies({companies: data.companies}));
        dispatch(setAddButtonStatus({status : 0}));
    });
};

export default action;
