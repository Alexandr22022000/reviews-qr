import HTTP from "../../core/HTTPS/index";
import setAdminsProcessing from "../actions/setAdminsProcessing";

const action = (email) => (dispatch, getState) => {
    dispatch(setAdminsProcessing(1));
    HTTP.post("/api/companies/invite_admin", { email, id: getState().companies.activeCompanyId }, dispatch).then(
        (data) => {
            dispatch(setAdminsProcessing(-1));
        }
    );
};

export default action;
