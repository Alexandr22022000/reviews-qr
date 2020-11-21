import ACTIONS from "./types";

const action = (id) => ({
    type: ACTIONS.SET_ACTIVE_FORM_ID,
    id,
});

export default action;
