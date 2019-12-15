import axios from 'axios';
import requestError from '../actions/requestError';

import getCleanUrl from './getCleanUrl';

const HTTP = axios.create({
    baseURL: getCleanUrl(),
});

const HTTPS = (route, data, dispatch, errors) => {
    return new Promise(resolve => {
        HTTP.post(route, data)
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                let code = error.message.match(/([0-9][0-9][0-9])$/);
                if (!code || !code[0]) return dispatch(requestError("Network error!"));
                code = +code[0];

                if (errors && errors[code]) return errors[code]();

                switch (code) {
                    case 500:
                        dispatch(requestError("Server error!"));
                        break;

                    case 400:
                        dispatch(requestError("Incorrect data!"));
                        break;

                    default:
                        dispatch(requestError("Network error!"));
                }
            });
    });
};

export default HTTPS;