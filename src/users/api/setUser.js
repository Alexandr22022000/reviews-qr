import ACTIONS from "./types";

const action = (name, email, img) => ({
    type: ACTIONS.SET_USER,
    name,
    email,
    img,
});

export default action;
