import ACTIONS from "./types";

const action = (processingStatus) => ({
    type: ACTIONS.SET_ADMINS_PROCESSING,
    processingStatus,
});

export default action;
