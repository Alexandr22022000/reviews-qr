import HTTP from "../../core/HTTPS/index";
import { setCheckEmail, addError } from "../redux/viewLoginSlice";

const login = (email, password, name, recaptcha) => (dispatch, getState) => {
    HTTP.post("/api/signup", { email, password, name, recaptcha }, dispatch).then((data) => {
        if (data.message === "Proof that you are not robot")
            return dispatch(
                addError({
                    form: "signup",
                    field: "recaptcha",
                    msg: "Proof that you are not robot",
                })
            );
        if (data.message === "Email is used already")
            return dispatch(
                addError({
                    form: "signup",
                    field: "email",
                    msg: "Email is used already",
                })
            );

        dispatch(setCheckEmail());
    });
};

export default login;
