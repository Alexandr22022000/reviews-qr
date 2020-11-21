const mailer = require("../../core/mailer");

const DOMAIN = process.env.DOMAIN || "http://localhost:3000";

module.exports = (email, name, token) => {
    let url = DOMAIN + "/email/confirm_email?token=" + token;

    const msg = `
        Hello, ${name}!
        You try to update email for ReviewQR account.
        For confirm this email follow the link: <a href="${url}">${url}</a>
        If you didn't try to update email in ReviewsQR or didn't registered in ReviewsQR, please do nothing.
    `;

    return mailer({
        to: email,
        subject: "ReviewsSQ email update",
        html: msg,
    });
};
