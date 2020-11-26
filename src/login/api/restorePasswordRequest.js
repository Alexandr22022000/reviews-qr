import HTTP from "../../core/HTTPS/index";
import { setCheckEmail, addError } from "../redux/viewLoginSlice";

const login = (email, recaptcha) => (dispatch, getState) => {
    HTTP.post("/api/restore_password_request", { email, recaptcha }, dispatch).then((data) => {
        if (data.message === "Proof that you are not robot")
            return dispatch(
                addError({
                    form: "restore_request",
                    field: "recaptcha",
                    msg: "Proof that you are not robot",
                })
            );
        if (data.message === "User not found")
            return dispatch(
                addError({
                    form: "restore_request",
                    field: "email",
                    msg: "User not found",
                })
            );

        dispatch(setCheckEmail());
    });
};

export default login;
