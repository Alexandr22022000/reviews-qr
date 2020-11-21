import HTTP from "../../core/HTTPS/index";
import setCompanies from "../actions/setCompanies";
import setAddButtonStatus from "../actions/setAddButtonStatus";

const action = () => (dispatch, getState) => {
    HTTP.get("/api/companies/get_all", {}, dispatch).then((data) => {
        dispatch(setCompanies(data.companies));
        dispatch(setAddButtonStatus(0));
    });
};

export default action;
