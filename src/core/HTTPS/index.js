import axios from "axios";
import {requestError} from "../redux/viewStatusesSlice";

import getCleanUrl from "./getCleanUrl";

const HTTP = axios.create({
    baseURL: getCleanUrl(),
    withCredentials: true,
});

const onError = (errors, dispatch) => (error) => {
    let code = error.message.match(/([0-9][0-9][0-9])$/);
    if (!code || !code[0]) return dispatch(requestError("Network error!"));
    code = +code[0];

    if (errors && errors[code]) return errors[code](error);

    switch (code) {
        case 500:
            dispatch(requestError("Server error!"));
            break;

        case 400:
            dispatch(requestError("Incorrect data!"));
            break;

        case 404:
            dispatch(requestError("Not found!"));
            break;

        case 401:
            window.location.href = getCleanUrl() + "/login";
            break;

        default:
            dispatch(requestError("Network error!"));
    }
};

const get = (route, params, dispatch, errors) => {
    return new Promise((resolve) => {
        HTTP.get(route, { params })
            .then((res) => resolve(res.data))
            .catch(onError(errors, dispatch));
    });
};

const post = (route, data, dispatch, errors) => {
    return new Promise((resolve) => {
        HTTP.post(route, data)
            .then((res) => resolve(res.data))
            .catch(onError(errors, dispatch));
    });
};

const HTTPS = { get, post };
export default HTTPS;
