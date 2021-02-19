import HTTP from "../../core/HTTPS/index";
import setUser from "../../users/api/setUser";
import { addError } from "../redux/viewLoginSlice";

const login = (email, password) => (dispatch, getState) => {
    HTTP.post("/api/login", { email, password }, dispatch).then((data) => {
        if (data.message === "Invalid email")
            return dispatch(
                addError({
                    form: "login",
                    field: "email",
                    msg: "User not found",
                })
            );

        if (data.message === "Invalid password")
            return dispatch(
                addError({
                    form: "login",
                    field: "password",
                    msg: "Incorrect password",
                })
            );

        dispatch(setUser({ name: data.name, email: data.email, img: data.img }));
    });
};

export default login;
