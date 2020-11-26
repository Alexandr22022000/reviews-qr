import HTTP from "../../core/HTTPS/index";
import setUser from "../../users/actions/setUser";
import { addError } from "../redux/viewLoginSlice";

const login = (email, name, img, token) => (dispatch, getState) => {
    HTTP.post("/api/google_login", { email, name, img, token }, dispatch).then((data) => {
        if (data.message === "Incorrect google token")
            return dispatch(
                addError({
                    form: "login",
                    field: "google_login",
                    msg: "Incorrect google token, please login by password",
                })
            );

        dispatch(setUser(data.name, data.email, data.img));
    });
};

export default login;
