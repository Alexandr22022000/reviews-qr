import HTTP from "../../core/HTTPS/index";
import { setAdminsProcessing } from "../redux/viewAdminsSlice";

const action = (email) => (dispatch, getState) => {
    dispatch(setAdminsProcessing({ processingStatus: 1 }));
    HTTP.post("/api/companies/invite_admin", { email, id: getState().companies.activeCompanyId }, dispatch).then(
        (data) => {
            dispatch(setAdminsProcessing({ processingStatus: -1 }));
        }
    );
};

export default action;
