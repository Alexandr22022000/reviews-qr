const mailer = require("../../core/mailer");

const DOMAIN = process.env.DOMAIN || "http://localhost:3000";

module.exports = (email, name, token) => {
    let url = DOMAIN + "/restore_password?token=" + token;

    const msg = `
        Hello, ${name}!
        For restore your password: <a href="${url}">${url}</a>
        If you didn't try to restore password in ReviewsQR, please do nothing.
    `;

    return mailer({
        to: email,
        subject: "ReviewsSQ password restore",
        html: msg,
    });
};
