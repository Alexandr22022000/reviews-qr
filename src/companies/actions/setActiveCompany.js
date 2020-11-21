import ACTIONS from "./types";

const action = (company) => ({
    type: ACTIONS.SET_ACTIVE_COMPANY,
    company,
});

export default action;
