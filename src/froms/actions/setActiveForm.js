import ACTIONS from "./types";

const action = (form) => ({
    type: ACTIONS.SET_ACTIVE_FORM,
    form,
});

export default action;
