import HTTP from "../../core/HTTPS/index";
import addError from "../actions/addError";
import setCheckEmail from "../actions/setCheckEmail";

const login = (email, password, name, recaptcha) => (dispatch, getState) => {
    HTTP.post("/api/signup", { email, password, name, recaptcha }, dispatch).then((data) => {
        if (data.message === "Proof that you are not robot")
            return dispatch(addError("signup", "recaptcha", "Proof that you are not robot"));
        if (data.message === "Email is used already")
            return dispatch(addError("signup", "email", "Email is used already"));

        dispatch(setCheckEmail());
    });
};

export default login;
