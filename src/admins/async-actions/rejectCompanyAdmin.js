import HTTP from "../../core/HTTPS/index";
import getCompany from "../../companies/api/getCompany";

const action = (admin_id) => (dispatch, getState) => {
    HTTP.post("/api/companies/reject_admin", { admin_id, id: getState().companies.activeCompanyId }, dispatch).then(
        (data) => {
            dispatch(getCompany(getState().companies.activeCompanyId));
        }
    );
};

export default action;
