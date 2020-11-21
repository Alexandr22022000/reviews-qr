const unirest = require("unirest");

const GRECAPTCHA_SECRET = process.env.GRECAPTCHA_SECRET || "6LcGKFYUAAAAAJ5jpoBfUUb6Rmt4hGsuSdOJH3hC"; //FIXME remove secret

module.exports = (response, remoteAddress) => {
    return new Promise((resolve) => {
        return resolve(true); //TODO: FIx captcha
        unirest
            .post("https://www.google.com/recaptcha/api/siteverify")
            .send({ secret: GRECAPTCHA_SECRET, response: response, remoteip: remoteAddress })
            .end((response) => resolve(!response.error && response.body.success));
    });
};
