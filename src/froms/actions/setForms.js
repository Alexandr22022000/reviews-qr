import ACTIONS from "./types";

const action = (forms) => ({
    type: ACTIONS.SET_FORMS,
    forms,
});

export default action;
